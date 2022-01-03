import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import list from "./userTrackList";
import trackListLoading from "./trackListLoading";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
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
  trackSection: {
    width: "90%",
  },
}));

function Tracks() {
  const classes = useStyles();

  const TrackListLoading = trackListLoading(list);
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

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `/api/track/getAllTracks`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((tracks) => {
        setAppState({ loading: false, tracks: tracks });
      });
  }, [setAppState]);
  return (
    <Container className={classes.trackSection} component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <br></br>
        <br></br>
        <br></br>
        <Avatar className={classes.avatar}>
          <LibraryMusicIcon />
        </Avatar>
      </div>
      <div className="Tracks">
        <div className="track-container">
          <h1 class="tracksTitle">My Mixes:</h1>
          <TrackListLoading
            isLoading={appState.loading}
            tracks={appState.tracks}
          />
        </div>
        <Box mt={8} class="copyrightFooter">
          <br></br>
          <Copyright />
          <br></br>
        </Box>
      </div>
    </Container>
  );
}
export default Tracks;
