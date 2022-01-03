import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFilePicker } from "use-file-picker";
import list from "./adminTrackList";
import trackListLoading from "./trackListLoading";
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

function TrackManagementComp() {
  const classes = useStyles();

  const [title, setTrackName] = React.useState("");
  const [artist, setTrackArtist] = React.useState("");
  const [calendarTrackDate, setCalendarTrackDate] = React.useState(new Date());
  const [releaseDate, setDate] = useState(new Date());
  const [file, setTrackFile] = React.useState();

  const authService = AuthService.getInstance();

  const handleTrackNameChange = (event) => {
    setTrackName(event.target.value);
  };

  const handleTrackArtistChange = (event) => setTrackArtist(event.target.value);
  
  const handlesetTrackFileChange = (event) => {
    console.log("LOGGING TOKEN (TO DELETE)" + authService.getSecureToken());
    setTrackFile(event.target.files[0]);
  };

  const [message, setMessage] = React.useState("");

  const [openFileSelector, { filesContent }] = useFilePicker({
    multiple: false,
    accept: [".mp3", ".wav"],
  });

  const ListLoading = trackListLoading(list);
  const [appState, setAppState] = useState({
    loading: false,
    tracks: null,
  });

  async function apiFunc(toInput) {
    const formData = new FormData();

    formData.append("title", toInput.title);
    formData.append("artist", toInput.artist);
    formData.append("releaseDate", toInput.releaseDate);
    formData.append("file", toInput.file);

    if (!toInput.title) {
      alert("Error! Title cannot be empty. Please try again");
    } else if (!toInput.artist) {
      alert("Error! Artist cannot be empty. Please try again");
    } else if (!toInput.file) {
      alert("Error! No file selected. Please try again");
    }

    const response = await fetch("/api/track/createTrack", {
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
    setMessage(body.ok ? "Track added successfully" : "Track failed");
    if (
      !alert(
        body.ok
          ? "Track added successfully!"
          : "Error! Track failed to upload. Please try again"
      )
    ) {
      window.location.reload();
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const toInput = { title, artist, releaseDate, file };

    apiFunc(toInput);
    setTrackName("");
    setTrackArtist("");
    setDate("");
    setTrackFile();
  };

  const formatTrackDate = (pCalendarTrackDate) => {
    setCalendarTrackDate(pCalendarTrackDate);
    const formattedDate = moment(pCalendarTrackDate).format("YYYY-MM-DD");
    return formattedDate;
  };

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
    <Container component="main" maxWidth={false}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LibraryMusicIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Tracks
        </Typography>
        <form
          className={classes.form}
          onSubmit={(event) => handleSubmit(event)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                value={title}
                label="Track Name"
                name="title"
                autoComplete="title"
                helperText="cannot be blank"
                onChange={handleTrackNameChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="artist"
                value={artist}
                label="Track Artist"
                type="artist"
                name="artist"
                autoComplete="artist"
                helperText="cannot be blank"
                onChange={handleTrackArtistChange}
              />
            </Grid>

            <Grid item xs={12}>
              <div id="datePicker">
                <p class="manageSiteDate">Track date:</p>
                <DatePicker
                  required
                  dateFormat="yyyy-MM-dd"
                  selected={calendarTrackDate}
                  onChange={(calendarTrackDate) =>
                    setDate(formatTrackDate(calendarTrackDate))
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
                  onChange={handlesetTrackFileChange}
                  accept="audio/mpeg"
                ></input>
                <div>
                  {filesContent.map((file, index) =>
                    (
                      <div>
                        <p>
                          File Selected: <b>{file.name}</b>
                        </p>
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
          >
            Add Track
          </Button>
        </form>
        <Typography style={{ margin: 7 }} variant="body1">
          Status: {message}
        </Typography>
      </div>
      <div className="Tracks">
        <div className="track-container">
          <ListLoading isLoading={appState.loading} tracks={appState.tracks} />
        </div>
      </div>
    </Container>
  );
}

export default TrackManagementComp;
