import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { React } from "react";
import { Redirect } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Collapsible from "react-collapsible";
import TrackManagementComp from "./trackManagementComp";
import FlyerManagementComp from "./flyerManagementComp";
import { ImPlus, ImMinus } from "react-icons/im/";
import AuthService from "../services/auth-service";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(30),
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
  mainContainer: {
    minHeight: "70vh",
    maxHeight: "100%",
  },
  collapsibleContainers: {
    backgroundColor: "lightgrey",
    width: "100%",
    height: "10rem",
    marginBottom: "2.5rem",
    padding: "0.5rem 1.5rem",
  },
  openedCollapsibleContainers: {
    backgroundColor: "white",
    width: "100%",
    marginBottom: "2.5rem",
    padding: "0.5rem 1.5rem",
  },
  triggerStyle: {
    fontSize: "3.5rem",
    fontWeight: "bold",
    margin: "0",
    height: "100%",
    alignSelf: "flex-start",
    alignContent: "center",
    width: "80%",
  },
  icon: {
    fontSize: "3.5rem",
    margin: "0",
    textAlign: "right",
    alignSelf: "flex-end",
    alignContent: "center",
    width: "20%",
  },
  triggerBox: {
    display: "flex",
    alignItems: "baseline",
    padding: "2.0rem 1.5rem",
  },
}));

function SiteManagement() {
  const classes = useStyles();
  const authService = AuthService.getInstance();

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"newByteX ©"} {new Date().getFullYear()}
      </Typography>
    );
  }

  const MusicTrigger = (
    <div className={classes.triggerBox}>
      <span className={classes.triggerStyle}>Manage My Music:</span>
      <span className={classes.icon}>
        <ImPlus />
      </span>
    </div>
  );

  const MusicTriggerOpen = (
    <div className={classes.triggerBox}>
      <span className={classes.triggerStyle}>Manage My Music:</span>
      <span className={classes.icon}>
        <ImMinus />
      </span>
    </div>
  );

  const EventTrigger = (
    <div className={classes.triggerBox}>
      <span className={classes.triggerStyle}>Manage My Events and Flyers:</span>
      <span className={classes.icon}>
        <ImPlus />
      </span>
    </div>
  );

  const EventTriggerOpen = (
    <div className={classes.triggerBox}>
      <span className={classes.triggerStyle}>Manage My Events and Flyers:</span>
      <span className={classes.icon}>
        <ImMinus />
      </span>
    </div>
  );

  return (
    <Container className={classes.paper}>
      {authService.hasSecureToken() ? (
        <Container className={classes.mainContainer}>
          <Collapsible
            className={classes.collapsibleContainers}
            openedClassName={classes.openedCollapsibleContainers}
            trigger={MusicTrigger}
            triggerWhenOpen={MusicTriggerOpen}
          >
            <TrackManagementComp></TrackManagementComp>
          </Collapsible>

          <Collapsible
            className={classes.collapsibleContainers}
            openedClassName={classes.openedCollapsibleContainers}
            trigger={EventTrigger}
            triggerWhenOpen={EventTriggerOpen}
          >
            <FlyerManagementComp></FlyerManagementComp>
          </Collapsible>
        </Container>
      ) : (
        <Redirect to="/sign-in" />
      )}
      <Copyright></Copyright>
      <br></br>
    </Container>
  );
}

export default SiteManagement;
