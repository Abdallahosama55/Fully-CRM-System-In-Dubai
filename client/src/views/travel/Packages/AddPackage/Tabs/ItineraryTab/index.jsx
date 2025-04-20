import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

// style
import "./styles.css";
import Section from "components/common/Section";
import { Button, Col, Flex, message, Row, Typography } from "antd";
import { LnpSVG } from "assets/jsx-svg";
import DaysSection from "./components/DaysSection";
import LibrarySection from "./components/LibrarySection";
import useGetItineraryDays from "services/travel/packages/itinerary/Queries/useGetItineraryDays";
import useAddItemToItinerary from "services/travel/packages/itinerary/Mutations/useAddItemToItinerary";
import WhatsappSVG from "assets/jsx-svg/WhatsappSVG";
export const ADD_ITEM_FROM_LIBRARY_MOVING_EVENT = "ADD_ITEM_FROM_LIBRARY_MOVING_EVENT";

const ItineraryTab = ({ id: tripId }) => {
  const [days, setDays] = useState([]);
  const daysQuery = useGetItineraryDays(tripId);
  const destinations = useMemo(
    () =>
      days
        ? Object.values(
            days.reduce((acc, day) => {
              const destination = day?.destinations[0]; // Assuming one destination per day

              if (!acc[destination]) {
                acc[destination] = { name: destination, daysCount: 0 };
              }

              acc[destination].daysCount++;
              return acc;
            }, {}),
          )
        : [],
    [days],
  );
  useEffect(() => {
    if (daysQuery?.data) {
      setDays(
        daysQuery?.data?.result
          ?.sort((a, b) => a?.dayNumber - b?.dayNumber)
          .map((day) => {
            return {
              ...day,
              items: day?.items?.map((item) => {
                return {
                  ...item,
                };
              }),
            };
          }),
      );
    }
  }, [daysQuery?.data]);

  const containerRef = useRef();
  const [height, setHeight] = useState("auto");

  const updateHeight = useCallback(() => {
    if (containerRef.current) {
      const windowHeight = window.innerHeight;
      const topOffset = containerRef.current.getBoundingClientRect().top;
      setHeight(windowHeight - topOffset);
    }
  }, [containerRef]);

  useEffect(() => {
    if (containerRef.current) {
      updateHeight();
      window.addEventListener("resize", updateHeight);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const addItemToItineraryMutation = useAddItemToItinerary(tripId, {
    onSuccess: () => {
      daysQuery?.refetch();
    },
    onError: (error) => message?.error(error?.message || "something went wrong"),
  });

  const updateDays = (newDays) => {
    const temp = newDays || days;
    addItemToItineraryMutation?.mutate(
      temp?.map((el) => {
        return {
          itineraryId: el?.id,
          items: Array.isArray(el?.items)
            ? el?.items?.map((item, index) => {
                return { itemId: item?.id || item?.itemId, sort: index + 1 };
              })
            : [],
        };
      }),
    );
  };

  const handelAddItemFromLibrary = (
    sourceIndex,
    destinationIndex,
    destinationDroppableId,
    sourceItem,
  ) => {
    const targetDay = days?.find((el) => String(el?.id) === destinationDroppableId);
    if (!targetDay) return;
    if (
      Array.isArray(targetDay?.destinations) &&
      !targetDay?.destinations
        ?.map((el) => el?.toLowerCase())
        ?.includes(sourceItem?.destination?.toLowerCase())
    ) {
      message.warning("This item could be not in this day destinations");
    }

    const newDays = days?.map((day) => {
      if (String(day?.id) === destinationDroppableId) {
        const newItems = [...day.items]; // Create a shallow copy of the items array
        newItems.splice(destinationIndex, 0, {
          ...sourceItem,
        }); // Add the sourceItem at the specified index
        return {
          ...day,
          items: newItems, // Return a new day object with the updated items array
        };
      }
      return day;
    });

    updateDays(newDays);
    setDays([...newDays]);
  };

  const handelColumnOrderChange = (sourceIndex, destinationIndex) => {
    const updatedDays = [...days];
    updatedDays[sourceIndex] = days[destinationIndex];
    updatedDays[destinationIndex] = days[sourceIndex];
    setDays(updatedDays);
  };

  const handelDragInSameDay = ({ sourceColId, sourceIndex, destinationIndex }) => {
    const newDays = days?.map((day) => {
      if (String(day?.id) === sourceColId) {
        const updatedEvents = [...day.items];
        const [movedItem] = updatedEvents.splice(sourceIndex, 1);
        updatedEvents.splice(destinationIndex, 0, movedItem);
        return {
          ...day,
          items: updatedEvents,
        };
      }
      return day;
    });

    setDays(newDays);
    updateDays(newDays);
  };

  const handleDragEnd = (result) => {
    try {
      const { source, destination, type, draggableId } = result;

      if (!destination) return;

      if (type === "day") {
        handelColumnOrderChange(source?.index, destination?.index);
        return;
      }

      if (source?.droppableId === ADD_ITEM_FROM_LIBRARY_MOVING_EVENT) {
        // !NOTE: draggableId is a the item object
        handelAddItemFromLibrary(
          source?.index,
          destination?.index,
          destination?.droppableId,
          JSON.parse(draggableId),
        );
        return;
      }

      if (destination?.droppableId === ADD_ITEM_FROM_LIBRARY_MOVING_EVENT) {
        return;
      }

      const sourceColId = source?.droppableId;
      const destinationColId = destination?.droppableId;
      const sourceIndex = source?.index;
      const destinationIndex = destination?.index;
      const sourceDay = days?.find((day) => String(day?.id) === sourceColId);
      const movedItem = sourceDay?.items[sourceIndex];
      console.log("handelDragBetweanDays", { days, sourceColId, sourceIndex, destinationIndex });
      // to fix moving in the same column
      if (sourceColId === destinationColId) {
        if (sourceIndex === destinationIndex) {
          return;
        } else {
          handelDragInSameDay({ sourceColId, sourceIndex, destinationIndex });
          return;
        }
      }

      const newDays = days?.map((day) => {
        if (String(day?.id) === sourceColId) {
          // Remove the event from the source day
          return {
            ...day,
            items: day.items.filter((_, i) => i !== sourceIndex),
          };
        }

        if (String(day.id) === destinationColId) {
          // Add the event to the destination day
          const updatedEvents = [...day.items];
          updatedEvents.splice(destinationIndex, 0, movedItem);
          return {
            ...day,
            items: updatedEvents,
          };
        }

        return day;
      });

      setDays(newDays);
      updateDays(newDays);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="package_itinerary_tab" ref={containerRef} style={{ height }}>
        <Section
          title={"Days"}
          padding={"16px"}
          headerEnd={
            <Button icon={<LnpSVG fill={"#006CE3"} />} style={{ color: "#006CE3" }}>
              Generate with Ai
            </Button>
          }>
          <DaysSection
            isLoading={daysQuery?.isLoading}
            updateDays={updateDays}
            setDays={setDays}
            days={days}
            destinations={destinations}
            refetch={daysQuery?.refetch}
            tripId={tripId}
          />
        </Section>
        <div className="library_container">
          <Section noHeader={true} padding={"16px"} className="library_section">
            <LibrarySection tripId={tripId} destinations={destinations} />
          </Section>
          <Section noHeader={true} padding="8px 12px" className="price_section">
            <Row gutter={[12, 12]}>
              <Col span={8}>
                <div style={{ background: "#fff", padding: "8px", borderRadius: "6px" }}>
                  <Typography.Paragraph
                    ellipsis={{ tooltip: daysQuery?.data?.totalDynamicPrice }}
                    className="xl_text_semibold"
                    style={{ color: "var(--font-link)", marginBottom: "0" }}>
                    ${daysQuery?.data?.totalDynamicPrice}
                  </Typography.Paragraph>
                  <Typography.Paragraph
                    style={{ marginBottom: "0", color: "var(--font-secondary)" }}
                    ellipsis={{ tooltip: "System items" }}
                    className="xs_text_regular">
                    System items
                  </Typography.Paragraph>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ background: "#fff", padding: "8px", borderRadius: "6px" }}>
                  {" "}
                  <Typography.Paragraph
                    ellipsis={{ tooltip: daysQuery?.data?.totalStaticPrice }}
                    className="xl_text_semibold"
                    style={{ color: "var(--font-link)", marginBottom: "0" }}>
                    ${daysQuery?.data?.totalStaticPrice}
                  </Typography.Paragraph>
                  <Typography.Paragraph
                    style={{ marginBottom: "0", color: "var(--font-secondary)" }}
                    ellipsis
                    className="xs_text_regular">
                    Static items
                  </Typography.Paragraph>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ background: "#fff", padding: "8px", borderRadius: "6px" }}>
                  {" "}
                  <Flex gap={4} align="center">
                    <WhatsappSVG fill={"#006CE3"} />
                    <Typography.Paragraph
                      ellipsis={{ tooltip: daysQuery?.data?.messages }}
                      className="xl_text_semibold"
                      style={{
                        color: "var(--font-link)",
                        marginBottom: "0",
                      }}>
                      {daysQuery?.data?.messages}
                    </Typography.Paragraph>
                  </Flex>
                  <Typography.Paragraph
                    style={{ marginBottom: "0", color: "var(--font-secondary)" }}
                    ellipsis
                    className="xs_text_regular">
                    Messages
                  </Typography.Paragraph>
                </div>
              </Col>
            </Row>
          </Section>
        </div>
      </div>
    </DragDropContext>
  );
};

export default ItineraryTab;
