import axios from "axios";
import { useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const AdminPage = ({ wordPairs, setWordPairs }) => {
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
      setWordPairs([...wordPairs, result.data]);
      setFinnish("");
      setEnglish("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <Link to="/">Go Back</Link>
      <div>
        <p>Create word</p>
        <FormControl sx={{ margin: "1rem 0rem" }}>
          <InputLabel id="select-label">Language</InputLabel>
          <Select
            label="Language"
            value={language}
            onChange={handleSelectLanguage}
          >
            <MenuItem value="fin">Finnish</MenuItem>
            <MenuItem value="eng">English</MenuItem>
          </Select>
        </FormControl>
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
      <div className="card-layout">
        {wordPairs.map((word) => (
          <Card
            key={word.id}
            word={word}
            setWordPairs={setWordPairs}
            wordPairs={wordPairs}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
