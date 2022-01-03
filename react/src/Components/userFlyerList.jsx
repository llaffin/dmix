import Container from "@material-ui/core/Container";
import React from "react";
import { Zoom } from "react-slideshow-image";

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 350,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true,
  canSwipe: true,
};

const UserFlyerList = (props) => {
  const { flyers } = props;

  const Slideshow = () => {
    return (
      <div>
        <Zoom {...zoomOutProperties}>
          {flyers.map((flyer, index) => (
            <div class="each-slide">
              <div>
                <img
                key={index}
                style={{width: "100%", padding: "0", margin: "0 auto"}}
                src={setFlyerSource(flyer.id)}
                alt={flyer.eventName}
                />
              </div>
            </div>
            
          ))}
        </Zoom>
      </div>
    );
  };

  const setFlyerSource = (id) => {
    // return `http://142.93.146.6:8080/api/flyer/streamFlyer/${id}`;
    return `https://dmixbreed.com/api/flyer/streamFlyer/${id}`;
  };

  if (!flyers || flyers.length === 0)
    return (
      <p>
        <br></br>
        <h2
          class="upcomingEventsHeading"
          style={{
            margin: "0 auto",
            textAlign: "center",
            paddingBottom: "2em",
            fontSize: "2rem",
          }}
        >
          My Upcoming Events
        </h2>
        <b style={{ fontSize: "1rem" }}>
          No events coming at the moment, check back later!
        </b>
      </p>
    );
  return (
    <Container maxWidth={false} style={{
      width: "45%"
    }}>
      <br></br>
      <h2
        class="upcomingEventsHeading"
        style={{
          margin: "0 auto",
          textAlign: "center",
          paddingBottom: "2em",
          fontSize: "2rem",
        }}
      >
        My Upcoming Events
      </h2>
      <Slideshow />
    </Container>
  );
};

export default UserFlyerList;
