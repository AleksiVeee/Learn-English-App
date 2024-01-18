/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Container, Button } from "@mui/material";
import { LinkButton } from "../material_ui_styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//LanguageLink component creates a link for specific language route
const LanguageLink = ({ to, text }) => {
  return (
    <Link to={`/student/${to}`}>
      <LinkButton variant="contained">{text}</LinkButton>
    </Link>
  );
};

const StudentPage = () => {
  return (
    <Container style={{ textAlign: "center", paddingTop: "15rem" }}>
      <h1>Start Learning</h1>
      <Link to="/">
        <Button variant="contained" startIcon={<ArrowBackIcon />}>
          Go Back
        </Button>
      </Link>
      <h2>Choose language you want to learn</h2>
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <LanguageLink to="learn-finnish" text="English to Finnish" />
        <LanguageLink to="learn-english" text="Finnish to English" />
      </Container>
    </Container>
  );
};

export default StudentPage;
