import "./App.css";
import { Routes, Route } from "react-router-dom";
import Details from "./componet/Details";
import NewForm from "./componet/NewForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewForm />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
}

export default App;
