import Container from "@material-ui/core/Container";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rootDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    maxWidth: "100%",
    paddingTop: "5em",
  },
  trackBox: {
    display: "flex",
    flexWrap: "wrap",
    width: "33%",
    height: "18em",
    margin: "0 0.30rem 2rem 0",
    paddingTop: "10px",
    paddingBottom: "10px",
    // alignContent: "flex-start",
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    backgroundColor: "#1E1E1E",
  },
  trackDetails: {
    width: "100%",
    margin: 0,
    padding: 0,
    alignSelf: "flex-start",
    color: "white",
  },
  trackTitle: {
    fontWeight: "bold",
    fontSize: "2em",
    alignSelf: "flex-start",
  },
  trackSubtitles: {
    fontStyle: "italic",
    alignSelf: "flex-start",
  },
  audioElement: {
    alignSelf: "flex-end",
    display: "block",
    width: "100%",
  },
  audioPlayer: {
    width: "100%",
  },
}));

const UserTrackList = (props) => {
  const classes = useStyles();
  const { tracks } = props;

  const setTrackSource = (id) => {
    // return `http://142.93.146.6:8080/api/track/streamTrack/${id}`;
    return `https://dmixbreed.com/api/track/streamTrack/${id}`;
  };

  if (!tracks || tracks.length === 0)
    return <p>No tracks at the moment, check back later!</p>;
  return (
    <Grid className={classes.rootDiv}>
      {tracks.map((track) => {
        return (
          <Container
            maxWidth={false}
            component="div"
            className={classes.trackBox}
          >
            <p className={`${classes.trackDetails} ${classes.trackTitle}`}>
              {" "}
              {track.artist}
            </p>
            <p className={`${classes.trackDetails} ${classes.trackSubtitles}`}>
              Artist: {track.title}
            </p>
            <p className={`${classes.trackDetails} ${classes.trackSubtitles}`}>
              Release Date: {track.releaseDate}
            </p>
            <div className={classes.audioElement}>
              <audio
                className={classes.audioPlayer}
                type="audio/mpeg"
                controls
                volume="true"
                download
              >
                <source
                  src={setTrackSource(track.id)}
                  type="audio/mpeg"
                ></source>
                Your browser does not support the audio element.
              </audio>
            </div>
            {/* <a href={setTrackSource(track.id)} download={track.fileName}>Download</a> */}
          </Container>
        );
      })}
    </Grid>
  );
};

export default UserTrackList;
