/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";

const WordTest = ({ word, setScore, learningDirection }) => {
  const [userInput, setUserInput] = useState("");
  const correctTranslationRef = useRef(
    learningDirection === "eng" ? word.english_word : word.finnish_word
  );

  //Check if the userInput mathces the correct translation and update the score
  useEffect(() => {
    //Check the learningDirection value and render words with matching tag
    correctTranslationRef.current =
      learningDirection === "eng" ? word.english_word : word.finnish_word;

    if (
      userInput.toLocaleLowerCase() ===
      correctTranslationRef.current.toLocaleLowerCase()
    ) {
      setScore((prevScore) => prevScore + 1);
    }

    if (userInput === "") {
      setScore((prevScore) => Math.max(0, prevScore - 1));
    }
  }, [userInput, learningDirection, word, setScore]);

  //Set userInput value to state
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  //Conditionally render right language using the learningDirection value
  return (
    <div>
      <h3>
        {learningDirection === "eng" ? word.finnish_word : word.english_word}
      </h3>
      <input onChange={handleInputChange} />
    </div>
  );
};

export default WordTest
