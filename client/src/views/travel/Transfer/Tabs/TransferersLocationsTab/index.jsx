import { useState } from "react";
import { Button, Empty, Space, Tag, Tooltip, Typography } from "antd";
import { EditSVG } from "assets/jsx-svg";
import CustomTable from "components/CustomTable";
import { useDrawer } from "hooks/useDrawer";
import SearchForm from "./searchForm";
import AddTransfer from "../../components/AddTransfer";
import { useSearchAirportHotelTransfer } from "services/travel/dashboard";
import LoadingPage from "components/common/LoadingPage";
import empty_booking_screen from "assets/images/empty_booking_screen.png";

const TransferersLocationsTab = () => {
  const [page, setPage] = useState(1);

  const DrawerAPI = useDrawer();
  const SearchAirportHotelTransfer = useSearchAirportHotelTransfer();

  return (
    <section>
      {DrawerAPI.Render}
      <SearchForm
        DrawerAPI={DrawerAPI}
        SearchAirportHotelTransferMutation={SearchAirportHotelTransfer.mutate}
      />
      {SearchAirportHotelTransfer.isPending ? (
        <LoadingPage />
      ) : (
        <>
          {!SearchAirportHotelTransfer.data ||
          SearchAirportHotelTransfer?.data?.rows?.length === 0 ? (
            <div className="mt-1 mb-1 center-items" style={{ minHeight: "450px" }}>
              <Empty
                image={empty_booking_screen}
                description={
                  <p>No results found, Please fill the fields above to see result here.</p>
                }
              />
            </div>
          ) : (
            <CustomTable
              tableLayout="auto"
              loading={SearchAirportHotelTransfer.isPending}
              dataSource={
                SearchAirportHotelTransfer.isSuccess && SearchAirportHotelTransfer.data.rows
              }
              total={SearchAirportHotelTransfer.isSuccess && SearchAirportHotelTransfer.data.count}
              page={page}
              pageSize={10}
              setPage={setPage}
              style={{ padding: "0 20px" }}
              locale={{
                emptyText: (
                  <Empty
                    style={{ padding: "5rem 0" }}
                    description={
                      <div>
                        <p>No vehicles to display. </p>
                      </div>
                    }
                  />
                ),
              }}
              columns={[
                {
                  title: "Vehicle",
                  dataIndex: "vehicleBrand",
                  key: "vehicleBrand",
                  onCell: () => ({ style: { verticalAlign: "middle" } }),
                  render: (vehicleBrand) => {
                    return (
                      <Typography.Paragraph
                        style={{ marginBottom: "0px" }}
                        className="fz-14"
                        ellipsis={{ rows: 2, tooltip: vehicleBrand }}>
                        {vehicleBrand}
                      </Typography.Paragraph>
                    );
                  },
                },
                {
                  title: "From airport or hotel",
                  dataIndex: "pickupLocation",
                  key: "pickupLocation",
                  onCell: () => ({ style: { verticalAlign: "middle" } }),
                  render: (pickupLocation) => {
                    return (
                      <Typography.Paragraph
                        style={{ marginBottom: "0px" }}
                        className="fz-14"
                        ellipsis={{ rows: 2, tooltip: pickupLocation }}>
                        {pickupLocation.name}
                      </Typography.Paragraph>
                    );
                  },
                },
                {
                  title: "To airport or hotel",
                  dataIndex: "dropOffLocation",
                  key: "dropOffLocation",
                  onCell: () => ({ style: { verticalAlign: "middle" } }),
                  render: (Datato) => {
                    return (
                      <Typography.Paragraph
                        style={{ marginBottom: "0px" }}
                        className="fz-14"
                        ellipsis={{ rows: 2, tooltip: Datato }}>
                        {Datato.name}
                      </Typography.Paragraph>
                    );
                  },
                },
                {
                  title: "transfer Mode",
                  dataIndex: "transferMode",
                  key: "transferMode",
                  onCell: () => ({ style: { verticalAlign: "middle" } }),
                  render: (Mode) => {
                    return (
                      <Typography.Paragraph
                        style={{ marginBottom: "0px" }}
                        className="fz-14"
                        ellipsis={{ rows: 2, tooltip: Mode }}>
                        {Mode}
                      </Typography.Paragraph>
                    );
                  },
                },
                {
                  title: "Rate",
                  dataIndex: "transferPrice",
                  key: "transferPrice",
                  width: 200,
                  onCell: () => ({ style: { verticalAlign: "middle" } }),
                  render: (transferPrice, value) => {
                    return (
                      <>
                        {transferPrice.PRIVATE && (
                          <Tag style={{ marginBottom: "5px" }} color="volcano">
                            Private : {`${transferPrice.PRIVATE} ${value.currencyCode}`}
                          </Tag>
                        )}
                        {transferPrice.GROUP && (
                          <Tag color="blue">
                            Group : {`${transferPrice.GROUP} ${value.currencyCode}`}
                          </Tag>
                        )}
                      </>
                    );
                  },
                },
                {
                  width: 80,
                  title: "",
                  dataIndex: "id",
                  key: "id",
                  onCell: () => ({ style: { verticalAlign: "middle" } }),
                  render: (id, value) => {
                    return (
                      <Space wrap={false}>
                        <Tooltip title={"Edit"}>
                          <Button
                            type="primary"
                            icon={<EditSVG color="#fff" />}
                            className="table_action_button"
                            onClick={() => {
                              DrawerAPI.open("50%");
                              DrawerAPI.setDrawerContent(
                                <AddTransfer
                                  id={id}
                                  isEdite={true}
                                  DrawerAPI={DrawerAPI}
                                  SearchAirportHotelTransfer={SearchAirportHotelTransfer}
                                />,
                              );
                            }}
                          />
                        </Tooltip>
                        {/* <Tooltip title={"Delete"}>
                    <Button
                      type="primary"
                      className="table_action_button"
                      danger
                      icon={<DeleteSVG color="#fff" />}
                      onClick={() => handelDelete(id)}
                    />
                  </Tooltip> */}
                      </Space>
                    );
                  },
                },
              ]}
            />
          )}
        </>
      )}
    </section>
  );
};
export default TransferersLocationsTab;
