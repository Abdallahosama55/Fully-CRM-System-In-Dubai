import { CloseSVG } from "assets/jsx-svg";
import "./styles.css";
import { Link } from "react-router-dom";
import Logo from "components/common/Logo";

export default function Header({}) {
  return (
    <div className="service-section-header">
      <div></div>
      <div className="item">
        <div>
          <div className="vindo-logo">
            <Logo />
          </div>
        </div>
        <div>
          <h3>Welcome to Vindo</h3>
          {/* <p>Quia hic repellendus neque consequatur et non. </p> */}
        </div>
      </div>
      <Link to={".."} unstable_viewTransition className="close-btn">
        <CloseSVG width={14} height={14} color="white"></CloseSVG>
      </Link>
    </div>
  );
}
