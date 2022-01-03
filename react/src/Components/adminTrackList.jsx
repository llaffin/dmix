import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import React from "react";
import AuthService from "../services/auth-service";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TrackImage from "../Assests/Images/TrackImage.png";

const useStyles = makeStyles((theme) => ({
  eventsContainer: {
    // scrollBehavior: "smooth",
    overflow: "auto",
    maxHeight: "20em",
    marginBottom: "3rem",
  },
  flyerBox: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "13em",
    margin: "0 0 2rem 0",
    alignContent: "flex-start",
    borderBottom: "1px darkgrey solid",
  },
  flyerDetails: {
    width: "100%",
    margin: 0,
    padding: 0,
  },
  flyerTitle: {
    fontWeight: "bold",
    fontSize: "2em",
  },
  flyerSubtitles: {
    fontStyle: "italic",
    fontSize: "1.2em",
  },
  imageBox: {
    alignSelf: "flex-start",
    width: "10%",
  },
  eventDetailsBox: {
    width: "70%",
    paddingLeft: "1rem",
  },
  deleteBtn: {
    width: "20%",
    fontSize: "1.5rem",
  },
  flyerImage: {
    alignSelf: "flex-end",
    width: "100%",
  },
  eventOverdue: {
    color: "red",
  },
  eventHasTime: {
    color: "green",
  },
  flyerManageTitle: {
    fontSize: "3rem",
  },
  trackTitle: {
    fontSize: "1em",
  },
}));

const AdminTrackList = (props) => {
  const classes = useStyles();
  const { tracks } = props;

  const authService = AuthService.getInstance();

  async function apiFunc(toInput) {
    const response = await fetch("/api/track/deleteTrack", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: authService.getSecureToken(),
      }),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(toInput),
    });
    let body = await response;
    window.location.reload();
  }

  const handleDelete = (id) => {
    const toInput = { id };
    apiFunc(toInput);
  };

  const setTrackSource = (id) => {
    // return `http://142.93.146.6:8080/api/track/streamTrack/${id}`;
    return `https://dmixbreed.com/api/track/streamTrack/${id}`;
  };

  if (!tracks || tracks.length === 0)
    return (
      <p>
        <b>No tracks uploaded</b>
      </p>
    );
  return (
    <Grid className={classes.eventsContainer}>
      <h2 className={classes.flyerManageTitle}>Manage tracks</h2>
      {tracks.map((track) => {
        return (
          <Container
            component="div"
            maxWidth={false}
            className={classes.flyerBox}
            key={track.id}
          >
            <div className={classes.imageBox}>
              <img src={TrackImage} className={classes.flyerImage} alt="upcoming event" />
            </div>
            <div key={track.id} className={classes.eventDetailsBox}>
              <p className={`${classes.flyerDetails} ${classes.flyerTitle}`}>
                <span className={classes.trackTitle}>{track.title}</span> -{" "}
                {track.artist}
                <br></br>
                <audio type="audio/mpeg" controls volume="true">
                  <source
                    src={setTrackSource(track.id)}
                    type="audio/mpeg"
                  ></source>
                  Your browser does not support the audio element.
                </audio>
              </p>
            </div>
            <Button
              className={classes.deleteBtn}
              fullWidth
              variant="contained"
              color="primary"
              preventDefault
              onClick={() => {
                const confirmBox = window.confirm(
                  "Deleting track, please confirm."
                );
                if (confirmBox === true) {
                  handleDelete(track.id);
                }
              }}
            >
              Delete track
            </Button>
          </Container>
        );
      })}
    </Grid>
  );
};

export default AdminTrackList;
