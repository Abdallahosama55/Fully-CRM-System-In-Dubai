import { Button, Col, Row, Tabs } from "antd";
import { BookingsAll, BuildingSVG, ExperiencesSVG, PlaneSVG, TransferSVG } from "assets/jsx-svg";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
import { UploadOutlined } from "@ant-design/icons";
import useOperationsExportToExcel from "services/travel/operations/Mutations/useOperationsExportToExcel";

function TabHeader({ bookingType, setBookingType, setPage, setPageSize, OperationsSearch }) {
  const OperationsExportToExcel = useOperationsExportToExcel();
  const exportToExcel = () => {
    OperationsExportToExcel.mutate(
      {
        ...OperationsSearch.variables.body,
        exportToExcel: true,
      },
      { ...OperationsSearch.variables.params },
    );
  };

  return (
    <Row align="start" justify="space-between" wrap="wrap" style={{ padding: "0 20px" }}>
      <Col>
        <div>
          <Tabs
            activeKey={bookingType}
            onChange={(key) => {
              setBookingType(key);
              setPage(1);
              setPageSize(10);
            }}
            items={[
              {
                key: BOOKINGS_TYPES.ALL,
                label: "All",
                icon: (
                  <BookingsAll fill={bookingType === BOOKINGS_TYPES.ALL ? "#FFF" : "#667085"} />
                ),
                children: <></>,
              },
              {
                key: BOOKINGS_TYPES.FLIGHT,
                label: "Flight",
                icon: (
                  <PlaneSVG fill={bookingType === BOOKINGS_TYPES.FLIGHT ? "#FFF" : "#667085"} />
                ),
                children: <></>,
              },
              {
                key: BOOKINGS_TYPES.ACCOMMODATION,
                label: "Hotel",
                icon: (
                  <BuildingSVG
                    fill={bookingType === BOOKINGS_TYPES.ACCOMMODATION ? "#FFF" : "#667085"}
                  />
                ),
                children: <></>,
              },

              {
                key: BOOKINGS_TYPES.EXPERIENCE,
                label: "Experience",
                icon: (
                  <ExperiencesSVG
                    fill={bookingType === BOOKINGS_TYPES.EXPERIENCE ? "#FFF" : "#667085"}
                  />
                ),
                children: <></>,
              },
              {
                key: BOOKINGS_TYPES.AIRPORT_HOTEL_TRANSFERS,
                label: "Transfer",
                icon: (
                  <TransferSVG
                    fill={
                      bookingType === BOOKINGS_TYPES.AIRPORT_HOTEL_TRANSFERS ? "#FFF" : "#667085"
                    }
                  />
                ),
                children: <></>,
              },
            ]}
          />
        </div>
      </Col>
      <Col span={24} md={4} lg={3}>
        <Button
          type="primary"
          className="w-100"
          icon={<UploadOutlined />}
          onClick={exportToExcel}
          loading={OperationsExportToExcel.isPending}>
          <span>Export</span>
        </Button>
      </Col>
    </Row>
  );
}

export default TabHeader;
