import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import AuthService from "../services/auth-service";
import LazyLoad from "react-lazyload";

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
}));

const AdminFlyerList = (props) => {
  const classes = useStyles();
  const { flyers } = props;

  const authService = AuthService.getInstance();

  async function apiFunc(toInput) {
    const response = await fetch("/api/flyer/deleteFlyer", {
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

  const dateComparer = (eventDate) => {
    const currentDate = moment.now();
    var momentEventDate = moment(new Date(eventDate)).format("x");
    const diff = momentEventDate - currentDate;
    const diffDuration = moment.duration(diff);
    // return diffDuration.days();
    return diffDuration;
  };

  const dateDifferenceDisplay = (differenceInDays) => {
    if (differenceInDays.days() < 0) {
      return (
        <span className={classes.eventOverdue}>
          This event is {Math.abs(differenceInDays.days())} day(s) and {Math.abs(differenceInDays.months())} month(s) overdue!
        </span>
      );
    } else if (differenceInDays.days() > 0) {
      return (
        <span className={classes.eventHasTime}>
          This event is happening in {differenceInDays.days()} day(s) and {Math.abs(differenceInDays.months())} month(s)!
        </span>
      );
    } else {
      return `This event is happening today!`;
    }
  };

  const setFlyerSource = (id) => {
    // return `http://142.93.146.6:8080/api/flyer/streamFlyer/${id}`;
    return `https://dmixbreed.com/api/flyer/streamFlyer/${id}`;
  };

  if (!flyers || flyers.length === 0)
    return (
      <p>
        <b>No flyers uploaded</b>
      </p>
    );
  return (
    <Grid className={classes.eventsContainer}>
      <h2 className={classes.flyerManageTitle}>Manage upcoming events</h2>
      <LazyLoad>
        {flyers.map((flyer) => {
          return (
            <Container
              component="div"
              maxWidth={false}
              className={classes.flyerBox}
              key={flyer.id}
            >
              <div className={classes.imageBox}>
                <img
                  src={setFlyerSource(flyer.id)}
                  alt={flyer.eventName}
                  className={classes.flyerImage}
                />
              </div>
              <div className={classes.eventDetailsBox}>
                <p className={`${classes.flyerDetails} ${classes.flyerTitle}`}>
                  {flyer.eventName}
                </p>
                <p
                  className={`${classes.flyerDetails} ${classes.flyerSubtitles}`}
                >
                  Event date: {flyer.eventDate} |{" "}
                  {dateDifferenceDisplay(dateComparer(flyer.eventDate))}
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
                    "Deleting event, please confirm."
                  );
                  if (confirmBox === true) {
                    handleDelete(flyer.id);
                    // window.location.reload(true);
                  }
                }}
              >
                Delete event
              </Button>
            </Container>
          );
        })}
      </LazyLoad>
    </Grid>
  );
};

export default AdminFlyerList;
