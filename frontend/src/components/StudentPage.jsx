/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

//LanguageLink component creates a link for specific language route
const LanguageLink = ({ to, text }) => {
  return (
    <Link to={`/student/${to}`}>
      {text}
    </Link>
  )
}

const StudentPage = () => {
  return (
    <div>
      <p>StudentPage</p>
      <h2>Choose language you want to learn</h2>
      <Link to="/">Go Back</Link>
      <LanguageLink to="learn-english" text="English to Finnish" />
      <LanguageLink to="learn-finnish" text="Finnish to English" />
    </div>
  );
};

export default StudentPage;
