import React from "react";
import { useParams } from "react-router-dom";
import "./style.css";

const EventPagePreview = () => {
  const { id } = useParams();
  return (
    <div className="event-page-preview">
      <iframe src={`https://portal.ourverse.tf/ev/${id}`}></iframe>{" "}
    </div>
  );
};

export default EventPagePreview;
