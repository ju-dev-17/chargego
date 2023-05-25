import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Stations from "./pages/Stations";
import FavouriteStations from "./pages/FavouriteStations";
import Map from "./pages/Map";
import Payment from "./pages/Payment";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";
import useTheme from "./hooks/useTheme";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, switchTheme] = useTheme();
  const body = document.querySelector("body");

  body.style.backgroundColor = isDark === "true" ? "#001E4E" : "#fff";
  body.style.color = isDark === "true" ? "#fff" : "#000";

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
              isDark={isDark}
              switchTheme={switchTheme}
            />
          }
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav isLoading={isLoading} isDark={isDark} />
    </Router>
  );
}

export default App;
