import { Button } from "antd";
import React, { useEffect, useRef } from "react";

const YouTubeVideoPlayer = ({ videoUrl, muted, autoPlay, loop, ytPlayer }) => {
  const playerRef = useRef(null);

  // Function to extract video ID from YouTube URL
  const getVideoId = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  };

  useEffect(() => {
    const videoId = getVideoId(videoUrl);

    // This function gets called once the API script has loaded.
    const onYouTubeIframeAPIReady = () => {
      ytPlayer.current = new window.YT.Player(playerRef.current, {
        height: "100%",
        width: "100%",
        videoId: videoId,
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          loop: loop ? 1 : 0,
          mute: muted ? 1 : 0,
          controls: 0, // Remove controls
          modestbranding: 1, // Hide YouTube logo
          showinfo: 0, // Hide video title and share icon
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    };

    // This function gets called when the player is ready.
    const onPlayerReady = (event) => {
      console.log("Player is ready");
    };

    // Make sure the API is ready before creating the player.
    if (window.YT) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }
  }, [videoUrl]);

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
      }}
      ref={playerRef}></div>
  );
};

export default YouTubeVideoPlayer;
