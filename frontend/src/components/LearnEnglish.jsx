/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const WordTest = ({ word, setScore }) => {
  const [userInput, setUserInput] = useState("");
  const correctTranslationRef = useRef(word.english_word);

  //Check if the userInput mathces the correct translation and update the score
  useEffect(() => {
    correctTranslationRef.current = word.english_word;
    if (
      userInput.toLocaleLowerCase() ===
      correctTranslationRef.current.toLocaleLowerCase()
    ) {
      setScore((prevScore) => prevScore + 1);
    }
    if (userInput === "") {
      setScore((prevScore) => Math.max(0, prevScore - 1));
    }
  }, [userInput]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <h3>{word.finnish_word}</h3>
      <input onChange={handleInputChange} />
    </div>
  );
};

const LearnEnglish = ({ wordPairs }) => {
  const [englishWords, setEnglisWords] = useState([]);
  const [score, setScore] = useState(0);

  //Filter and take 10 random "eng" tagged words and insert them into englishWords state
  const getRandomSubset = (array, count) => {
    const filterEnglish = wordPairs.filter(
      (word) => word.learning_direction === "eng"
    );
    const shuffledArray = filterEnglish.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

  //Run useEffect at the first render and set the state to be max 10 random "eng" tagged words
  useEffect(() => {
    const subset = getRandomSubset(wordPairs, 10);
    setEnglisWords(subset);
  }, [wordPairs]);

  return (
    <>
        <Link to="/student">Go Back</Link>
      <h1>Translate to English</h1>
      {englishWords.map((word) => (
        <WordTest key={word.id} word={word} score={score} setScore={setScore} />
      ))}
      <h3>
        Score: {score}/{englishWords.length}
      </h3>
    </>
  );
};

export default LearnEnglish;
