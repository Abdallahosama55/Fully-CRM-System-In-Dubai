import React, { useMemo, useState } from "react";
import { message } from "antd";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";
import { useParams } from "react-router-dom";
import useGetHotelRooms from "services/travel/booking/Accommodation/Queries/useGetHotelRooms";
import useAddToQuotation from "services/travel/quotation/Mutations/useAddToQuotation";
import TboRoomsSection from "./TboRoomsSection";
import SystemRoomsSection from "./SystemRoomsSection";
import TurboLoadingPage from "components/common/TurboLoadingPage";

const ViewRoomsSection = ({
  accommodationId,
  searchParams,
  onAddItemClicked,
  data,
  onBack = () => {},
}) => {
  const { id: qutationId } = useParams();
  const [loadingRoomId, setLoadingRoomId] = useState(undefined);
  // QUERIES
  const hotelRoomsQuery = useGetHotelRooms(
    searchParams ? { ...searchParams, accommodationId } : {},
  );

  const isTboHotel = useMemo(
    () => hotelRoomsQuery?.data?.source === "TBO",
    [hotelRoomsQuery?.data?.source],
  );

  const addToQuotation = useAddToQuotation({
    onSuccess: () => {
      message.success("Item added to trip");
      onAddItemClicked();
      setLoadingRoomId(undefined);
      onBack();
    },
    onError: (error) => {
      message?.error(error?.message || "something went wrong");
      setLoadingRoomId(undefined);
    },
  });

  const onAddClick = (room) => {
    addToQuotation.mutate({
      qutationId,
      item: {
        ...room,
        type: QUOTATION_ITEM_TYPES.ACCOMMODATION,
        adults: searchParams?.rooms?.reduce((acc, current) => acc + current?.adults, 0),
        childs: searchParams?.rooms?.reduce((acc, current) => acc + current?.childs, 0),
        id: accommodationId,
        name: data?.name ? `${data?.name}${room?.name ? ` / ${room?.name}` : ""}`
          : room?.name ?? "",
        arrivalDate: searchParams?.arrival,
        departureDate: searchParams?.arrival,
      },
    });
  };

  if (hotelRoomsQuery?.isLoading) {
    return <TurboLoadingPage height="400px" />;
  }

  if (isTboHotel) {
    return (
      <TboRoomsSection
        rooms={hotelRoomsQuery?.data?.roomsData}
        onAddToTrip={onAddClick}
        loadingRoomId={loadingRoomId}
        setLoadingRoomId={setLoadingRoomId}
      />
    );
  }

  return (
    <SystemRoomsSection
      isAddToTripLoading={addToQuotation?.isPending}
      roomsData={hotelRoomsQuery?.data?.roomsData}
      cancellationPolicy={hotelRoomsQuery?.data?.cancellationPolicy}
      onAddToTrip={onAddClick}
    />
  );
};

export default ViewRoomsSection;
