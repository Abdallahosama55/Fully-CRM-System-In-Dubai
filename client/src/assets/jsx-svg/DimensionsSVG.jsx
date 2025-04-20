const DimensionsSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={19} viewBox="0 0 17 19.054" {...props}>
    <defs>
      <linearGradient
        id="DimensionsSVG"
        x1={0.931}
        y1={0.118}
        x2={0.067}
        y2={0.867}
        gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor="#3A5EE3" />
        <stop offset="1" stopColor="#8FCAF3" />
      </linearGradient>
    </defs>
    <path
      data-name="Union 27"
      d="M9.618 18.936a.849.849 0 0 1-.43-.746v-7.824a.858.858 0 0 1 .452-.759L15.725 6.3A.865.865 0 0 1 17 7.06v7.668a.87.87 0 0 1-.435.753l-6.085 3.458a.85.85 0 0 1-.427.115.87.87 0 0 1-.435-.118Zm-3.1.006L.435 15.481A.87.87 0 0 1 0 14.728V7.06a.866.866 0 0 1 1.277-.76L7.36 9.607a.86.86 0 0 1 .454.759v7.824a.852.852 0 0 1-.432.746.83.83 0 0 1-.431.118.864.864 0 0 1-.429-.112ZM7.992 8.531 1.454 5.07a.867.867 0 0 1 0-1.53L8 .1a.853.853 0 0 1 .8 0l6.63 3.437a.866.866 0 0 1 0 1.536L8.8 8.534a.858.858 0 0 1-.4.1.885.885 0 0 1-.408-.103Z"
      fill={props.color || "url(#DimensionsSVG)"}
    />
  </svg>
);
export default DimensionsSVG;
