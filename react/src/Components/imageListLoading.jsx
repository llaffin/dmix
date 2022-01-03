import React from "react";

function ImageListLoading(Component) {
  return function LoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <p style={{ textAlign: "center", fontSize: "15px", fontWeight: "bold" }}>
        Loading flyers...
      </p>
    );
  };
}
export default ImageListLoading;
