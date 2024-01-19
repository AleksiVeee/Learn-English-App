/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import WordCard from "./WordCard";
import { Link } from "react-router-dom";
import {
  Select,
  MenuItem,
  FormControl,
  Container,
  Button,
  Box,
} from "@mui/material";
import { CreateBox } from "../material_ui_styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/words`,
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
    <Container>
      <h2>Admin Page</h2>
      <Link to="/">
        <Button variant="contained" startIcon={<ArrowBackIcon />}>
          Go Back
        </Button>
      </Link>
      <CreateBox sx={{ display: "flex", alignItems: "end" }}>
        <Box>
          <FormControl>
            <p>Choose primary language for the word</p>
            <Select value={language} onChange={handleSelectLanguage}>
              <MenuItem value="fin">Finnish</MenuItem>
              <MenuItem value="eng">English</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <div style={{ marginBottom: ".5rem" }}>
            <label>Finnish Word</label>
            <input value={finnish} onChange={handleSetFinnish} />
          </div>
          <div>
            <label>English Word</label>
            <input value={english} onChange={handleSetEnglish} />
          </div>
        </Box>
        <Button
          variant="contained"
          sx={{ padding: ".5rem 2.5rem" }}
          onClick={createNewWord}
        >
          Add
        </Button>
      </CreateBox>
      <div className="card-layout">
        {wordPairs.map((word) => (
          <WordCard
            key={word.id}
            word={word}
            setWordPairs={setWordPairs}
            wordPairs={wordPairs}
          />
        ))}
      </div>
    </Container>
  );
};

export default AdminPage;
