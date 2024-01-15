/*import "./App.css";*/
import {Route, Routes} from "react-router-dom"
import MainPage from "./components/MainPage";
import StudentPage from "./components/StudentPage";
import AdminPage from "./components/AdminPage";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </div>
  );
}

export default App;
