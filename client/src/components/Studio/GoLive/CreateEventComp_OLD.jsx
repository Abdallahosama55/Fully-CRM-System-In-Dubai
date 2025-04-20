import { useEffect, useState } from "react";
import { Button, Col, Dropdown, Row, Space, Typography } from "antd";
import {
  ContactsOutlined,
  DownloadOutlined,
  ProfileOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

import AddEventDetailsComp from "./AddEvent";
import ImportParticipants from "./components/ImportParticipants";
import ImportParticipantsModal from "./components/ImportParticipantsModal";
import ImportParticipantsRoleSelectionModal from "./components/ImportParticipantsRoleSelectionModal";
import AddSpeakersComp from "./AddSpeakersComp";
import useGetEventById from "services/Events/Querys/useGetEventById";
import AddSubEventComp from "./AddSubEventCom";
import AccessLevelComp from "./AccessLevelComp";

import "./styles.css";

export default function CreateEventComp({
  eventId,
  DrawerAPI,
  initialActiveCreateEventTab = false,
}) {
  const [isImportingFromCustomers, setIsImportingFromCustomers] = useState(false);
  const [isImportParticipantsModalOpen, setIsImportParticipantsModalOpen] = useState(false);
  const [importParticipantsState, setImportParticipantsState] = useState({
    participants: [],
    skippedIndexes: [],
  });
  const [eventDetails, setEventDetails] = useState({});
  const [dimensionPlacese, setDimensionPlacese] = useState([]);
  const [activeCreateEventTab, setActiveCreateEventTab] = useState(
    initialActiveCreateEventTab || 1,
  );
  const [previewPicForm, setPreviewPicForm] = useState("");
  const [participantList, setParticipantList] = useState([]);
  const [speakersList, setSpeakersList] = useState([]);
  const [subEventsList, setSubEventsList] = useState([]);

  const { data: eventData, isLoading } = useGetEventById(eventId, {
    select: (data) => data.data.data,
    enabled: eventId !== undefined,
  });

  const handleImportFromExcel = () => {
    setIsImportParticipantsModalOpen(true);
  };

  const handleCancelSelection = () => {
    setIsImportingFromCustomers(false);
  };

  const handleImportSelected = (importedParticipants) => {
    setIsImportingFromCustomers(false);
    setIsImportParticipantsModalOpen(false);
    const participants =
      importedParticipants?.map(({ id, fullName, email }) => ({
        id,
        name: fullName,
        email,
      })) ?? [];
    setImportParticipantsState({ participants, skippedIndexes: [] });
  };

  const handleImportFromContacts = () => {
    setIsImportingFromCustomers(true);
  };

  const handleCancelImportParticipants = () => {
    setIsImportParticipantsModalOpen(false);
  };

  const handleParticipantsUploaded = ({ participants, skippedIndexes }) => {
    setIsImportParticipantsModalOpen(false);
    setImportParticipantsState({ participants, skippedIndexes });
  };

  const handleImportParticipants = ({ participants }) => {
    setImportParticipantsState({ participants: [], skippedIndexes: [] });

    if (activeCreateEventTab === 2) {
      setParticipantList((oldList) => {
        const emailsSet = new Set();
        const newList = [];
        oldList.forEach(({ id, email, name, role, source, isVIP }) => {
          if (!emailsSet.has(email)) {
            emailsSet.add(email);
            newList.push({ id: id ?? uuidv4(), email, name, role, source, isVIP });
          }
        });
        participants.forEach(({ name, email, isVIP }) => {
          if (!emailsSet.has(email)) {
            emailsSet.add(email);
            newList.push({ id: uuidv4(), email, name, isVIP, source: "FRONT" });
          }
        });

        return newList;
      });
    } else {
      setSpeakersList((oldList) => {
        const emailsSet = new Set();
        const newList = [];
        oldList.forEach((data) => {
          if (!emailsSet.has(data.email)) {
            emailsSet.add(data.email);
            newList.push(data);
          }
        });
        participants.forEach((data) => {
          if (!emailsSet.has(data.email)) {
            emailsSet.add(data.email);
            newList.push({ id: uuidv4(), ...data, source: "FRONT" });
          }
        });

        return newList;
      });
    }
  };

  const items = [
    {
      label: "From File (XLS, CSV)",
      key: "file",
      icon: <ProfileOutlined style={{ fontSize: "14px" }} />,
      onClick: handleImportFromExcel,
    },
    {
      label: "From Contacts",
      key: "contacts",
      icon: <ContactsOutlined style={{ fontSize: "14px" }} />,
      onClick: handleImportFromContacts,
    },
  ];

  const menuProps = {
    items,
  };

  useEffect(() => {
    if (eventData?.liveDimensionsParticipants) {
      setParticipantList(
        eventData.liveDimensionsParticipants.map((item) => ({
          ...item,
          source: "BACK",
        })),
      );
    }

    if (eventData?.liveDimensionsSpeakers) {
      setSpeakersList(
        eventData.liveDimensionsSpeakers.map((item) => ({
          ...item,
          source: "BACK",
        })),
      );
    }

    if (eventData?.subEvents) {
      setSubEventsList(
        eventData.subEvents.map((item) => ({
          ...item,
          source: "BACK",
        })),
      );
    }
  }, [eventData]);

  if (isImportingFromCustomers) {
    return (
      <ImportParticipants
        onImportSelected={handleImportSelected}
        onCancelSelection={handleCancelSelection}
      />
    );
  }
  if (isLoading)
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <LoadingOutlined />
      </div>
    );

  console.log("speakersList", speakersList);

  return (
    <>
      <Row
        style={{
          marginBlockEnd: "24px",
        }}>
        <Col flex={1}>
          <Typography.Text className="fw-600">
            {eventId ? `Update ${eventData.title} Event` : "Create New Event"}
          </Typography.Text>
        </Col>
        {(activeCreateEventTab === 2 || activeCreateEventTab === 3) && (
          <Col>
            <Dropdown menu={menuProps} placement="bottomRight" trigger={["click"]}>
              <Button style={{ fontSize: "12px" }}>
                <Space>
                  <DownloadOutlined />
                  Import
                </Space>
              </Button>
            </Dropdown>
            <ImportParticipantsModal
              isOpen={isImportParticipantsModalOpen}
              onCancel={handleCancelImportParticipants}
              onParticipantsUploaded={handleParticipantsUploaded}
              isAddParticipants={activeCreateEventTab === 2}
            />
            <ImportParticipantsRoleSelectionModal
              participants={importParticipantsState.participants}
              skippedIndexes={importParticipantsState.skippedIndexes}
              onImport={handleImportParticipants}
            />
          </Col>
        )}
      </Row>
      <div style={{ display: "flex", columnGap: 5 }}>
        {[
          {
            id: 1,
            label: "Event Details",
          },
          {
            id: 2,
            label: "Access Level",
          },
          {
            id: 3,
            label: "Add Speakers",
          },
          {
            id: 4,
            label: "Add Sub Event",
          },
        ].map((navItem) => {
          return (
            <div className="top-nav" key={navItem.key}>
              <div
                className={`nav-item ${navItem.id === activeCreateEventTab ? "active" : ""}`}
                style={{ width: "fit-content" }}>
                <div>{navItem.label}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: activeCreateEventTab === 1 ? "" : "none" }}>
        <AddEventDetailsComp
          eventData={eventData}
          DrawerAPI={DrawerAPI}
          setActiveCreateEventTab={setActiveCreateEventTab}
          setEventDetails={setEventDetails}
          setPreviewPicForm={setPreviewPicForm}
          previewPicForm={previewPicForm}
          dimensionPlacese={dimensionPlacese}
          setDimensionPlacese={setDimensionPlacese}
        />
      </div>
      <div style={{ display: activeCreateEventTab === 2 ? "" : "none" }}>
        <AccessLevelComp
          initialAccessLevel={eventData?.accessLevel}
          participantList={participantList}
          setParticipantList={setParticipantList}
          setActiveCreateEventTab={setActiveCreateEventTab}
          setEventDetails={setEventDetails}
        />
      </div>

      <div style={{ display: activeCreateEventTab === 3 ? "" : "none" }}>
        <AddSpeakersComp
          setActiveCreateEventTab={setActiveCreateEventTab}
          speakersList={speakersList}
          setSpeakersList={setSpeakersList}
        />
      </div>

      <div style={{ display: activeCreateEventTab === 4 ? "" : "none" }}>
        <AddSubEventComp
          eventId={eventData?.id}
          eventData={eventData}
          DrawerAPI={DrawerAPI}
          eventDetails={eventDetails}
          setActiveCreateEventTab={setActiveCreateEventTab}
          speakersList={speakersList}
          participantList={participantList}
          dimensionPlacese={dimensionPlacese}
          subEventsList={subEventsList}
          setSubEventsList={setSubEventsList}
          previewPicForm={previewPicForm}
        />
      </div>
    </>
  );
}
