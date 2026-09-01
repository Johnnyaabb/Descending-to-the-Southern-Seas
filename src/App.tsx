import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NanyangMigrationPage } from "./pages/NanyangMigrationPage";
import { ChuangGuandongMigrationPage } from "./pages/ChuangGuandongMigrationPage";
import { ZouXikouMigrationPage } from "./pages/ZouXikouMigrationPage";
import { HomericEpicsPage } from "./homer/HomericEpicsPage";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nanyang" element={<NanyangMigrationPage />} />
        <Route path="/chuang-guandong" element={<ChuangGuandongMigrationPage />} />
        <Route path="/zou-xikou" element={<ZouXikouMigrationPage />} />
        <Route path="/homeric-epics" element={<HomericEpicsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
