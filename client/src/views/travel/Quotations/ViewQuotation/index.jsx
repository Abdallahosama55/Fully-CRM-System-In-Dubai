import usePageTitle from "hooks/usePageTitle";
import useSearchState from "hooks/useSearchState";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetQuotationById } from "services/travel/quotation/Queries/useGetQuotationById";
import { Button, Divider, Flex, message, Modal, Tooltip, Typography } from "antd";
import { BuildingSVG, ExperiencesSVG, PlaneSVG, TransferSVG } from "assets/jsx-svg";
// style
import "./styles.css";
import HotelCard from "./components/HotelCard";
import TransferCard from "./components/TransferCard";
import ExperienceCard from "./components/ExperienceCard";
import FlightCard from "./components/FlightCard";
import { LinkOutlined } from "@ant-design/icons";
import { useUserContext } from "context/userContext";
import OFFICER_TYPES from "constants/OFFICER_TYPES";
import CLIENT_ROUTER_URLS from "constants/CLIENT_ROUTER_URLS";
import PlusSVG from "assets/jsx-svg/PlusSVG";
import AddNewHotelModal from "./components/AddNewHotelModal";
import AddNewExperienceModal from "./components/AddNewExperienceModal";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";
import AddNewTransferModal from "./components/AddNewTransferModal";
import AddNewFlightModal from "./components/AddNewFlightModal";
import BookQuotationModal from "./components/BookQuotationModal";
import { useGetQuotationByIdB2C } from "services/travel/quotation/Queries/useGetQuotationByIdB2C";
import useApproveQuotationB2C from "services/travel/quotation/Mutations/useApproveQuotationB2C";
import LoadingPage from "components/common/LoadingPage";

const ViewQuotation = () => {
  usePageTitle("View Quotation");
  const { id } = useParams();

  const { user } = useUserContext();
  const isTravelAgent = useMemo(
    () => user?.officerType === OFFICER_TYPES.AGENT || user?.officerType === OFFICER_TYPES.DMC,
    [user],
  );

  const {
    data: quotation,
    refetch: updateQuotations,
    isLoading: isLoadingQuotation,
  } = useGetQuotationById(id, {
    enabled: isTravelAgent,
  });
  const {
    data: quotationClient,
    refetch: updateQuotationsClient,
    isLoading: isLoadingQuotationClient,
  } = useGetQuotationByIdB2C(id, {
    enabled: !isTravelAgent,
  });
  const approveQuotationB2C = useApproveQuotationB2C({
    enabled: !isTravelAgent,
    onSuccess: () => {
      message.success("Quotation approved successfully");
      updateQuotationsClient();
    },
  });
  const qutationItems = useMemo(
    () => quotation?.qutationItems || quotationClient?.qutationItems,
    [quotation, quotationClient],
  );

  const isApproved = useMemo(
    () => quotation?.status === "APPROVED" || quotationClient?.status === "APPROVED",
    [quotation, quotationClient],
  );

  const [activeTab, setActiveTab] = useSearchState("tab", QUOTATION_ITEM_TYPES.ACCOMMODATION);
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const groupedItems = useMemo(() => {
    const grouped = {
      [QUOTATION_ITEM_TYPES.ACCOMMODATION]: [],
      [QUOTATION_ITEM_TYPES.EXPERIENCE]: [],
      [QUOTATION_ITEM_TYPES.TRANSFER]: [],
      [QUOTATION_ITEM_TYPES.FLIGHT]: [],
    };

    qutationItems?.forEach((item) => {
      grouped[item.type]?.push(item);
    });

    return grouped;
  }, [qutationItems]);

  const sortedTypes = useMemo(() => {
    return Object.entries(groupedItems)
      .sort(([, itemsA], [, itemsB]) => (itemsB.length > 0 ? 1 : -1))
      .map(([type]) => type);
  }, [groupedItems]);

  if (isLoadingQuotation || isLoadingQuotationClient) {
    return <LoadingPage />;
  }

  return (
    <div className="view_quotation">
      {isTravelAgent && isApproved && (
        <BookQuotationModal
          quotation={quotation}
          isOpen={isBookModalOpen}
          qutationItems={quotation?.qutationItems || []}
          close={() => {
            setIsBookModalOpen(false);
          }}
        />
      )}
      <Modal
        closable={true}
        title={"Add New"}
        footer={null}
        open={isAddNewModalOpen}
        width={1000}
        onCancel={() => setIsAddNewModalOpen(false)}>
        {activeTab === QUOTATION_ITEM_TYPES.ACCOMMODATION && (
          <AddNewHotelModal
            onClose={() => {
              setIsAddNewModalOpen(false);
              updateQuotations();
            }}
          />
        )}
        {activeTab === QUOTATION_ITEM_TYPES.EXPERIENCE && (
          <AddNewExperienceModal
            onClose={() => {
              setIsAddNewModalOpen(false);
              updateQuotations();
            }}
          />
        )}
        {activeTab === QUOTATION_ITEM_TYPES.TRANSFER && (
          <AddNewTransferModal
            onClose={() => {
              setIsAddNewModalOpen(false);
              updateQuotations();
            }}
          />
        )}
        {activeTab === QUOTATION_ITEM_TYPES.FLIGHT && (
          <AddNewFlightModal
            onClose={() => {
              setIsAddNewModalOpen(false);
              updateQuotations();
            }}
          />
        )}
      </Modal>
      <div className="view_quotation_header">
        {activeTab === QUOTATION_ITEM_TYPES.ACCOMMODATION && (
          <>
            <p className="view_quotation_header_sub_title">Unforgettable accommodations await on</p>
          </>
        )}
        {activeTab === QUOTATION_ITEM_TYPES.FLIGHT && (
          <>
            <p className="view_quotation_header_sub_title">Incredible flights await on</p>
          </>
        )}
        {activeTab === QUOTATION_ITEM_TYPES.EXPERIENCE && (
          <>
            <p className="view_quotation_header_sub_title">Extraordinary experiences await on</p>
          </>
        )}
        {activeTab === QUOTATION_ITEM_TYPES.TRANSFER && (
          <>
            <p className="view_quotation_header_sub_title">Convenient transfers await on</p>
          </>
        )}
        <p className="view_quotation_header_title">{quotation?.name || quotationClient?.name}</p>
        <div style={{ maxWidth: "1000px", margin: "auto" }}>
          <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            className="tabs_and_price_container">
            <Typography.Title level={5}>
              Prepared For: {quotation?.guestFirstName + " " + quotationClient?.guestLastName}
            </Typography.Title>
            <Flex align="center" justify="center" className="full_width_on_small_screen" gap={8}>
              <p className="view_quotation_header_price fz-24 fw-700">
                ${quotation?.totalPrice || quotationClient?.totalPrice}
              </p>
              {isTravelAgent && (
                <Tooltip title={"Copy link"}>
                  <Button
                    size={"small"}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}${CLIENT_ROUTER_URLS.VIEW_QUOTATION.replace(
                          ":id",
                          id,
                        )}`,
                      );
                      message.success("Link copied to clipboard");
                    }}
                    style={{ width: "80px", height: "36px" }}
                    type="default"
                    icon={<LinkOutlined />}>
                    Copy
                  </Button>
                </Tooltip>
              )}
              {isTravelAgent && (
                <Tooltip
                  title={!isApproved ? "You need to get client approval before booking" : ""}>
                  <Button
                    size={"small"}
                    style={{ width: "80px", height: "36px" }}
                    type="primary"
                    disabled={!isApproved}
                    onClick={() => setIsBookModalOpen(true)}>
                    Book
                  </Button>
                </Tooltip>
              )}
              {!isTravelAgent && (
                <Button
                  size={"small"}
                  style={{ width: "80px", height: "36px" }}
                  type="primary"
                  loading={approveQuotationB2C?.isPending}
                  onClick={() => {
                    if (isApproved) {
                      message.info("This quotation is already approved");
                    } else {
                      approveQuotationB2C.mutate(id);
                    }
                  }}>
                  Approve
                </Button>
              )}
            </Flex>
          </Flex>
          <Divider />
        </div>
      </div>

      <div className="view_quotation_content">
        <div style={{ maxWidth: "1000px", margin: "1rem auto" }}>
          {sortedTypes.map((type, index) => (
            <React.Fragment key={type}>
              {!isTravelAgent && groupedItems[type]?.length === 0 ? (
                <></>
              ) : (
                <>
                  {index !== 0 && <Divider />}
                  <Flex align="center" justify="space-between" style={{ marginBottom: "0.5rem" }}>
                    <Flex align="center" gap={4} style={{ color: "#2d5feb" }}>
                      {type === QUOTATION_ITEM_TYPES.ACCOMMODATION && (
                        <BuildingSVG fill={"currentColor"} />
                      )}
                      {type === QUOTATION_ITEM_TYPES.EXPERIENCE && (
                        <ExperiencesSVG fill={"currentColor"} />
                      )}
                      {type === QUOTATION_ITEM_TYPES.TRANSFER && (
                        <TransferSVG fill={"currentColor"} />
                      )}
                      {type === QUOTATION_ITEM_TYPES.FLIGHT && <PlaneSVG fill={"currentColor"} />}
                      {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                    </Flex>
                    {isTravelAgent && !isApproved && (
                      <Button
                        icon={<PlusSVG fill={"currentColor"} />}
                        type={"primary"}
                        size="small"
                        onClick={() => {
                          setActiveTab(type);
                          setIsAddNewModalOpen(true);
                        }}>
                        New
                      </Button>
                    )}
                  </Flex>

                  {groupedItems[type].map((data, index) =>
                    type === QUOTATION_ITEM_TYPES.ACCOMMODATION ? (
                      <HotelCard
                        key={index}
                        data={data}
                        isDeletable={isTravelAgent && !isApproved}
                        onDeletItem={updateQuotations}
                      />
                    ) : type === QUOTATION_ITEM_TYPES.EXPERIENCE ? (
                      <ExperienceCard
                        key={index}
                        data={data}
                        isDeletable={isTravelAgent && !isApproved}
                        onDeletItem={updateQuotations}
                      />
                    ) : type === QUOTATION_ITEM_TYPES.TRANSFER ? (
                      <TransferCard
                        key={index}
                        data={data}
                        isDeletable={isTravelAgent && !isApproved}
                        onDeletItem={updateQuotations}
                      />
                    ) : (
                      <FlightCard
                        key={index}
                        data={data}
                        isDeletable={isTravelAgent && !isApproved}
                        onDeletItem={updateQuotations}
                      />
                    ),
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewQuotation;

// <Flex align="center" justify="space-between" style={{ marginBottom: "0.5rem" }}>
//   <Flex align="center" gap={4} style={{ color: "#2d5feb" }}>
//     <BuildingSVG fill={"currentColor"} />
//     Hotels
//   </Flex>
//   {isTravelAgent && !isApproved && (
//     <Button
//       icon={<PlusSVG fill={"currentColor"} />}
//       type={"primary"}
//       size="small"
//       onClick={() => {
//         setActiveTab(QUOTATION_ITEM_TYPES.ACCOMMODATION);
//         setIsAddNewModalOpen(true);
//       }}>
//       New
//     </Button>
//   )}
// </Flex>
// {qutationItems
//   ?.filter((el) => el?.type === QUOTATION_ITEM_TYPES.ACCOMMODATION)
//   ?.map((data, index) => (
//     <HotelCard
//       data={data}
//       key={index}
//       isDeletable={isTravelAgent && !isApproved}
//       onDeletItem={updateQuotations}
//     />
//   ))}

// {/* Experiences */}
// <Divider />
// <Flex align="center" justify="space-between" style={{ marginBottom: "0.5rem" }}>
//   <Flex align="center" gap={4} style={{ color: "#2d5feb" }}>
//     <ExperiencesSVG fill={"currentColor"} />
//     Experiences
//   </Flex>
//   {isTravelAgent && !isApproved && (
//     <Button
//       icon={<PlusSVG fill={"currentColor"} />}
//       type={"primary"}
//       size="small"
//       onClick={() => {
//         setActiveTab(QUOTATION_ITEM_TYPES.EXPERIENCE);
//         setIsAddNewModalOpen(true);
//       }}>
//       New
//     </Button>
//   )}
// </Flex>
// {qutationItems
//   ?.filter((el) => el?.type === QUOTATION_ITEM_TYPES.EXPERIENCE)
//   ?.map((data, index) => (
//     <ExperienceCard
//       data={data}
//       key={index}
//       isDeletable={isTravelAgent && !isApproved}
//       onDeletItem={updateQuotations}
//     />
//   ))}
// {/* TRANSFER */}
// <Divider />
// <Flex align="center" justify="space-between" style={{ marginBottom: "0.5rem" }}>
//   <Flex align="center" gap={4} style={{ color: "#2d5feb" }}>
//     <TransferSVG fill={"currentColor"} />
//     Transfers
//   </Flex>
//   {isTravelAgent && !isApproved && (
//     <Button
//       icon={<PlusSVG fill={"currentColor"} />}
//       type={"primary"}
//       size="small"
//       onClick={() => {
//         setActiveTab(QUOTATION_ITEM_TYPES.TRANSFER);
//         setIsAddNewModalOpen(true);
//       }}>
//       New
//     </Button>
//   )}
// </Flex>
// {qutationItems
//   ?.filter((el) => el?.type === QUOTATION_ITEM_TYPES.TRANSFER)
//   ?.map((data, index) => (
//     <TransferCard
//       data={data}
//       key={index}
//       isDeletable={isTravelAgent && !isApproved}
//       onDeletItem={updateQuotations}
//     />
//   ))}
// {/* FLIGHT */}
// <Divider />
// <Flex align="center" justify="space-between" style={{ marginBottom: "0.5rem" }}>
//   <Flex align="center" gap={4} style={{ color: "#2d5feb" }}>
//     <PlaneSVG fill={"currentColor"} />
//     Flights
//   </Flex>
//   {isTravelAgent && !isApproved && (
//     <Button
//       icon={<PlusSVG fill={"currentColor"} />}
//       type={"primary"}
//       size="small"
//       onClick={() => {
//         setActiveTab(QUOTATION_ITEM_TYPES.FLIGHT);
//         setIsAddNewModalOpen(true);
//       }}>
//       New
//     </Button>
//   )}
// </Flex>
// {qutationItems
//   ?.filter((el) => el?.type === QUOTATION_ITEM_TYPES.FLIGHT)
//   ?.map((data, index) => (
//     <FlightCard
//       data={data}
//       key={index}
//       isDeletable={isTravelAgent && !isApproved}
//       onDeletItem={updateQuotations}
//     />
//   ))}
