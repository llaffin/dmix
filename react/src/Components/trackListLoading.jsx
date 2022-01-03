import React from "react";

function TrackListLoading(Component) {
  return function LoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <p style={{ textAlign: "center", fontSize: "15px", fontWeight: "bold" }}>
        Hang tight, fetching tracks...
      </p>
    );
  };
}

export default TrackListLoading;
