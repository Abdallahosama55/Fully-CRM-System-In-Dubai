export const statusClass = (status) => {
  let className = "";
  switch (status) {
    case "Active":
      className = "active";
      break;
    case "Draft":
      className = "draft";
      break;
    case "Pending":
      className = "pending";
      break;
    case "Confirmed":
      className = "confirmed";
      break;
    case "Picked Up":
      className = "picked-up";
      break;
    case "On The Way":
      className = "on-the-way";
      break;
    case "Delivered":
      className = "delivered";
      break;
    case "Cancel":
      className = "cancel";
      break;
    default:
      className = "active";
  }

  return className;
};
