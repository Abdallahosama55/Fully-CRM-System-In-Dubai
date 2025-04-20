import React from "react";
import DayColumn from "./DayColumn";
import { Skeleton } from "antd";
import PreTrip from "./PreTrip";
import PostTrip from "./PostTrip";
import useListEngagementMessages from "services/travel/packages/engagement/queries/useListEngagementMessages";
import "./styles.css";

const EngagementsSection = ({ days, isLoading, tripId }) => {
  const engagementMessages = useListEngagementMessages(tripId, { enabled: !!tripId });
  if (isLoading || engagementMessages?.isLoading) {
    return <Skeleton active />;
  }

  return (
    <div className="days-section">
      <div>
        <div className="days-container">
          <PreTrip
            tripId={tripId}
            messages={engagementMessages?.data?.PRE_TRIP || []}
            onAdd={engagementMessages.refetch}
          />
          {days.map((day, index) => (
            <div key={day.id} className="day-item">
              <DayColumn
                onAdd={engagementMessages.refetch}
                day={day}
                index={index}
                tripId={tripId}
                messages={
                  engagementMessages?.data?.DAY_MESSAGE?.find((el) => el?.itineraryId === day?.id)
                    ?.messages || []
                }
              />
            </div>
          ))}
          <PostTrip
            tripId={tripId}
            messages={engagementMessages?.data?.POST_TRIP || []}
            onAdd={engagementMessages.refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default EngagementsSection;
