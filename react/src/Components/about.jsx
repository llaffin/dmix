import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitch,
  // FaSoundcloud,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { SiTiktok } from "react-icons/si";
import image1 from "../Assests/Images/AboutMe.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    margin: "0 auto",
    
  },
  aboutMeTitle: {
    alignSelf: "flex-end",
    width: "100%",
  },
  aboutMeSection: {
    width: "55%",
    textAlign: "left",
  },
  bold: {
    fontWeight: "bold",
  },
  colourText: {
    fontWeight: "bolder",
    color: "#DB1332"
  },
  aboutMeImageBox: {
    width: "45%",
  },
  aboutMeImage: {
    width: "75%",
    paddingLeft: "15px"
  },
  contactTitle: {
    width: "100%",
    alignSelf: "flex-start"
  },
  socials: {
    width: "100%"
  }
}));

export default function About() {
  const classes = useStyles();

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"newByteX © "} {new Date().getFullYear()}
      </Typography>
    );
  }

  return (
    <Container component="main" >
      <div class="divBR"></div>
      <div id="main">
        <div className={`${classes.name} name`}>
          <h1 className={classes.aboutMeTitle}>
            About <span>Steve Maraj</span>
          </h1>
          <div className={classes.aboutMeSection}>
            <p className={classes.details}>
              His introduction to music and DJing came from his father, an
              immigrant from <span className={classes.colourText}>Trinidad</span>. He worked many family events, weddings,
              and social outings with fellow Trinidadians playing soca and
              calypso. Records and turntables in the basement were his practice
              tools throughout the years.
            </p>
            <p className={classes.details}>
              He started to delve into other genres of music he was growing up
              with and was popular at the time with the circles he socialized
              within.
            </p>
            <p className={classes.details}>
              Hip hop, RandB, House and Top 40 were his playing strength and
              crowd pleasers at events. Meeting and networking with other DJs in
              the Greater Toronto area gave him exposure and recognition for his
              talent.
            </p>
            <p className={classes.details}>
              He was one of their first DJs to move from records to the computer
              to mix. Educating himself on new software and equipment to bring
              the art of music and sound to the next level.
            </p>
            <p className={classes.details}>
              Took a break from DJ public events to focus on his career and
              personal life, had a family, but always dabbled with music as a
              hobby
            </p>
            <p className={classes.details}>
              A trip to Trinidad for Carnival sparked the love for music again,
              and the creative flow came back. He was{" "}
              <span className={classes.bold}>energized</span> with the new
              sounds coming out of the soca world. He started to mix old and new
              sounds to create a different vibe.
            </p>
            <p className={classes.details}>
              His fans now say he is a versatile DJ. He takes on any genre,
              challenging and teaching himself the latest songs and trends.
              Putting in the work to elevate his skills and up to date with the
              ever <span className={classes.bold}>evolving</span> world of
              sound.
            </p>
          </div>
          <div className={classes.aboutMeImageBox}>
            <img
              className={classes.aboutMeImage}
              src={image1}
              alt="Steve Maraj"
            ></img>
          </div>

          <br></br>
          <h2 className={classes.contactTitle}>
            <span id="contactH2">Contact Me</span>
          </h2>
          <br></br>
          <div className={classes.socials}>
            <a
              href="https://www.instagram.com/dmixbreedthedj/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram class="socialMedia"></FaInstagram>
            </a>
            <a
              href="http://www.facebook.com/dmixbreedthedj"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook class="socialMedia"></FaFacebook>
            </a>
            <a
              href="https://www.tiktok.com/@dmixbreedthedj?lang=en"
              target="_blank"
              rel="noreferrer"
            >
              <SiTiktok class="socialMedia"></SiTiktok>
            </a>
            <a
              href="https://www.twitch.tv/dmixbreedthedj"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitch class="socialMedia"></FaTwitch>
            </a>
            {/* <a
              href="http://www.soundcloud.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaSoundcloud class="socialMedia"></FaSoundcloud>
            </a> */}
            <a
              href="mailto:dmixbreed@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <HiOutlineMail class="socialMedia"></HiOutlineMail>
            </a>
          </div>
          <div class="divBR2"></div>
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
