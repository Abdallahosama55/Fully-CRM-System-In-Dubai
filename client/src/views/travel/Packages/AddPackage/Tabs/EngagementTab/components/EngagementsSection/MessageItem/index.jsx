import React, { useState } from "react";
import BorderedCard from "../../BorderedCard";
import { Divider, Flex, Tooltip, Typography } from "antd";
import {
  ChevronDownSVG,
  ChevronUpSVG,
  Delete2SVG,
  EmailMessageFailedSVG,
  EmailMessageSentSVG,
  MoonSVG,
  SunSettingSVG,
  SunSVG,
  WhatsappMessageFailedSVG,
  WhatsappMessageSentSVG,
} from "assets/jsx-svg";
import { ENGAGEMENTS_PROVIDER, TEMPLATE_TYPES } from "constants/PACKAGE_ENGAGEMENTS_TYPES";
import Description from "components/common/Description";
import dayjs from "dayjs";
import useDeletePackageMessage from "services/travel/packages/engagement/mutations/useDeletePackageMessage";

const ScheduledTime = ({ scheduledTime }) => {
  const parsedTime = dayjs(scheduledTime, "HH:mm");
  const hour = parsedTime.hour();

  return (
    <Flex align="center" gap={4}>
      {hour >= 5 && hour < 12 ? (
        <SunSettingSVG />
      ) : hour >= 12 && hour < 17 ? (
        <SunSVG />
      ) : (
        <MoonSVG />
      )}
      <span className="xs_text_regular">{parsedTime?.format("hh:mm A")}</span>
    </Flex>
  );
};

const MessageItem = ({ message, handelDelete }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const deletePackageMessage = useDeletePackageMessage(message?.id, {
    onSuccess: () => {
      handelDelete();
    },
    onError: (error) => {
      message.error(error?.message || "something went wrong");
    },
  });
  return (
    <div>
      <BorderedCard
        style={{
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "10px",
          backgroundColor: (() => {
            switch (message?.type) {
              case TEMPLATE_TYPES?.WELCOMING:
                return "rgba(137, 170, 233, 0.2)"; // #89AAE9
              case TEMPLATE_TYPES?.ENGAGEMENT:
                return "rgba(144, 209, 222, 0.2)"; // #90D1DE
              case TEMPLATE_TYPES?.FEEDBACK:
                return "rgba(255, 209, 55, 0.2)"; // #FFD137
              case TEMPLATE_TYPES?.UPSELL:
                return "rgba(181, 198, 33, 0.2)"; // #B5C621
              case TEMPLATE_TYPES?.REMINDER:
                return "rgba(193, 175, 238, 0.2)"; // #C1AFEE
              case TEMPLATE_TYPES?.OTHER:
                return "rgba(209, 211, 214, 0.2)"; // #D1D3D6
              default:
                break;
            }
          })(),
        }}>
        <Flex align="center" justify="space-between">
          <Flex gap={8} align="center">
            <Flex align="center" gap={3}>
              {message?.provider?.map((el) => (
                <React.Fragment key={el}>
                  {el === ENGAGEMENTS_PROVIDER.EMAIL ? (
                    message?.status === "SENT" ? (
                      <Tooltip title={message?.status}>
                        <EmailMessageSentSVG />
                      </Tooltip>
                    ) : (
                      <Tooltip title={message?.status}>
                        <EmailMessageFailedSVG />
                      </Tooltip>
                    )
                  ) : el === ENGAGEMENTS_PROVIDER.WHATSAPP ? (
                    message?.status === "SENT" ? (
                      <Tooltip title={message?.status}>
                        <WhatsappMessageSentSVG />
                      </Tooltip>
                    ) : (
                      <Tooltip title={message?.status}>
                        <WhatsappMessageFailedSVG />
                      </Tooltip>
                    )
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              ))}
              <Typography.Paragraph
                style={{
                  marginBottom: 0,
                  marginInlineStart: "3px",
                  textTransform: "capitalize",
                  color: "var(--font-primary)",
                  userSelect: "none",
                  maxWidth: "110px",
                }}
                ellipsis={{ tooltip: message?.type }}
                className="xs_text_medium fw-500">
                {message?.type?.toLowerCase()}
              </Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex gap={0} align="center" style={{ paddingTop: "7px" }}>
            <Tooltip title={"Delete"}>
              <span
                style={{ marginInlineEnd: "4px" }}
                onClick={() => {
                  if(!deletePackageMessage?.isPending){
                    deletePackageMessage.mutate();
                  }
                }}>
                <Delete2SVG color="#667085" />
              </span>
            </Tooltip>
            <Tooltip title={isCollapsed ? "Show" : "Unshow"}>
              <span onClick={() => setIsCollapsed((prev) => !prev)}>
                {isCollapsed ? <ChevronDownSVG /> : <ChevronUpSVG />}
              </span>
            </Tooltip>
          </Flex>
        </Flex>
        {message?.scheduledTime && <ScheduledTime scheduledTime={message?.scheduledTime} />}
        {!isCollapsed && <Divider />}
        {!isCollapsed && <Description rows={2} description={message?.content} />}
      </BorderedCard>
    </div>
  );
};

export default MessageItem;
