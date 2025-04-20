import React from "react";
import { Button, Divider, Flex, Form, Skeleton, Tabs, Tooltip, Typography } from "antd";
import { EarthSVG, ExclusionCheckSVG, IncludesCheckSVG } from "assets/jsx-svg";
import Badge from "components/common/Badge";
import Description from "components/common/Description";
import ImagesGrid from "components/common/ImagesGrid";
import LoadingPage from "components/common/LoadingPage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGetPackageDetails from "services/travel/booking/Package/Queries/useGetPackageDetails";
import { PACKAGE_ITEMS_TYPES } from "constants/PACKAGE_TYPES";
import {
  ExperiencesSVG,
  FlightSVG,
  HotelSVG,
  TransferSVG,
} from "assets/jsx-svg/PackagesItemsTypesIcons";
// style
import "./styles.css";
import DayItems from "./DayItems";
import dayjs from "dayjs";
import { useForm, useWatch } from "antd/es/form/Form";
import ROUTER_URLS from "constants/ROUTER_URLS";
import useGetFinalPrice from "services/travel/booking/Package/Queries/useGetFinalPrice";
import useCheckPackageAvailability from "services/travel/booking/Package/Queries/useCheckPackageAvailability";
import { useMemo } from "react";

const ViewPackage = ({ isInReviewMode = false }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = useForm();
  const packageDetails = useGetPackageDetails(id);
  const itemsServices = useWatch("items", form);
  const finalPrice = useGetFinalPrice(
    {
      tripId: id,
      children: state?.childs,
      adults: state?.adult,
      services:
        itemsServices &&
        Object.entries(itemsServices)?.map(([_, value]) => ({
          type: value?.type,
          id: value?.value,
        })),
    },
    { enabled: Boolean(id && state?.adult && itemsServices && !isInReviewMode) },
  );

  const packageAvailabilityQuery = useCheckPackageAvailability(
    {
      tripId: id,
      date: state?.date,
      children: state?.childs?.split("-")?.map((el) => Number(el)),
      adults: state?.adult,
      services:
        itemsServices &&
        Object.entries(itemsServices)?.map(([_, value]) => ({
          type: value?.type,
          id: value?.value,
        })),
    },
    { enabled: Boolean(id && state?.adult && itemsServices && !isInReviewMode) },
  );

  const tabItems = useMemo(
    () =>
      [
        {
          key: "itinerary",
          label: "Itinerary",
          children: (
            <div>
              <Tabs
                items={packageDetails?.data?.itinerary?.map((el) => ({
                  key: `day-${el?.dayNumber}`,
                  forceRender: true,
                  label: (
                    <div>
                      <p>
                        {el?.date
                          ? dayjs(el?.date)?.format("MMM DD, YYYY")
                          : "Day " + el?.dayNumber}
                      </p>
                      {Array.isArray(el?.destinations) && (
                        <Flex gap={4} align={"center"}>
                          <EarthSVG color={"currentColor"} width={12} height={12} />
                          <p
                            className="fz-12 fw-400"
                            style={{ color: "var(--font-secondary)" }}>
                            {el?.destinations[0]}
                          </p>
                        </Flex>
                      )}
                    </div>
                  ),
                  children: (
                    <DayItems items={el?.services} form={form} itemsServices={itemsServices} />
                  ),
                }))}
              />
            </div>
          ),
        },
        (packageDetails?.data?.tripData?.includesItems ||
          packageDetails?.data?.tripData?.notIncludesItems) && {
          key: "Inclusions",
          label: "Inclusions",
          children: (
            <section className="package_section_container">
              {packageDetails?.data?.tripData?.includesItems && (
                <div>
                  <p className="md_text_semibold">Inclusions</p>
                  {packageDetails?.data?.tripData?.includesItems?.map((el, index) => (
                    <Flex align="center" gap={8} key={index} style={{ marginTop: "0.75rem" }}>
                      <IncludesCheckSVG />
                      <p
                        className="xs_text_regular"
                        style={{ color: "var(--font-secondary)" }}>
                        {el}
                      </p>
                    </Flex>
                  ))}
                </div>
              )}
              {packageDetails?.data?.tripData?.notIncludesItems && (
                <div
                  style={
                    packageDetails?.data?.tripData?.includesItems ? { marginTop: "1rem" } : {}
                  }>
                  <p className="md_text_semibold">Exclusion</p>
                  {packageDetails?.data?.tripData?.notIncludesItems?.map((el, index) => (
                    <Flex align="center" gap={8} key={index} style={{ marginTop: "0.75rem" }}>
                      <ExclusionCheckSVG />
                      <p
                        className="xs_text_regular"
                        style={{ color: "var(--font-secondary)" }}>
                        {el}
                      </p>
                    </Flex>
                  ))}
                </div>
              )}
            </section>
          ),
        },
        packageDetails?.data?.tripData?.termsAndConditions && {
          key: "ADD_PACKAGES_TABS_KEYS.ENGAGEMENT",
          label: "Terms & Conditions",
          children: (
            <section className="package_section_container">
              <Description description={packageDetails?.data?.tripData?.termsAndConditions} />
            </section>
          ),
        },
      ].filter(Boolean),
    [packageDetails?.data, form, itemsServices],
  );

  if (packageDetails?.isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className={"view_package"}>
      <ImagesGrid images={packageDetails?.data?.tripData?.images} />
      <Flex style={{ margin: "24px 0" }} align="center" justify="space-between">
        <Typography.Title
          level={3}
          className="fz-32 fw-700"
          style={{
            color: "var(--vbooking-b700)",
            textTransform: "capitalize",
            margin: 0,
          }}>
          {packageDetails?.data?.tripData?.name}{" "}
          <span className="fz-30 fw-400" style={{ color: "var(--font-secondary)" }}>
            {state?.details?.reduce((acc, current) => acc + current?.night, 0)} Nights
          </span>
        </Typography.Title>
        {!isInReviewMode && (
          <Flex align="center" gap={"8px"}>
            <p className="fz-24 fw-700" style={{ color: "var(--vbooking-b700)" }}>
              {finalPrice?.isFetching ? (
                <Skeleton.Node style={{ height: "40px" }} />
              ) : (
                `$ ${finalPrice?.data}`
              )}
            </p>
            <Tooltip
              title={
                packageAvailabilityQuery?.data?.isAvailabile
                  ? ""
                  : `Not available in ${state?.date}`
              }>
              <Button
                type="primary"
                disabled={!packageAvailabilityQuery?.data?.isAvailabile}
                onClick={() => {
                  navigate(ROUTER_URLS.TRAVEL.PACKAGES.BOOK.replace(":id", id), {
                    state: {
                      items: itemsServices,
                      ...state,
                      packageInfo: {
                        images: packageDetails?.data?.tripData?.images,
                        destinations: packageDetails?.data?.tripData?.destinations,
                        description: packageDetails?.data?.tripData?.description,
                        mainServices: packageDetails?.data?.mainServices,
                        termsAndConditions: packageDetails?.data?.tripData?.termsAndConditions,
                      },
                    },
                  });
                }}>
                Book Now
              </Button>
            </Tooltip>
          </Flex>
        )}
      </Flex>
      <Flex gap={8}>
        <Typography.Paragraph
          className="fz-16 fw-400"
          style={{ color: "var(--gray-500)", marginBottom: "0rem" }}>
          Cities covered
        </Typography.Paragraph>
        <Flex align="center" gap={4}>
          {packageDetails?.data?.tripData?.destinations?.map((el) => (
            <Badge key={el} icon={<EarthSVG />} backGroundColor={"#EDF4FF"} color={"#3538CD"}>
              {el}
            </Badge>
          ))}
        </Flex>
      </Flex>
      <div style={{ maxWidth: "75%", margin: "0.5rem 0" }}>
        <Description description={packageDetails?.data?.tripData?.description} rows={3} />
      </div>
      <Flex align={"center"} gap={4}>
        {packageDetails?.data?.mainServices?.map((el) => {
          switch (el.type) {
            case PACKAGE_ITEMS_TYPES.ACCOMODATION:
              return (
                <Badge
                  icon={<HotelSVG />}
                  largeIcon={true}
                  key={el?.name}
                  color={"#CA2800"}
                  backGroundColor={"#FFF5ED"}>
                  {el.name}
                </Badge>
              );
            case PACKAGE_ITEMS_TYPES.TRANSFER:
              return (
                <Badge
                  icon={<TransferSVG />}
                  largeIcon={true}
                  key={el?.name}
                  color={"#027A48"}
                  backGroundColor={"#E8FEF2"}>
                  {el.name}
                </Badge>
              );
            case PACKAGE_ITEMS_TYPES.FLIGHT:
              return (
                <Badge
                  icon={<FlightSVG />}
                  largeIcon={true}
                  key={el?.name}
                  color={"#175CD3"}
                  backGroundColor={"#EDF8FF"}>
                  {el.name}
                </Badge>
              );
            case PACKAGE_ITEMS_TYPES.EXPERIENCE:
              return (
                <Badge
                  icon={<ExperiencesSVG />}
                  largeIcon={true}
                  key={el?.name}
                  color={"#5925DC"}
                  backGroundColor={"#F4F3FF"}>
                  {el.name}
                </Badge>
              );
            default:
              return (
                <Badge key={el.type} status="primary">
                  {el.name}
                </Badge>
              );
          }
        })}
      </Flex>
      <div style={{ margin: "1.5rem 0" }}>
        <Divider />
      </div>
      <Form form={form}>
        {tabItems?.length > 1 ? (
          <Tabs className="full_width_button" items={tabItems} />
        ) : (
          tabItems[0]?.children
        )}
      </Form>
    </div>
  );
};

export default ViewPackage;
