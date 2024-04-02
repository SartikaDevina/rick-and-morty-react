import React, { useEffect } from "react";
import { Routes, Route, useNavigate  } from "react-router-dom";
import Character from "./pages/Character";
import Location from "./pages/Location";
import Episode from "./pages/Episode";
import CardCharacterDetail from "./components/Card/CardCharacterDetail";
import PageHeader from "./components/Header/PageHeader";
import { headerRoutes } from "./shared/constants";
import NotFound from "./components/NotFound";
import { RecoilRoot } from "recoil";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if(window.location.pathname === '/'){
      navigate("/character");
    }
  }, []);

  return (
    <RecoilRoot>
      <div className="App">
        <PageHeader routes={headerRoutes} currentPagePath={window.location.pathname}/>
      </div>
        <Routes>
          <Route path="/character" element={<Character />} />
          <Route path="/location" element={<Location />} />
          <Route path="/episode" element={<Episode />} />
          <Route path="/character/:id" element={<CardCharacterDetail />} />
          <Route path="/location/:id" element={<CardCharacterDetail />} />
          <Route path="/episode/:id" element={<CardCharacterDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </RecoilRoot>
  );
}

export default App;
