import { Link } from "react-router-dom"

const StudentPage = () => {
  return (
    <div>
      <p>StudentPage</p>
      <h2>Choose language you want to learn</h2>
      <Link to="/">Go Back</Link>
      <Link to="/student/learn-english">English to Finnish</Link>
      <Link to="/student/learn-finnish">Finnish to English</Link>
    </div>
  );
};

export default StudentPage;
