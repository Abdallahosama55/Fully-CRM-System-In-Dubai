import {
  Button,
  Col,
  Empty,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { ArrowDownSVG, DeleteSVG, EditSVG, PlusSVG, SearchSVG } from "assets/jsx-svg";
import useGetVehicleList from "services/travel/transfer/Queries/useGetVehicleList";
import { useEffect, useState } from "react";
import CustomTable from "components/CustomTable";
import AddVehicle from "../../components/AddVehicle";
import { useForm, useWatch } from "antd/es/form/Form";
import { useDebounce } from "hooks/useDebounce";
import useGetVehicleType from "services/travel/transfer/Queries/useGetVehicleType";
import useGetVehicleBrands from "services/travel/transfer/Queries/useGetVehicleBrands";
import SvgImage from "components/common/SvgImage";
import useDeleteVehicle from "services/travel/transfer/Mutations/useDeleteVehicle";
import { queryClient } from "services/queryClient";
import default_car_image from "assets/images/default_car_image.jpg";
import { useDrawer } from "hooks/useDrawer";

const VehicleTab = () => {
  const [page, setPage] = useState(1);
  const [form] = useForm();
  const DrawerAPI = useDrawer();
  const filters = useWatch("filters", form);
  const debouncedFilters = useDebounce(filters, 300);

  const vehicleTypes = useGetVehicleType();
  const vehicleBrands = useGetVehicleBrands();

  const vehiclesQuery = useGetVehicleList(
    {
      ...debouncedFilters,
      page,
      size: 10,
    },
    {
      onError: () => {
        message.error("Failed to fetch vehicles");
      },
    },
  );

  useEffect(() => {
    if (vehiclesQuery?.isError) {
      message.error(vehiclesQuery?.error?.message || "Failed to fetch vehicles");
    }
  }, [vehiclesQuery?.isError, vehiclesQuery?.error]);

  // mutations
  const deleteVehicle = useDeleteVehicle({
    onSuccess: (_, payload) => {
      queryClient.setQueryData(vehiclesQuery.key, (oldData) => {
        console.log({ oldData, payload });

        return {
          rows: oldData?.rows?.filter((item) => item.id !== payload),
          total: oldData.total - 1,
        };
      });
      message.success("Vehicle deleted successfully");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <section>
      {DrawerAPI.Render}
      <Form form={form} style={{ marginBottom: "1rem" }}>
        <Row align="middle" justify="space-between" gutter={[8, 8]}>
          <Col lg={9}>
            <Form.Item name={["filters", "country"]} noStyle>
              <Input placeholder="Search by country" prefix={<SearchSVG />} />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item name={["filters", "typeId"]} noStyle>
              <Select
                showSearch
                allowClear
                filterOption={(input, option) =>
                  option?.label?.toLowerCase()?.includes(input?.toLowerCase())
                }
                className="w-100"
                placeholder="Select type"
                suffixIcon={<ArrowDownSVG color={"#3F65E4"} />}
                disabled={vehicleTypes?.isLoading}
                optionRender={(item) => (
                  <div className="select_item_with_icon">
                    {item?.data?.icon ? <SvgImage svgContent={item?.data?.icon} /> : ""}{" "}
                    {item.label}
                  </div>
                )}
                options={vehicleTypes?.data?.map((el) => {
                  return {
                    label: el?.name,
                    value: el?.id,
                    icon: el?.image ? el?.image : undefined,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item name={["filters", "brandId"]} noStyle>
              <Select
                showSearch
                allowClear
                filterOption={(input, option) =>
                  option?.label?.toLowerCase()?.includes(input?.toLowerCase())
                }
                className="w-100"
                placeholder="Select brand"
                suffixIcon={<ArrowDownSVG color={"#3F65E4"} />}
                disabled={vehicleBrands?.isLoading}
                optionRender={(item) => (
                  <div className="select_item_with_icon">
                    {item?.data?.icon ? <SvgImage svgContent={item?.data?.icon} /> : ""}{" "}
                    {item.label}
                  </div>
                )}
                options={vehicleBrands?.data?.map((el) => {
                  return {
                    label: el?.name,
                    value: el?.id,
                    icon: el?.image ? el?.image : undefined,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col lg={3} className="d-flex" style={{ justifyContent: "flex-end" }}>
            <Button
              icon={<PlusSVG color="white" />}
              type="primary"
              onClick={() => {
                DrawerAPI.open("50%");
                DrawerAPI.setDrawerContent(
                  <AddVehicle onEnd={vehiclesQuery.refetch} DrawerAPI={DrawerAPI} />,
                );
              }}>
              New
            </Button>
          </Col>
        </Row>
      </Form>
      <CustomTable
        locale={{
          emptyText: (
            <Empty
              style={{ padding: "5rem 0" }}
              description={
                <div>
                  <p>No vehicles to display. </p>
                  <p>
                    <Typography.Link
                      onClick={() => {
                        DrawerAPI.open("50%");
                        DrawerAPI.setDrawerContent(<AddVehicle onEnd={vehiclesQuery.refetch} />);
                      }}>
                      Click here
                    </Typography.Link>{" "}
                    to add new vehicles.
                  </p>
                </div>
              }
            />
          ),
        }}
        page={page}
        setPage={setPage}
        pageSize={10}
        total={vehiclesQuery?.data?.total}
        loading={vehiclesQuery?.isLoading}
        dataSource={vehiclesQuery?.data?.rows}
        columns={[
          {
            title: "Image",
            width: 80,
            dataIndex: "image",
            key: "type",
            onCell: () => ({ style: { verticalAlign: "middle" } }),
            render: (image) => {
              return (
                <Image
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                  src={image || default_car_image}
                  alt="img"
                  onError={(e) => {
                    e.target.src = default_car_image;
                  }}
                />
              );
            },
          },
          {
            title: "Plate",
            dataIndex: "licensePlate",
            key: "licensePlate",
            onCell: () => ({ style: { verticalAlign: "middle" } }),
            render: (licensePlate) => (
              <Typography.Paragraph
                className="fz-12 fw-500"
                style={{ marginBottom: "4px" }}
                ellipsis={{ rows: 2, tooltip: licensePlate }}>
                {licensePlate ? licensePlate?.toUpperCase() : "-"}
              </Typography.Paragraph>
            ),
          },
          {
            title: "Type",
            dataIndex: "vehicleType",
            key: "vehicleType",
            onCell: () => ({ style: { verticalAlign: "middle" } }),
            render: (vehicleType) => {
              return (
                <Typography.Paragraph
                  style={{ marginBottom: "0px" }}
                  className="fz-14"
                  ellipsis={{ rows: 2, tooltip: vehicleType?.name }}>
                  {vehicleType?.name}
                </Typography.Paragraph>
              );
            },
          },
          {
            title: "Brand",
            dataIndex: "vehicleBrand",
            key: "vehicleBrand",
            onCell: () => ({ style: { verticalAlign: "middle" } }),
            render: (vehicleBrand) => {
              return (
                <Typography.Paragraph
                  style={{ marginBottom: "0px" }}
                  className="fz-14"
                  ellipsis={{ rows: 2, tooltip: vehicleBrand?.name }}>
                  {vehicleBrand?.name}
                </Typography.Paragraph>
              );
            },
          },
          {
            title: "Model",
            dataIndex: "vehicleModel",
            key: "vehicleModel",
            onCell: () => ({ style: { verticalAlign: "middle" } }),
            render: (vehicleModel) => {
              return (
                <Typography.Paragraph
                  style={{ marginBottom: "0px" }}
                  className="fz-14"
                  ellipsis={{ rows: 2, tooltip: vehicleModel?.name }}>
                  {vehicleModel?.name}
                </Typography.Paragraph>
              );
            },
          },
          {
            title: "Max Bags",
            dataIndex: "maxBags",
            key: "maxBags",
            width: 100,
            onCell: () => ({ style: { verticalAlign: "middle" } }),
            render: (maxBags) => {
              return (
                <Typography.Paragraph style={{ marginBottom: "0px" }} className="fz-14">
                  {maxBags}
                </Typography.Paragraph>
              );
            },
          },
          {
            title: "Pricing Details",
            dataIndex: "initialPrice",
            key: "initialPrice",
            width: 200,
            onCell: () => ({ style: { verticalAlign: "middle" } }),
            render: (initialPrice, rowData) => {
              return (
                <div style={{ minWidth: "200px" }}>
                  <Typography.Paragraph className="fz-12 fw-500" style={{ marginBottom: "4px" }}>
                    Initial Price: ${initialPrice || 0}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="fz-12 fw-500" style={{ marginBottom: "0px" }}>
                    Distance Price: ${rowData?.distanePricePerKilo}/km
                  </Typography.Paragraph>
                </div>
              );
            },
          },
          ,
          {
            width: 80,
            title: "",
            dataIndex: "id",
            key: "id",
            onCell: () => ({ style: { verticalAlign: "middle" } }),
            render: (id) => {
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
                          <AddVehicle
                            id={id}
                            onEnd={vehiclesQuery.refetch}
                            DrawerAPI={DrawerAPI}
                          />,
                        );
                      }}
                    />
                  </Tooltip>
                  <Tooltip title={"Delete"}>
                    <Button
                      type="primary"
                      className="table_action_button"
                      danger
                      icon={<DeleteSVG color="#fff" />}
                      onClick={() => deleteVehicle.mutate(id)}
                    />
                  </Tooltip>
                </Space>
              );
            },
          },
        ]}
      />
    </section>
  );
};
export default VehicleTab;
