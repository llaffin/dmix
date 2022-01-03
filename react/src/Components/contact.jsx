import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FaFacebook, FaSoundcloud, FaTwitch } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { SiTiktok } from "react-icons/si";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
}));

export default function About() {
  const classes = useStyles();
  const [firstLoad, setLoad] = React.useState(true);

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"newByteX © "} {new Date().getFullYear()}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="s">
      <div id="main">
        <div className="name">
          <h1>
            <span>Contact</span> Me
          </h1>
          <br></br>
          <a href="http://www.tiktok.com/" target="_blank" rel="noreferrer">
            <SiTiktok class="socialMedia"></SiTiktok>
          </a>
          <a href="http://www.facebook.com/" target="_blank" rel="noreferrer">
            <FaFacebook class="socialMedia"></FaFacebook>
          </a>
          <a href="http://www.twitch.tv/" target="_blank" rel="noreferrer">
            <FaTwitch class="socialMedia"></FaTwitch>
          </a>
          <a href="http://www.soundcloud.com/" target="_blank" rel="noreferrer">
            <FaSoundcloud class="socialMedia"></FaSoundcloud>
          </a>
          <a href="mailto: test@gmail.com" target="_blank" rel="noreferrer">
            <HiOutlineMail class="socialMedia"></HiOutlineMail>
          </a>
        </div>
      </div>
      <CssBaseline />
      <Box mt={8} class="copyrightFooter">
        <Copyright />
        <br></br>
      </Box>
    </Container>
  );
}
