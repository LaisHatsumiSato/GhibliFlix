import { HashRouter, Routes, Route } from "react-router-dom";

import Container from "./pages/Home";
import Details from "./pages/MovieDetails";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/movie/:id" element={<Details />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
