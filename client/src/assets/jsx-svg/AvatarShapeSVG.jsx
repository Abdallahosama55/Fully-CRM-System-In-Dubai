const AvatarWithClipPath = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={131}
    height={142}
    viewBox="0 0 131 142"
    {...props}>
    <defs>
      <clipPath id="avatarClip">
        <path d="M46.952 10.336c10.748-8.943 26.348-8.943 37.097 0l6.5 5.409a35 35 0 0 0 10.279 5.934l7.934 2.926c13.12 4.836 20.92 18.346 18.549 32.126l-1.434 8.334a34.987 34.987 0 0 0 0 11.87l1.434 8.334c2.371 13.78-5.429 27.29-18.549 32.126l-7.934 2.926a34.986 34.986 0 0 0-10.279 5.934l-6.5 5.409c-10.75 8.943-26.349 8.943-37.098 0l-6.5-5.409a34.986 34.986 0 0 0-10.279-5.934l-7.934-2.926c-13.12-4.836-20.92-18.346-18.549-32.126l1.434-8.334a35 35 0 0 0 0-11.87l-1.434-8.334c-2.37-13.78 5.43-27.29 18.549-32.127l7.934-2.925a35 35 0 0 0 10.279-5.934l6.5-5.409Z" />
      </clipPath>

      <linearGradient
        id="avatarBorderGradient"
        x1={19.841}
        x2={89.16}
        y1={-116.954}
        y2={64.989}
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" offset="0%" />
        <stop stopColor="#D8D6E9" offset="21%" />
        <stop stopColor="#B5B1D5" offset="45%" />
        <stop stopColor="#9B96C7" offset="66%" />
        <stop stopColor="#8C85BF" offset="85%" />
        <stop stopColor="#8780BC" offset="100%" />
      </linearGradient>
    </defs>

    <path
      fill="none"
      stroke="url(#avatarBorderGradient)"
      strokeWidth={6}
      d="M46.952 10.336c10.748-8.943 26.348-8.943 37.097 0l6.5 5.409a35 35 0 0 0 10.279 5.934l7.934 2.926c13.12 4.836 20.92 18.346 18.549 32.126l-1.434 8.334a34.987 34.987 0 0 0 0 11.87l1.434 8.334c2.371 13.78-5.429 27.29-18.549 32.126l-7.934 2.926a34.986 34.986 0 0 0-10.279 5.934l-6.5 5.409c-10.75 8.943-26.349 8.943-37.098 0l-6.5-5.409a34.986 34.986 0 0 0-10.279-5.934l-7.934-2.926c-13.12-4.836-20.92-18.346-18.549-32.126l1.434-8.334a35 35 0 0 0 0-11.87l-1.434-8.334c-2.37-13.78 5.43-27.29 18.549-32.127l7.934-2.925a35 35 0 0 0 10.279-5.934l6.5-5.409Z"
    />

    <image
      href={props.image}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      clipPath="url(#avatarClip)"
    />
  </svg>
);

export default AvatarWithClipPath;
