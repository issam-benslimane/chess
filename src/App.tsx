import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OnlineGame from "./components/online/OnlineGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play">
          <Route path="local" />
          <Route path="online/:gameId" element={<OnlineGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
