import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Img404 from "../../assets/404.webp";
import './NotFound.scss'

export class NotFound extends Component {
  render() {
    return (
      <div id="not-found-page">
        <div
          className="image"
          style={{ backgroundImage: `url('${Img404}')` }}
        />
        <h1>This Page Is Not on the Map!</h1>
        <p>
          You told your friends you weren't bringing your phone, to try and
          experience what travel was like back in the day. You bought a map and
          a bottle of water and carried your camera for the money shot. But the
          map was from 2005 and the landscape had changed. So here you are, in
          the middle of a large field, that the map continues to claim is a
          local grocer.
        </p>
        <Link to="/">go back home</Link>
    </div>
    )
  }
}

export default NotFound