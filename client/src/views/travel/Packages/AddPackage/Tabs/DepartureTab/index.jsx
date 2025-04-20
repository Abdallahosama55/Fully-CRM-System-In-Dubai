import { Button, Calendar, Divider, message, Modal, Space, Table, Tooltip } from "antd";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import Section from "components/common/Section";
import dayjs from "dayjs";
import { useToggle } from "hooks/useToggle";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";
import useGetPackageDepartureDates from "services/travel/packages/departure/Queries/useGetPackageDepartureDates";
import useAddPackageDepartureDates from "services/travel/packages/departure/Mutations/useAddPackageDepartureDates";
import { ADD_PACKAGES_TABS_KEYS } from "../..";
const DepartureTab = ({ id: tripId , setActiveTab }) => {
  const [editIds, setEditIds] = useState([]);
  const [editIdsAfter, setEditIdsAfter] = useState([]);
  const packageDepartureDates = useGetPackageDepartureDates(tripId, { enabled: !!tripId });

  const [departureDates, setDepartureDates] = useState([]);

  useEffect(() => {
    if (packageDepartureDates?.data) {
      setDepartureDates(
        packageDepartureDates?.data?.map((el) => dayjs(el?.date).format("YYYY-MM-DD")),
      );
    }
  }, [packageDepartureDates?.data]);

  const [isNewPopUpOpen, toggleIsNewPopUpOpen] = useToggle();
  const [selectedDates, setSelectedDates] = useState([]);

  const isEventListnerAddRef = useRef(false);
  const [activeMonth, setActiveMonth] = useState(dayjs().month());
  const [activeYear, setActiveYear] = useState(dayjs().year());
  // mutations
  const addDepartureDates = useAddPackageDepartureDates(tripId, {
    onSuccess: () => {
      message.success("Departure dates updated successfully");
      setDepartureDates([...selectedDates.filter((el) => !editIds?.includes(el))]);
      toggleIsNewPopUpOpen(false);
      setSelectedDates([]);
      setEditIds([]);
      setEditIdsAfter([]);
    },
    onError: (error) => {
      message.error(error?.message);
    },
  });

  const groupConsecutiveDates = useCallback((dates) => {
    // Step 1: Convert to dayjs objects and sort
    if (Array.isArray(dates) && dates.length === 0) {
      return [];
    }

    const sortedDates = dates.map((date) => dayjs(date, "YYYY-MM-DD")).sort((a, b) => a - b);

    const result = [];
    let sequenceStart = sortedDates[0];
    let sequenceEnd = sortedDates[0];
    let currentRange = [sequenceStart]; // Store the full range of consecutive dates

    // Step 2: Iterate over the sorted dates to find sequences
    for (let i = 1; i < sortedDates.length; i++) {
      if (sortedDates[i].diff(sequenceEnd, "days") === 1) {
        // Dates are consecutive, update the sequence end
        sequenceEnd = sortedDates[i];
        currentRange.push(sequenceEnd); // Add to the current sequence
      } else {
        // Not consecutive, push the sequence and start a new one
        if (currentRange.length === 1) {
          result.push(currentRange[0]?.format("YYYY-MM-DD")); // Single date, not a range
        } else {
          result.push(currentRange.map((date) => date?.format("YYYY-MM-DD"))); // Full range of dates
        }
        // Reset the range for the next sequence
        sequenceStart = sortedDates[i];
        sequenceEnd = sortedDates[i];
        currentRange = [sequenceStart]; // Start new range
      }
    }

    // Step 3: Handle the last sequence
    if (currentRange.length === 1) {
      result.push(currentRange[0]?.format("YYYY-MM-DD"));
    } else {
      result.push(currentRange.map((date) => date?.format("YYYY-MM-DD"))); // Full range of dates
    }

    return result;
  }, []);

  // TO SELECT ALL THE DAY IN THIS MONTH USING DAY NAME IN HEADER
  const selectAllWeekdays = useCallback(
    (weekdayIndex) => {
      const allDates = [];
      const daysInMonth = dayjs(`${activeYear}-${activeMonth + 1}`, "YYYY-MM").daysInMonth();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = dayjs(
          `${activeYear}-${activeMonth + 1}-${day < 10 ? `0${day}` : day}`,
          "YYYY-MM-DD",
        );
        if (date.day() === weekdayIndex && date.isAfter(dayjs())) {
          allDates.push(date?.format("YYYY-MM-DD"));
        }
      }

      setSelectedDates((prev) => {
        const allAdded = allDates.every((date) => prev.includes(date));

        if (allAdded) {
          return [...prev.filter((el) => !allDates.includes(el))];
        }

        return [...new Set([...prev, ...allDates])];
      });
    },
    [activeMonth, activeYear, selectedDates, setSelectedDates],
  );

  useEffect(() => {
    if (!isEventListnerAddRef?.current && isNewPopUpOpen) {
      const days = document.querySelectorAll(".ant-picker-content thead tr th");
      days.forEach((dayTitle, index) => {
        dayTitle.addEventListener("click", () => selectAllWeekdays(index));
      });
      isEventListnerAddRef.current = true;
    }

    return () => {
      const days = document.querySelectorAll(".ant-picker-content thead tr th");
      days.forEach((dayTitle, index) => {
        dayTitle.removeEventListener("click", () => selectAllWeekdays(index));
      });
    };
  }, [isNewPopUpOpen, selectAllWeekdays]);

  const handelSelect = (value) => {
    const formatedDate = value?.format("YYYY-MM-DD");
    if (editIds?.includes(formatedDate)) {
      setEditIds((prev) => prev.filter((el) => el !== formatedDate));
    } else {
      if (editIds.length > 0) {
        setEditIdsAfter((prev) => [...new Set([...prev, formatedDate])]);
      }

      setSelectedDates((prev) =>
        prev.includes(formatedDate)
          ? prev.filter((el) => el !== value?.format("YYYY-MM-DD"))
          : [...new Set([...prev, value?.format("YYYY-MM-DD")])],
      );
    }
  };

  const handelOk = () => {
    if (!selectedDates) {
      message.error("Select date");
      return;
    }

    addDepartureDates.mutate({
      datesArray: selectedDates?.map((el) => dayjs(el, "YYYY-MM-DD").format("YYYY-MM-DD")),
    });
  };

  const handelDeleteDates = (dates) => {
    if (Array.isArray(dates)) {
      addDepartureDates.mutate({
        datesArray: departureDates?.filter((el) => !dates?.includes(el)),
      });
      setDepartureDates((prev) => prev?.filter((el) => !dates?.includes(el)));
    } else {
      addDepartureDates.mutate({ datesArray: departureDates?.filter((el) => el !== dates) });
      setDepartureDates((prev) => prev?.filter((el) => el !== dates));
    }
  };

  return (
    <div className="package_departure_tab">
      <Modal
        className="departure_modal"
        open={isNewPopUpOpen}
        closable={false}
        onOk={handelOk}
        okButtonProps={{
          style: { width: "calc(50% - 4px)" },
          loading: addDepartureDates?.isPending,
        }}
        okText={"Save"}
        cancelButtonProps={{ style: { width: "calc(50% - 4px)" } }}
        onCancel={() => {
          setEditIds([]);
          setEditIdsAfter([]);
          toggleIsNewPopUpOpen();
        }}>
        <Calendar
          mode="month"
          fullscreen={false}
          onSelect={handelSelect}
          onPanelChange={(date) => {
            setActiveMonth(date.month());
            setActiveYear(date.year());
          }}
          disabledDate={(current) => current?.isBefore(dayjs())}
          fullCellRender={(date) => {
            const formattedDate = date?.format("YYYY-MM-DD");
            const isSelectedDate = selectedDates?.includes(formattedDate);
            const isEditDate = editIds?.includes(formattedDate);
            const isSelectedEditDate = editIdsAfter?.includes(formattedDate);

            return (
              <div style={{ padding: "0 5px", textAlign: "center" }}>
                <div
                  style={{
                    backgroundColor: isEditDate
                      ? "#4CAF50"
                      : isSelectedEditDate
                      ? "#FFC107"
                      : isSelectedDate
                      ? "#1945A2"
                      : undefined,
                    color: isSelectedEditDate || isSelectedDate || isEditDate ? "#fff" : "inherit",
                    borderRadius: "20px",
                    padding: "5px 0",
                  }}>
                  {date.date()}
                </div>
              </div>
            );
          }}
        />
        <Divider />
      </Modal>
      <Section
        title={"Departure"}
        headerEnd={
          <Space>
            <Button
              onClick={() => {
                setEditIds([]);
                setEditIdsAfter([]);
                setSelectedDates([...departureDates]);
                toggleIsNewPopUpOpen();
              }}>
              Add New
            </Button>
            <Button type="primary" onClick={() => setActiveTab(ADD_PACKAGES_TABS_KEYS?.PASSENGERS)}>
              Save & next
            </Button>
          </Space>
        }>
        <Table
          loading={packageDepartureDates?.isLoading}
          rowClassName={(record, index) => (index % 2 === 0 ? "" : "even-row")}
          dataSource={groupConsecutiveDates(departureDates)}
          pagination={groupConsecutiveDates(departureDates)?.length > 10 ? true : false}
          columns={[
            {
              title: (
                <p className="xs_text_medium" style={{ color: "var(--gray-500)" }}>
                  Departure
                </p>
              ),
              render: (date) => (
                <p className="xs_text_regular" style={{ color: "var(--gray-600)" }}>
                  {Array.isArray(date)
                    ? `${dayjs(date[0], "YYYY-MM-DD")?.format("DD MMM, YYYY")} - ${dayjs(
                        date[date?.length - 1],
                        "YYYY-MM-DD",
                      )?.format("DD MMM, YYYY")} `
                    : dayjs(date, "YYYY-MM-DD")?.format("DD MMM, YYYY")}
                </p>
              ),
              onCell: () => {
                return {
                  style: {
                    padding: "24px 0.75rem",
                  },
                };
              },
              onHeaderCell: () => {
                return {
                  style: {
                    padding: "1rem 12px",
                    background: "#fff",
                  },
                };
              },
            },
            {
              title: (
                <p className="xs_text_medium" style={{ color: "var(--gray-500)" }}>
                  Actions
                </p>
              ),
              width: "100px",
              onHeaderCell: () => {
                return {
                  style: {
                    padding: "1rem 12px",
                    background: "#fff",
                  },
                };
              },
              render: (date) => {
                return (
                  <Space>
                    <Tooltip title={"Edit"}>
                      <Button
                        icon={<EditSVG color={"#fff"} />}
                        className="table_action_button"
                        type="primary"
                        onClick={() => {
                          if (Array.isArray(date)) {
                            setEditIds(date);
                          } else {
                            setEditIds([date]);
                          }
                          setSelectedDates([...departureDates]);
                          toggleIsNewPopUpOpen();
                        }}
                      />
                    </Tooltip>
                    <Tooltip title={"Delete"}>
                      <Button
                        onClick={() => handelDeleteDates(date)}
                        className="table_action_button"
                        type="primary"
                        icon={<DeleteSVG color={"#fff"} />}
                        danger
                      />
                    </Tooltip>
                  </Space>
                );
              },
            },
          ]}
        />
      </Section>
    </div>
  );
};

export default DepartureTab;
