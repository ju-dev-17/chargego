import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Stations from "./pages/Stations";
import FavouriteStations from "./pages/FavouriteStations";
import Map from "./pages/Map";
import Payment from "./pages/Payment";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(localStorage.getItem("isDark"));

  const switchTheme = () => {
    setIsDark(isDark === "true" ? "false" : "true");
    localStorage.setItem(
      "isDark",
      isDark === "true" ? "false" : "true"
    );
    location.reload();
  };

  return (
    <Router>
      <Routes>
        <Route path="/stations" element={<Stations />} />
        <Route path="/favourite-stations" element={<FavouriteStations />} />
        <Route
          index
          path="/"
          element={
            <Map
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              switchTheme={switchTheme}
            />
          }
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav isLoading={isLoading} />
    </Router>
  );
}

export default App;
