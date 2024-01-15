import axios from "axios";
import { useState } from "react";

const AdminPage = () => {
  const [language, setLanguage] = useState("fin");
  const [finnish, setFinnish] = useState("");
  const [english, setEnglish] = useState("");

  //Change the state value using select element
  const handleSelectLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const handleSetFinnish = (e) => {
    setFinnish(e.target.value);
  };

  const handleSetEnglish = (e) => {
    setEnglish(e.target.value);
  };

  //Add new word to the database
  const createNewWord = async () => {
    const newWord = {
      english_word: english,
      finnish_word: finnish,
      learning_direction: language,
    };

    try {
      const result = await axios.post(
        "http://localhost:8080/api/words",
        newWord
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <div>
        <p>Create word</p>
        <select name="languages" onChange={handleSelectLanguage}>
          <option value="fin">Finnish</option>
          <option value="eng">English</option>
        </select>
        <div className="word-original">
          <label>Finnish Word</label>
          <input onChange={handleSetFinnish} />
        </div>
        <div className="word-translation">
          <label>English Word</label>
          <input onChange={handleSetEnglish} />
        </div>
        <button onClick={createNewWord}>Add</button>
      </div>
    </div>
  );
};

export default AdminPage;
