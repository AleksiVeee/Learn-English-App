import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { LinkButton } from "../material_ui_styles";

const MainPage = () => {
  return (
    <Container>
      <h1 style={{ textAlign: "center", margin: "2rem" }}>Learn English App</h1>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "15rem",
        }}
      >
        <Link to={"/admin"}>
          <LinkButton variant="contained">Teacher</LinkButton>
        </Link>
        <Link to={"/student"}>
          <LinkButton variant="contained">Student</LinkButton>
        </Link>
      </Container>
    </Container>
  );
};

export default MainPage;
