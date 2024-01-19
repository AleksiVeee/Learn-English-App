/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WordTest from "./WordTest";
import { Container, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LearnLanguage = ({ wordPairs, learningDirection }) => {
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);

  //Filter and take 10 random tagged words from the database
  const getRandomSubset = (array, count) => {
    const filterWords = array.filter(
      (word) => word.learning_direction === learningDirection
    );
    const shuffledArray = filterWords.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

  //Run useEffect at the first render and set the state to be max 10 random words
  useEffect(() => {
    const subset = getRandomSubset(wordPairs, 10);
    setWords(subset);
  }, [wordPairs, learningDirection]);

  const handleRefreshWindow = () => {
    window.location.reload();
  };

  //Render the page content and build word quiz with component WordTest
  return (
    <Container maxWidth="sm">
      <h1>{`Translate to ${
        learningDirection === "eng" ? "English" : "Finnish"
      }`}</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to={"/student"}>
          <Button variant="contained" startIcon={<ArrowBackIcon />}>
            Go Back
          </Button>
        </Link>
        <h3>
          Score: {score}/{words.length}
        </h3>
      </Box>
      {words.map((word) => (
        <WordTest
          key={word.id}
          word={word}
          setScore={setScore}
          learningDirection={learningDirection}
        />
      ))}
      <Button variant="contained" onClick={handleRefreshWindow}>
        Refresh Words
      </Button>
    </Container>
  );
};

export default LearnLanguage;
