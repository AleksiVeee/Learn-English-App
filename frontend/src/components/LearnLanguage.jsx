/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

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

const LearnLanguage = ({ wordPairs, learningDirection }) => {
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);

  //Filter and take 10 random "eng" tagged words and insert them into englishWords state
  const getRandomSubset = (array, count) => {
    const filterWords = array.filter(
      (word) => word.learning_direction === learningDirection
    );
    const shuffledArray = filterWords.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

  //Run useEffect at the first render and set the state to be max 10 random "eng" tagged words
  useEffect(() => {
    const subset = getRandomSubset(wordPairs, 10);
    setWords(subset);
  }, [wordPairs, learningDirection]);

  //Render the page content and build word quiz with component WordTest
  return (
    <>
      <Link to={"/student"}>Go Back</Link>
      <h1>{`Translate to ${
        learningDirection === "eng" ? "English" : "Finnish"
      }`}</h1>
      {words.map((word) => (
        <WordTest
          key={word.id}
          word={word}
          setScore={setScore}
          learningDirection={learningDirection}
        />
      ))}
      <h3>
        Score: {score}/{words.length}
      </h3>
    </>
  );
};

export default LearnLanguage;
