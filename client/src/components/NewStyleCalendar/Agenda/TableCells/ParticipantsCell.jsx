import { Tooltip } from "antd";

const maxDisplayed = 2; // Maximum number of participant names to display

const ParticipantsCell = ({ participantBookedMeetings }) => {
  if (!participantBookedMeetings || participantBookedMeetings.length === 0) {
    return "--";
  }

  const participants = participantBookedMeetings.map((participant) => {
    return participant.employee ? participant.employee.fullName : participant.account.fullName;
  });
  const displayedParticipants = participants.slice(0, maxDisplayed);
  const remainingParticipants = participants.slice(maxDisplayed);

  const remainingTooltipContent = (
    <div style={{ color: "#000" }}>{remainingParticipants.join(", ")}</div>
  );
  return (
    <>
      {displayedParticipants.join(", ")}
      {remainingParticipants.length > 0 && (
        <Tooltip title={remainingTooltipContent} color="#FFF">
          <span style={{ cursor: "pointer" }}>+{remainingParticipants.length} more</span>
        </Tooltip>
      )}
    </>
  );
};

export default ParticipantsCell;
