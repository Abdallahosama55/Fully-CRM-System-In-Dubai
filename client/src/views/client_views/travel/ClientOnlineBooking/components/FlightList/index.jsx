import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, Empty, Flex, List, Tooltip, Typography } from "antd";
import { FlightSVG } from "assets/jsx-svg";
import Box from "components/Box";
import dayjs from "dayjs";
import AddFlightBooking from "../../AddFlightBooking";

import "./styles.css";
import { useDrawer } from "hooks/useDrawer";

const FlightList = ({ data }) => {
  const DrawerAPI = useDrawer();
  const handleSelectClick = (data) => {
    DrawerAPI.open("800px");
    DrawerAPI.setDrawerContent(<AddFlightBooking data={data} DrawerAPI={DrawerAPI}/>);
  };

  return (
    <List
      className="travel-online-booking-flight-list"
      dataSource={data}
      pagination={
        data && data.length > 0
          ? {
              onChange: (page) => {
                console.log(page);
              },

              pageSize: 5,
            }
          : false
      }
      locale={{
        emptyText: (
          <Empty
            style={{ margin: "4rem 0" }}
            description={
              <span>
                No Flights Available <br /> Please check back later.
              </span>
            }
          />
        ),
      }}
      renderItem={(item) =>
        item.type === "TWO_WAY" ? (
          <Box
            sx={{
              padding: "16px 24px",
              border: "1px solid #E5E5EA",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 32,
            }}>
            <Flex gap={32}>
              <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 16 }}>
                {[{ ...item.outboundFlight }, { ...item.returnFlight, type: "back" }].map(
                  (data) => {
                    return (
                      <RenderItem key={data?.id} item={{ type: item.type, outboundFlight: data }} />
                    );
                  },
                )}
              </Box>

              <>
                <div
                  style={{
                    border: "1px dashed #CBCBCB",

                    width: "1px",
                    display: "flex",
                  }}></div>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexDirection: "column",
                    placeContent: "center",
                  }}>
                  <Typography.Text>
                    {item.outboundFlight.currencyCode}{" "}
                    {item.outboundFlight.sellPrice?.adult ??
                      0 + (item.returnFlight.sellPrice?.adult ?? 0)}
                  </Typography.Text>
                  <Typography.Text className="fz-12 fw-400" style={{ color: "#D50000" }}>
                    {Math.min(
                      item.outboundFlight.alotment - item.outboundFlight.soldAlotment,
                      item.returnFlight.alotment - item.returnFlight.soldAlotment,
                    )}{" "}
                    Seats Left
                  </Typography.Text>
                  <Button onClick={() => handleSelectClick(item)} type="primary">
                    Select
                  </Button>
                </Box>
              </>
            </Flex>
          </Box>
        ) : (
          <Box
            sx={{
              padding: "16px 24px",
              border: "1px solid #E5E5EA",
              borderRadius: "16px",
            }}>
            <RenderItem handleSelectClick={() => handleSelectClick(item)} item={item} />
          </Box>
        )
      }
    />
  );
};

const RenderItem = ({ item, handleSelectClick }) => {
  return (
    <Flex gap={32}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
          width: "120px",
        }}>
        <Avatar />
        <Tooltip title={item.outboundFlight.airlineCompany.name}>
          <Typography.Text ellipsis className="fz-12" style={{ color: "#697281" }}>
            {item.outboundFlight.airlineCompany.name}
          </Typography.Text>
        </Tooltip>
      </Box>
      <FlightDetail
        type={item.outboundFlight.type}
        departure={{
          fromTime: dayjs(item.outboundFlight.fromDateTime).utc().format("HH:mm"),
          fromAirPortName: item.outboundFlight.fromAirPortInfo?.name,
          flightNo: item.outboundFlight.flightNo,
          flightDate: dayjs(item.outboundFlight.fromDateTime).utc().format("YYYY/MM/DD"),
        }}
        arrival={{
          toTime: dayjs(item.outboundFlight.toDateTime).utc().format("HH:mm"),
          toAirPortName: item.outboundFlight.toAirPortInfo?.name,
          flightNo: item.outboundFlight.flightNo,
          flightDate: dayjs(item.outboundFlight.fromDateTime).utc().format("YYYY/MM/DD"),
        }}
        diffTime={dayjs(
          dayjs(item.outboundFlight.toDateTime)
            .utc()
            .diff(dayjs(item.outboundFlight.fromDateTime).utc()),
        )
          .utc()
          .format("HH:mm")}
      />
      {item.type !== "TWO_WAY" && (
        <>
          <div
            style={{
              border: "1px dashed #CBCBCB",

              width: "1px",
              display: "flex",
            }}></div>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexDirection: "column",
              placeContent: "center",
            }}>
            <Typography.Text>
              {item.outboundFlight.currencyCode} {item.outboundFlight.sellPrice?.adult ?? 0}
            </Typography.Text>
            <Typography.Text className="fz-12 fw-400" style={{ color: "#D50000" }}>
              {item.outboundFlight.alotment - item.outboundFlight.soldAlotment} Seats Left
            </Typography.Text>
            <Button onClick={handleSelectClick} type="primary">
              Select
            </Button>
          </Box>
        </>
      )}
    </Flex>
  );
};
const FlightDetail = ({ departure, arrival, diffTime, type }) => {
  return (
    <Flex gap={0} style={{ width: "100%" }}>
      <Label
        time={departure.fromTime}
        name={departure.fromAirPortName}
        number={departure.flightNo}
      />
      <FlightChart
        isRevert={type === "back"}
        diffTime={diffTime}
        arrival={arrival}
        departure={departure}
      />
      <Box sx={{ marginLeft: "64px" }}>
        <Label number={arrival.flightNo} time={arrival.toTime} name={arrival.toAirPortName} />
      </Box>
    </Flex>
  );
};
const FlightChart = ({ diffTime, isRevert, departure }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        textAlign: "center",
      }}>
      <div className="fz-12 fw-400" style={{ color: "#697281" }}>
        <ClockCircleOutlined /> {diffTime} hr
      </div>
      <Box
        sx={{
          height: "22px",
          position: "relative",
        }}>
        <div
          style={{
            borderStyle: "dashed",
            border: "1px dashed #CBCBCB",
            position: "absolute",
            width: "100%",
            top: "11.5px",
          }}></div>
        <div
          style={{
            zIndex: 2,
            position: "relative",
            textAlign: "center",
            bottom: isRevert && "7px",
            transform: isRevert && "rotate(180deg)",
          }}>
          <FlightSVG />
        </div>
      </Box>
      <div className="fz-12 fw-400" style={{ color: "#697281" }}>
        {isRevert ? "Return" : "Outbound"}
        {" (" + departure.flightDate + ")"}
      </div>
    </Box>
  );
};
const Label = ({ time, name, number }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box className="fz-15 fw-700" style={{ color: "#313343" }}>
        {time}
      </Box>

      <Tooltip title={name}>
        <Typography.Text
          className="fz-14 fw-400"
          style={{ color: "#313343", width: "120px" }}
          ellipsis>
          {name}
        </Typography.Text>
      </Tooltip>

      <Box className="fz-14 fw-400">{number}</Box>
    </Box>
  );
};
export default FlightList;
