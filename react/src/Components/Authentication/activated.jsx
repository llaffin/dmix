import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
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
}));

export default function Activated() {
  const classes = useStyles();
  const [firstLoad, setLoad] = React.useState(true);

  // const [activateToken, setToken] = React.useState("");

  const [message, setMessage] = React.useState("");

  var pathArray = window.location.search.split("=");
  var tokenURL = pathArray[1];
  console.log("Token from URL:", tokenURL);

  async function apiFunc(toInput) {
    const response = await fetch(`/api/registration/activate/${tokenURL}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      // body: JSON.stringify(toInput),
    });

    let body = await response;
    console.log(body);
    setMessage(body.ok ? "Activated successful" : "Activation failed");
  }

  const handleSubmit = (variables) => {
    const toInput = { passwordResetCode: tokenURL };
    apiFunc(toInput);
    // setToken(tokenURL);
    console.log(tokenURL);
  };

  if (firstLoad) {
    // sampleFunc();
    setLoad(false);
  }

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"newByteX © "} {new Date().getFullYear()}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <br></br>
        <br></br>
        <br></br>
        <Avatar className={classes.avatar}>
          <AddReactionIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Successfully Activated
        </Typography>
        <p className="details">
          Your account has been successfuly activated! Click on the button below
          to sign in
        </p>
        <form className={classes.form} noValidate>
          {/* <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            preventefault
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign in
          </Button> */}
          <Button
            component={Link}
            to="/sign-in"
            fullWidth
            variant="contained"
            color="info"
            preventefault
            className={classes.submit}
            onClick={handleSubmit}
          >
            Continue to Sign In
            {/* <NavLink to="/sign-in">Sign In</NavLink> */}
          </Button>
        </form>
        <Typography style={{ margin: 7 }} variant="body1">
          Status: {message}
        </Typography>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
