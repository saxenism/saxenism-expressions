import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ video }) => (
  <>
  <h3 align="center">{video.title}</h3>
  <div className="video-responsive">
    <iframe
      src={`https://www.youtube.com/embed/${video.embedID}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={video.title}
    />
  </div>
  </>
);

YoutubeEmbed.propTypes = {
  embedID: PropTypes.string.isRequired
};

export default YoutubeEmbed;