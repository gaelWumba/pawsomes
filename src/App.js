import { Routes, Route } from "react-router-dom";

import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Home from "./components/Home";
import Search from "./components/Search";

const App = () => {
  return (
    <div>
      <Header />
      <div className="mt-24"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
};

export default App;
