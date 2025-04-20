import "./style.css";
import Header from "./Header";
import { Button, Modal, Row, Table } from "antd";
import { useState } from "react";
import { renderColumns } from "../renderColumns";
import Box from "components/Box";
import useGetAllAirlineCompanies from "services/travel/Settings/Queries/useGetAllAirlineCompanies";
import EditableRow from "./EditableRow";
import EditableCell from "./EditableCell";
import DeleteFlightAction from "./DeleteFlightAction";
import useEditFlights from "services/travel/charters/Mutations/useEditFlights";
import { queryClient } from "services/queryClient";
import { QUERY_KEY } from "services/constants";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import useDeleteFlightGroup from "services/travel/charters/Mutations/useDeleteFlightGroup";

const EditCharterDrawer = ({ groupId, list, close }) => {
  const [modal, contextHolder] = Modal.useModal();
  const [open, setOpen] = useState(false);

  const { deleteFlightGroup, isPending: isPendingDelete } = useDeleteFlightGroup({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FLIGHT_SOURCES] });
      close();
    },
  });
  const { editFlights, isPending } = useEditFlights({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FLIGHT_SOURCES] });
      close();
    },
  });
  const { data } = useGetAllAirlineCompanies(
    { size: 400 },
    {
      refetchOnMount: false,
    },
  );
  const [dataSource, setDataSource] = useState(list || []);
  const handleSave = (row) => {
    const newData = [...dataSource];

    const index = newData.findIndex((item) => item.outboundFlight.id === row.outboundFlight.id);
    const item = newData[index];

    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const columns = renderColumns(true).map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        inputType: col.inputType,
        title: col.title,

        handleSave,
      }),
    };
  });

  const handleDelete = (id) => {
    setDataSource(dataSource.filter((item) => item.outboundFlight.id !== id));
  };
  const handleSubmit = async () => {
    await editFlights({
      groupId,
      data: dataSource.map((item) => ({
        alotment: item.outboundFlight?.allotment ?? item?.outboundFlight?.alotment,
        fromDateTime: item.outboundFlight.fromDateTime,
        toDateTime: item.outboundFlight.toDateTime,
        coast: item.outboundFlight.coast,
        sellPrice: item.outboundFlight.sellPrice,
        flightNo: item.outboundFlight.flightNo,
        currencyCode: item.outboundFlight.currencyCode,
        id: item.outboundFlight.id,
        fromAirportId: item.outboundFlight.fromAirportId,
        toAirportId: item.outboundFlight.toAirportId,
        supplierAccountId: 6020,
        airlineCompanyId: item.outboundFlight.airlineCompanyId,
      })),
    });
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    deleteFlightGroup(groupId);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleDeleteGroup = () => {
    showModal();
  };
  return (
    <section className="edit-charter-drawer">
      <Header />
      <Button
        loading={isPendingDelete}
        onClick={handleDeleteGroup}
        color="danger"
        danger
        type="primary">
        Delete Group
      </Button>
      <Box
        sx={{
          marginTop: "24px",

          ".ant-table .ant-table-body": {
            maxHeight: "100%",
            minHeight: "100%",
          },
        }}>
        <Table
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
          style={{ maxHeight: "100%", minHeight: "100%" }}
          scroll={{ y: 400 }}
          rowClassName={() => "editable-row"}
          bordered
          pagination={{ pageSize: 50, position: ["none", "bottomCenter"] }}
          dataSource={dataSource}
          columns={[
            ...columns,
            {
              width: 80,
              title: "",
              dataIndex: "action",
              align: "center",
              key: "action",
              render: (id, rowData) => {
                return (
                  <Row align="middle" gutter={[16, 0]} wrap={false}>
                    <DeleteFlightAction
                      handleDelete={handleDelete}
                      id={rowData.outboundFlight.id}
                    />
                  </Row>
                );
              },
            },
          ]}
        />
      </Box>
      <div
        style={{
          position: "sticky",
          paddingInline: "90PX",
          bottom: 0,
          marginTop: "100px",
          zIndex: 11212,
        }}>
        <Button
          loading={isPending}
          //   disabled={!form.isFieldsValidating()}
          onClick={handleSubmit}
          type="primary"
          style={{ width: "100%" }}>
          Save
        </Button>
      </div>
      <Modal
        open={open}
        title={<>Delete group Confirmation</>}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          loading: isPendingDelete,
        }}
        okText="Yes"
        cancelText="No"
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}>
        Are you sure you want to delete this group?
      </Modal>
    </section>
  );
};

export default EditCharterDrawer;
