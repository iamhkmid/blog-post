import styles from "./CircleLoading.module.css";

type CircleLoadingProps = {
  width?: string;
  height?: string;
};

const CircleLoading: React.FC<CircleLoadingProps> = (props) => {
  return (
    <svg
      className={`rounded-full ${styles.circleAnimation}`}
      width={props.width}
      height={props.height}
      version="1.1"
      viewBox="0 0 100 100"
    >
      <defs>
        <linearGradient
          id="linearGradient1902"
          x1="49.728"
          x2="114.28"
          y1="-14.904"
          y2="-16.879"
          gradientTransform="matrix(.82112 0 0 .82112 -105.84 -34.919)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity=".1986" offset="0" />
          <stop stopColor="#fff" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient9005"
          x1="49.728"
          x2="114.28"
          y1="-14.904"
          y2="-16.879"
          gradientTransform="matrix(.92995 0 0 .92995 -113.24 -32.92)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0.5" offset="0" />
          <stop stopColor="#fff" offset=".8" />
        </linearGradient>
        <filter
          id="filter9131"
          x="-.11364"
          y="-.11364"
          width="1.2273"
          height="1.2273"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="1.1319517" />
        </filter>
      </defs>
      <g fill="none">
        <circle
          transform="matrix(-.88298 0 0 -.88298 5.8493 5.8512)"
          cx="-50.002"
          cy="-50"
          r="46.273"
          filter="url(#filter9131)"
          stroke="url(#linearGradient9005)"
          strokeWidth="8"
        />
        <circle
          transform="scale(-1)"
          cx="-50"
          cy="-50"
          r="40.858"
          stroke="url(#linearGradient1902)"
          strokeWidth="8"
        />
      </g>
    </svg>
  );
};

export default CircleLoading;

CircleLoading.defaultProps = {
  width: "22px",
  height: "22px",
};
