import { HOMER_EPISODES } from "../src/homer/data/episodes.ts";
import { HOMER_PEOPLE } from "../src/homer/data/people.ts";
import { HOMER_PLACES } from "../src/homer/data/places.ts";
import { HOMER_ROUTES } from "../src/homer/data/routes.ts";
import { HOMER_SOURCES } from "../src/homer/data/sources.ts";

const errors = [];

function idSet(records, label) {
  const seen = new Set();
  for (const record of records) {
    if (seen.has(record.id)) errors.push(`${label}: duplicate id ${record.id}`);
    seen.add(record.id);
  }
  return seen;
}

function checkSources(records, label, sourceIds) {
  for (const record of records) {
    for (const sourceId of record.sourceIds ?? []) {
      if (!sourceIds.has(sourceId)) errors.push(`${label} ${record.id}: unknown source ${sourceId}`);
    }
  }
}

function placeSupportsEpic(place, epic) {
  return place?.epic === "both" || place?.epic === epic;
}

const sourceIds = idSet(HOMER_SOURCES, "source");
const placeIds = idSet(HOMER_PLACES, "place");
const peopleIds = idSet(HOMER_PEOPLE, "person");
idSet(HOMER_EPISODES, "episode");
idSet(HOMER_ROUTES, "route");

checkSources(HOMER_PLACES, "place", sourceIds);
checkSources(HOMER_PEOPLE, "person", sourceIds);
checkSources(HOMER_EPISODES, "episode", sourceIds);
checkSources(HOMER_ROUTES, "route", sourceIds);

for (const source of HOMER_SOURCES) {
  if (!source.url.startsWith("https://")) errors.push(`source ${source.id}: URL must use HTTPS`);
}

const placesById = new Map(HOMER_PLACES.map((place) => [place.id, place]));

for (const place of HOMER_PLACES) {
  const [longitude, latitude] = place.coord;
  if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    errors.push(`place ${place.id}: invalid longitude ${longitude}`);
  }
  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
    errors.push(`place ${place.id}: invalid latitude ${latitude}`);
  }
}

for (const person of HOMER_PEOPLE) {
  if (person.homePlaceId && !placeIds.has(person.homePlaceId)) {
    errors.push(`person ${person.id}: unknown home place ${person.homePlaceId}`);
  }
  for (const relatedId of person.relatedIds) {
    if (!peopleIds.has(relatedId)) errors.push(`person ${person.id}: unknown related person ${relatedId}`);
  }
}

for (const episode of HOMER_EPISODES) {
  if (episode.book < 1 || episode.book > 24) errors.push(`episode ${episode.id}: book outside 1-24`);
  if (episode.placeId) {
    const place = placesById.get(episode.placeId);
    if (!place) errors.push(`episode ${episode.id}: unknown place ${episode.placeId}`);
    else if (!placeSupportsEpic(place, episode.epic)) {
      errors.push(`episode ${episode.id}: place ${episode.placeId} does not support ${episode.epic}`);
    }
  }
  for (const personId of episode.personIds) {
    if (!peopleIds.has(personId)) errors.push(`episode ${episode.id}: unknown person ${personId}`);
  }
}

for (const route of HOMER_ROUTES) {
  if (route.evidence === "confirmed") {
    errors.push(`route ${route.id}: a drawn itinerary cannot be marked confirmed; use textual, traditional, or mythic`);
  }
  for (const endpoint of [route.fromId, route.toId]) {
    const place = placesById.get(endpoint);
    if (!place) errors.push(`route ${route.id}: unknown endpoint ${endpoint}`);
    else if (!placeSupportsEpic(place, route.epic)) {
      errors.push(`route ${route.id}: endpoint ${endpoint} does not support ${route.epic}`);
    }
  }
  for (const waypoint of route.waypoints ?? []) {
    const [longitude, latitude] = waypoint;
    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180 || !Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
      errors.push(`route ${route.id}: invalid waypoint ${JSON.stringify(waypoint)}`);
    }
  }
}

console.table({
  sources: HOMER_SOURCES.length,
  places: HOMER_PLACES.length,
  people: HOMER_PEOPLE.length,
  episodes: HOMER_EPISODES.length,
  routes: HOMER_ROUTES.length,
});

if (errors.length) {
  console.error(`Homer data audit failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Homer data audit passed: IDs, references, coordinates, route evidence, HTTPS sources, and epic scopes are internally consistent.");
