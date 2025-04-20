import Logo from "components/common/Logo";
import "./styles.css";
export default function Header({}) {
  return (
    <div className="web-widget-root-header">
      <div className="vindo-logo">
        <Logo />
      </div>
      <div className="item">
        <div>
          <h3>Welcome to Vindo</h3>
          <p>Quia hic repellendus neque consequatur et non. </p>
        </div>
      </div>
    </div>
  );
}
