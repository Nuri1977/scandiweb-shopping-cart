import React from "react";
import Img500 from "../../assets/500.webp";
import "./ServerError.scss";

class ServerError extends React.Component {
  render() {
    return (
      <div id="internal-server-error">
        <div
          className="image"
          style={{ backgroundImage: `url('${Img500}')` }}
        />
        <h1>A dog ate our server!</h1>
        <p>
          Your dog is cute but honestly a menace. Where are my shoes? Where is
          my graduation certificate? Where is the chocolate cake I baked for my
          Aunt's birthday? And why did you take your dog to the vet on the same
          Thursday?!
        </p>
      </div>
    );
  }
}

export default ServerError;