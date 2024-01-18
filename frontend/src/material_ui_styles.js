import styled from "@emotion/styled";
import { Button, Box } from "@mui/material";

export const LinkButton = styled(Button)({
  padding: "1.3rem 3rem",
  fontSize: "1.2rem",
  width: "250px",
});

export const CreateBox = styled(Box)({
  width: "100%",
  maxWidth: "750px",
  margin: "2rem 0rem",

  "& .MuiBox-root": {
    paddingRight: "2rem",
  },

  "& input": {
    padding: ".3rem 0rem",
    marginLeft: "1rem",
  },
});

export const TranslationBox = styled(Box)(({ answercolor }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "1rem",

  "& input": {
    padding: ".5rem 1rem",
    marginLeft: "1rem",
    width: "70%",
    fontSize: "1.2rem",
    backgroundColor: answercolor,
  },
}));
