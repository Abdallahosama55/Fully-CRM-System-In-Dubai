import { Button, Divider, Flex, Modal, Tabs } from "antd";
import React, { useMemo, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ADD_ITEM_FROM_LIBRARY_MOVING_EVENT } from "../..";
// style
import "./styles.css";
import {
  ExperiencesSVG,
  FlightSVG,
  HotelSVG,
  TransferSVG,
} from "assets/jsx-svg/PackagesItemsTypesIcons";
import { PlusSVG } from "assets/jsx-svg";
import { useUserContext } from "context/userContext";
import OFFICER_TYPES from "constants/OFFICER_TYPES";
import TurboEngineExperiencesModal from "./components/TurboEngine/TurboEngineExperiencesModal";
import TurboEngineHotelsModal from "./components/TurboEngine/TurboEngineHotelsModal";
import TurboEngineTransfersModal from "./components/TurboEngine/TurboEngineTransfersModal";
import TurboEngineFlightsModal from "./components/TurboEngine/TurboEngineFlightsModal";
import MyInventoryExperiencesModal from "./components/MyInventory/MyInventoryExperiencesModal";
import MyInventoryHotelsModal from "./components/MyInventory/MyInventoryHotelsModal";
import MyInventoryTransfersModal from "./components/MyInventory/MyInventoryTransfersModal";
import MyInventoryFlightsModal from "./components/MyInventory/MyInventoryFlightsModal";
import StaticInventoryModal from "./components/StaticInventoryModal";
import useGetPackageLibraryItems from "services/travel/packages/itinerary/Queries/useGetPackageLibraryItems";
import LibraryItemCard from "./components/Cards/LibraryItemCard";
import { PACKAGE_ITEMS_TYPES } from "constants/PACKAGE_TYPES";
export const INVENTORY_TYPE_TABS_KEYS = {
  TURBO: "TURBO",
  MY_INVENTORY: "MY_INVENTORY",
  STATIC: "STATIC",
};

const LibrarySection = ({ tripId }) => {
  const { user } = useUserContext();
  const isAgent = useMemo(() => user?.officerType === OFFICER_TYPES.AGENT, [user.officerType]);
  const isSupplier = useMemo(
    () => user?.officerType === OFFICER_TYPES.SUPPLIER,
    [user.officerType],
  );
  const isDMC = useMemo(() => user?.officerType === OFFICER_TYPES.DMC, [user.officerType]);

  const [activeTab, setActiveTab] = useState(
    !isSupplier ? INVENTORY_TYPE_TABS_KEYS.TURBO : INVENTORY_TYPE_TABS_KEYS.MY_INVENTORY,
  );

  const [activeTabItemType, setActiveTabItemType] = useState(PACKAGE_ITEMS_TYPES.FLIGHT);
  const [isAddModalActive, setIsAddModalActive] = useState(false);
  const [addModalContent, setAddModalContent] = useState(false);
  // queries
  const libraryItemsQuery = useGetPackageLibraryItems({
    tripId,
    type: activeTabItemType,
    source: activeTab,
  });

  const handelAddItem = () => {
    const modalProps = {
      onUpdate: () => {
        libraryItemsQuery.refetch();
        setIsAddModalActive(false);
      },
      onCancel: () => setIsAddModalActive(false),
      tripId: tripId,
    };

    if (activeTab === INVENTORY_TYPE_TABS_KEYS.STATIC) {
      setAddModalContent(<StaticInventoryModal type={activeTabItemType} {...modalProps} />);
    } else {
      if (activeTab === INVENTORY_TYPE_TABS_KEYS.TURBO && (isAgent || isDMC)) {
        switch (activeTabItemType) {
          case PACKAGE_ITEMS_TYPES.ACCOMODATION:
            setAddModalContent(<TurboEngineHotelsModal {...modalProps} />);
            break;
          case PACKAGE_ITEMS_TYPES.EXPERIENCE:
            setAddModalContent(<TurboEngineExperiencesModal {...modalProps} />);
            break;
          case PACKAGE_ITEMS_TYPES.TRANSFER:
            setAddModalContent(<TurboEngineTransfersModal {...modalProps} />);
            break;
          case PACKAGE_ITEMS_TYPES.FLIGHT:
            setAddModalContent(<TurboEngineFlightsModal {...modalProps} />);
            break;
          default:
            setAddModalContent(<></>);
            break;
        }
      } else if (activeTab === INVENTORY_TYPE_TABS_KEYS.MY_INVENTORY && (isSupplier || isDMC)) {
        switch (activeTabItemType) {
          case PACKAGE_ITEMS_TYPES.ACCOMODATION:
            setAddModalContent(<MyInventoryHotelsModal {...modalProps} />);
            break;
          case PACKAGE_ITEMS_TYPES.EXPERIENCE:
            setAddModalContent(<MyInventoryExperiencesModal {...modalProps} />);
            break;
          case PACKAGE_ITEMS_TYPES.TRANSFER:
            setAddModalContent(<MyInventoryTransfersModal {...modalProps} />);
            break;
          case PACKAGE_ITEMS_TYPES.FLIGHT:
            setAddModalContent(<MyInventoryFlightsModal {...modalProps} />);
            break;
          default:
            setAddModalContent(<></>);
            break;
        }
      }
    }

    setIsAddModalActive(true);
  };

  return (
    <div className="library_section">
      <Modal
        className="library_section_modal"
        width={1100}
        centered
        open={isAddModalActive}
        footer={null}
        destroyOnClose={true}
        closable={false}>
        {addModalContent}
      </Modal>
      <Flex style={{ flexDirection: "column" }}>
        <div className="library_tabs">
          <Tabs
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
            items={[
              (isAgent || isDMC) && {
                key: INVENTORY_TYPE_TABS_KEYS.TURBO,
                label: "Turbo Engine",
              },
              (isSupplier || isDMC) && {
                key: INVENTORY_TYPE_TABS_KEYS.MY_INVENTORY,
                label: "My Inventory",
              },
              {
                key: INVENTORY_TYPE_TABS_KEYS.STATIC,
                label: "Create",
              },
            ].filter((el) => Boolean(el))}
          />
          <Tabs
            className="items_type_tabs"
            activeKey={activeTabItemType}
            onChange={(key) => setActiveTabItemType(key)}
            items={[
              {
                key: PACKAGE_ITEMS_TYPES.ACCOMODATION,
                label: "Hotel",
                icon: <HotelSVG />,
              },
              {
                key: PACKAGE_ITEMS_TYPES.FLIGHT,
                label: "Flight",
                icon: <FlightSVG />,
              },
              {
                key: PACKAGE_ITEMS_TYPES.TRANSFER,
                label: "Transfer",
                icon: <TransferSVG />,
              },
              {
                key: PACKAGE_ITEMS_TYPES.EXPERIENCE,
                label: "Experience",
                icon: <ExperiencesSVG />,
              },
            ]}
          />
        </div>
        <Divider />
        <div style={{ marginBottom: "5px" }}></div>
        <Droppable
          droppableId={ADD_ITEM_FROM_LIBRARY_MOVING_EVENT}
          type="item"
          isDropDisabled={true}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {libraryItemsQuery?.data?.groupedItems?.map((item, index) => (
                <LibraryItemCard key={index} index={index} {...item} type={activeTabItemType} />
              ))}
              {libraryItemsQuery?.data?.ungroupedItems?.map((item, index) => (
                <LibraryItemCard key={index} index={index} {...item} type={activeTabItemType} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button className="w-100" icon={<PlusSVG fill={"#006CE3"} />} onClick={handelAddItem}>
          <span style={{ color: "#006CE3" }}>Add item</span>
        </Button>
      </Flex>
    </div>
  );
};

export default LibrarySection;
