import "./App.css";
import { Routes, Route } from "react-router-dom";
import Details from "./componet/Details";
import Form from "./componet/Form";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
}

export default App;
