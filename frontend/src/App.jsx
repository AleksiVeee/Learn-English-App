import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import StudentPage from "./components/StudentPage";
import AdminPage from "./components/AdminPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [wordPairs, setWordPairs] = useState([])

  //Get data from the database and store them in the "wordPairs" state
  useEffect(() => {
    const getData = async () => {
      const result = await axios.get("http://localhost:8080/api/words");
      setWordPairs(result.data)
    }
    getData()
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage wordPairs={wordPairs} setWordPairs={setWordPairs}/>} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </div>
  );
}

export default App;
