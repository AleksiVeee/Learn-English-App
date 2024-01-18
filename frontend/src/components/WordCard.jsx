/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { Card, CardContent, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const WordCard = ({ word, setWordPairs, wordPairs }) => {
  const [toggleCard, setToggleCard] = useState(true);
  const [updateFinnish, setUpdateFinnish] = useState(word.finnish_word);
  const [updateEnglish, setUpdateEnglish] = useState(word.english_word);
  const [learningDirection, setLearningDirection] = useState(
    word.learning_direction
  );

  //Delete wordpair from database
  const handleDeleteCard = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/words/${word.id}`);
      setWordPairs((prevState) => prevState.filter((w) => w.id !== word.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetFinnish = (e) => {
    setUpdateFinnish(e.target.value);
  };

  const handleSetEnglish = (e) => {
    setUpdateEnglish(e.target.value);
  };

  //Update wordpair
  const handleUpdateCard = async () => {
    try {
      const results = await axios.patch(
        `http://localhost:8080/api/words/${word.id}`,
        { finnish_word: updateFinnish, english_word: updateEnglish }
      );
      const updatedWords = wordPairs.map((word) =>
        word.id === results.data.id ? results.data : word
      );
      setWordPairs(updatedWords);
      handleFlipCard();
    } catch (error) {
      console.log(error);
    }
  };

  //Used to change the card contents by switching between false and true values
  const handleFlipCard = () => {
    setToggleCard(!toggleCard);
  };

  return (
    <>
      {toggleCard ? (
        <Card sx={{ height: "250px" }}>
          <CardContent>
            <h3>{learningDirection}</h3>
            <div className="card-wordpair">
              <div className="card-finnish-word">
                <h3>Finnish</h3>
                <p>{word.finnish_word}</p>
              </div>
              <div className="english-word">
                <h3>English</h3>
                <p>{word.english_word}</p>
              </div>
            </div>
            <div className="card-buttons">
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteCard}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleFlipCard}
              >
                Update
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ height: "250px" }}>
          <CardContent>
            <h3>{learningDirection}</h3>
            <h3>Finnish: {word.finnish_word}</h3>
            <input onChange={handleSetFinnish} placeholder="change word" />
            <h3>English: {word.english_word}</h3>
            <input onChange={handleSetEnglish} placeholder="change word" />
            <div className="card-buttons">
              <button onClick={handleFlipCard}>Cancel</button>
              <button onClick={handleUpdateCard}>Save</button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default WordCard;
