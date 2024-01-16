import { useEffect, useState } from "react";

const LearnEnglish = ({ wordPairs }) => {

    const [englishWords, setEnglisWords] = useState([])


    //Filter and take 10 random "eng" tagged words and insert them into englishWords state
    const getRandomSubset = (array, count) => {
        const filterEnglish = wordPairs.filter((word) => word.learning_direction === "eng")
        const shuffledArray = filterEnglish.sort(() => 0.5 - Math.random())
        return shuffledArray.slice(0, count)
    }

    useEffect(() => {
        const subset = getRandomSubset(wordPairs, 10)
        setEnglisWords(subset)
    }, [wordPairs])    

  return (
    <>
      <h1>Translate to English</h1>
      {englishWords.map((word) => (
        <div key={word.id}>
          <h3>{word.finnish_word}</h3>
          <input />
        </div>
      ))}
    </>
  );
};

export default LearnEnglish;
