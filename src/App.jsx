import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Stations from "./pages/Stations";
import FavouriteStations from "./pages/FavouriteStations";
import Map from "./pages/Map";
import Payment from "./pages/Payment";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/stations" element={<Stations />} />
        <Route path="/favourite-stations" element={<FavouriteStations />} />
        <Route index path="/" element={<Map />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
