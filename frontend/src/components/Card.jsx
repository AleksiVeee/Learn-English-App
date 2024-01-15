/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const Card = ({ word, setWordPairs, wordPairs }) => {
  const [toggleCard, setToggleCard] = useState(true);
  const [updateFinnish, setUpdateFinnish] = useState(word.finnish_word);
  const [updateEnglish, setUpdateEnglish] = useState(word.english_word);

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
        (word.id === results.data.id ? results.data : word
      ));
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
        <div className="card-content">
          <div className="card-wordpair">
            <div className="finnish-word">
              <h3>Finnish</h3>
              <p>{word.finnish_word}</p>
            </div>
            <div className="english-word">
              <h3>English</h3>
              <p>{word.english_word}</p>
            </div>
          </div>
          <div className="card-buttons">
            <button onClick={handleDeleteCard}>Delete</button>
            <button onClick={handleFlipCard}>Update</button>
          </div>
        </div>
      ) : (
        <div className="card-content">
          <h3>Finnish: {word.finnish_word}</h3>
          <input onChange={handleSetFinnish} placeholder="change word" />
          <h3>English: {word.english_word}</h3>
          <input onChange={handleSetEnglish} placeholder="change word" />
          <button onClick={handleFlipCard}>Cancel</button>
          <button onClick={handleUpdateCard}>Save</button>
        </div>
      )}
    </>
  );
};

export default Card;
