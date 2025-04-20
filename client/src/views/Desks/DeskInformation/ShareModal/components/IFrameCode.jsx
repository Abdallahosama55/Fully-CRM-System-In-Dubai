import { Typography } from "antd";
import "../styles.css";
import { useContextPageSettings } from "../ProviderPageSettings";

const IFrameCode = ({ getIframeText }) => {
  const { providerSettings } = useContextPageSettings();

  return (
    <div>
      <Typography className="fz-14 fw-500">Embed Code</Typography>
      <Typography className="description fz-14 fw-400">
        Place this code in your HTML where you want your scheduling link to appear. When a visitor
        clicks the link, your Vindo widget will load as a popup
      </Typography>
      <div className="iframe">
        <p className="paragraph">
          {getIframeText(
            Object.entries(providerSettings)
              .filter(([_, value]) => value != undefined)
              .map(([key, value]) => `${key}=${value}`)
              .join("&"),
          )}
        </p>
      </div>
    </div>
  );
};

export default IFrameCode;
