import "./Styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./Welcome";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Nopage from "./Nopage";
import Add from "./Add";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/add" element={<Add />} />
        <Route path="/*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
