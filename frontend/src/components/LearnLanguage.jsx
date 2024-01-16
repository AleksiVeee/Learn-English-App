/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WordTest from "./WordTest";

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
