import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFilePicker } from "use-file-picker";
import list from "./adminFlyerList";
import imageListLoading from "./imageListLoading";
import moment from "moment";
import AuthService from "../services/auth-service";

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
  collapsibleConatainers: {
    backgroundColor: "gold",
    width: "100%",
  },
  openedCollapsibleConatainers: {
    backgroundColor: "grey",
    width: "100%",
  },
}));

function FlyerManagementComp() {
  const classes = useStyles();

  const [eventName, setEventName] = React.useState("");
  const [calendarEventDate, setCalendarEventDate] = React.useState(new Date());
  const [eventDate, setEventDate] = React.useState(new Date());
  const [file, setFlyerFile] = React.useState();

  const authService = AuthService.getInstance();

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handlesetFlyerFileChange = (event) => {
    setFlyerFile(event.target.files[0]);
  };

  const [message, setMessage] = React.useState("");

  const [openFileSelector, { filesContent }] = useFilePicker({
    multiple: false,
    accept: [".jpg", ".png", ".gif"],
  });

  const ImageListLoading = imageListLoading(list);
  const [appState, setAppState] = useState({
    loading: false,
    flyers: null,
  });

  async function apiFunc(toInput) {
    const formData = new FormData();

    formData.append("eventName", toInput.eventName);
    formData.append("eventDate", toInput.eventDate);
    formData.append("file", toInput.file);

    if (!toInput.eventName) {
      alert("Error! Event name cannot be empty. Please try again");
    } else if (!toInput.file) {
      alert("Error! No file selected. Please try again");
    }

    // https://dmixbreed.com/api/flyer/getAllFlyers
    // /api/flyer/createFlyer
    const response = await fetch("/api/flyer/createFlyer", {
      method: "POST",
      headers: new Headers({
        Authorization: authService.getSecureToken(),
      }),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: formData,
    });
    let body = await response;
    setMessage(body.ok ? "Flyer added successfully" : "Flyer failed");
    if (
      !alert(
        body.ok
          ? "Flyer added successfully!"
          : "Error! Flyer failed to upload. Please try again"
      )
    ) {
      window.location.reload();
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const toInput = { eventName, eventDate, file };

    apiFunc(toInput);
    setEventName("");
    setEventDate("");
    setFlyerFile();
  };

  const formatEventDate = (pCalendarEventDate) => {
    setCalendarEventDate(pCalendarEventDate);
    const formattedDate = moment(pCalendarEventDate).format("YYYY-MM-DD");
    return formattedDate;
  };

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
    <Container component="main" maxWidth={false}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <InsertPhotoIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Events/Flyers
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                value={eventName}
                label="Event Name"
                name="eventName"
                autoComplete="eventName"
                helperText="cannot be blank"
                onChange={handleEventNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <div id="datePicker">
                <p class="manageSiteDate">Event date:</p>
                <DatePicker
                  required
                  dateFormat="yyyy-MM-dd"
                  selected={calendarEventDate}
                  onChange={(calendarEventDate) =>
                    setEventDate(formatEventDate(calendarEventDate))
                  }
                  id="datePicker"
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <div id="filePicker">
                <input
                  type="file"
                  name="file"
                  onChange={handlesetFlyerFileChange}
                  accept="image/png, image/jpeg"
                ></input>
                <div>
                  {filesContent.map((file, index) =>
                    (
                      <div>
                        <p>
                          File Selected: <b>{file.name}</b>
                        </p>
                        {/* <p>{file}</p> */}
                        {/* <div key={index}>{file.content}</div> */}
                        <br />
                      </div>
                    )
                  )}
                </div>
              </div>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="info"
            preventDefault
            className={classes.submit}
            // onClick={handleSubmit}
          >
            Add Flyer
          </Button>
        </form>
        <Typography style={{ margin: 7 }} variant="body1">
          Status: {message}
        </Typography>
      </div>
      <div className="Flyers">
        <div className="flyer-container">
          <ImageListLoading
            isLoading={appState.loading}
            flyers={appState.flyers}
          />
        </div>
      </div>
    </Container>
  );
}

export default FlyerManagementComp;
