import React from 'react';

const ArrowRightColoredSVG = (props) => {
  const svgStyle = {
    fill: props.color || "#3A5EE3",
  };

  const pathStyle = {
    fill: "white",
  };

  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_482_62372)">
        <path
          d="M12 24.25C5.37258 24.25 0 18.8774 0 12.25C0 5.62258 5.37258 0.25 12 0.25C18.6274 0.25 24 5.62258 24 12.25C24 18.8774 18.6274 24.25 12 24.25Z"
          style={svgStyle}
        />
        <path
          d="M16.3087 13.1787C14.7849 14.71 13.2565 16.2372 11.7234 17.7603C9.72274 19.6512 6.87415 16.8776 8.71587 14.8484C9.58774 13.9737 10.4296 13.0883 11.3409 12.2501C10.4638 11.374 9.64258 10.5748 8.78805 9.70155C7.49055 8.49826 8.32915 6.18592 10.1029 6.11795C10.7371 6.06264 11.2884 6.27592 11.7398 6.72733C13.2623 8.24608 14.7829 9.7667 16.3016 11.2892C16.859 11.8494 16.8646 12.62 16.3087 13.1787Z"
          style={pathStyle}
        />
      </g>
      <defs>
        <clipPath id="clip0_482_62372">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="matrix(-1 0 0 1 24 0.25)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowRightColoredSVG;
