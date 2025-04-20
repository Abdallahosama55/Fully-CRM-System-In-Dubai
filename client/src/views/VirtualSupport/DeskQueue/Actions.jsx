import { Button } from "antd";
import { JoinSVG } from "assets/jsx-svg";
import Box from "components/Box";
import { Link, generatePath } from "react-router-dom";
const Actions = ({ meetingLinkParams, meetingId, meetingLink, meetingType }) => {
  const params = new URLSearchParams(meetingLinkParams);
  const isDirect = meetingLink.includes("/direct-call/");
  return (
    <div>
      {meetingType === "CUSTOM_LINK" ? (
        <a href={meetingLink} target="_blank" rel="noreferrer">
          <Button
            size="small"
            icon={
              <Box
                sx={{
                  position: "relative",
                  top: "2px",
                }}>
                <JoinSVG />
              </Box>
            }
            type="primary">
            Join
          </Button>
        </a>
      ) : (
        <Link to={isDirect ? `/direct-call/${meetingId}?${params}` : `${meetingId}?${params}`}>
          <Button
            size="small"
            icon={
              <Box
                sx={{
                  position: "relative",
                  top: "2px",
                }}>
                <JoinSVG />
              </Box>
            }
            type="primary">
            Join
          </Button>
        </Link>
      )}
    </div>
  );
};
export default Actions;
