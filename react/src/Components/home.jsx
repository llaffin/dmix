import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Zoom } from "react-slideshow-image";
import React, { useEffect, useState } from "react";
import image1 from "../Assests/Images/image1.bmp";
import image2 from "../Assests/Images/image2.bmp";
import list from "./userFlyerList";
import imageListLoading from "./imageListLoading";

const images = [image1, image2];

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

const zoomOutProperties = {
  duration: 3000,
  transitionDuration: 350,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: false,
};

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Zoom {...zoomOutProperties}>
        {images.map((each, index) => (
            <img
              key={index}
              style={
                {
                  width: "100%",
                  display: "block",
                  margin: "0 auto"
                }
              }
              src={each}
              alt=""
            />
        ))}
      </Zoom>
    </div>
  );
};

function Home() {
  const classes = useStyles();
  const ImageListLoading = imageListLoading(list);
  const [appState, setAppState] = useState({
    loading: false,
    tracks: null,
  });

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"newByteX © "} {new Date().getFullYear()}
      </Typography>
    );
  }

  // https://dmixbreed.com/api/flyer/getAllFlyers
  // /api/flyer/getAllFlyers

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `/api/flyer/getAllFlyers`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((flyers) => {
        setAppState({ loading: false, flyers: flyers });
      });
  }, [setAppState]);
  return (
    <Container component="main" maxWidth="s">
      <div id="main">
        <div className="name"></div>
        <div id="parent">
          <div class="slideChildHome">
            <Slideshow />
          </div>
          <div class="slideChild">
            <div className="Flyers">
              <div className="flyer-container">
                <ImageListLoading
                  isLoading={appState.loading}
                  flyers={appState.flyers}
                />
              </div>
            </div>
          </div>
          <div class="twitch child">
            <div class="twitch-video">
              <iframe
                title="dmixbreedStream"
                src="https://player.twitch.tv/?channel=dmixbreedthedj&parent=dmixbreed.com&autoplay=false"
                frameborder="0"
                scrolling="no"
                allowfullscreen="true"
                height="100%"
                width="100%">
              </iframe>
            </div>
            <div class="twitch-chat">
              <iframe
                title="dmixbreedChat"
                frameborder="0"
                scrolling="no"
                src="https://www.twitch.tv/embed/dmixbreedthedj/chat?parent=dmixbreed.com"
                height="100%"
                width="100%">
              </iframe>
            </div>
          </div>
        </div>
        <Box mt={8}>
          <Copyright />
          <br></br>
        </Box>
      </div>
      <CssBaseline />
    </Container>
  );
}
export default Home;
