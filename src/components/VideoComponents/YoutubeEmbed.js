import React from "react";
import PropTypes from "prop-types";
import "./youtubeEmbedStyle.css";

const YoutubeEmbed = ({ videoInformation }) => (
  <>
  <h2 align="center"><mark class = "green">{videoInformation.videoName}</mark></h2>
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${videoInformation.embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
  </>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;