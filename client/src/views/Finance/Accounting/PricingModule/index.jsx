import { Button, ConfigProvider, Empty, message, Modal, Space, Table, Tabs, Tooltip } from "antd";
import usePageTitle from "hooks/usePageTitle";
import React, { useEffect, useMemo, useState } from "react";
import EditPricing from "./components/EditPricing";
import NewBuyerGroup from "./components/NewBuyerGroup";
import SelectSuppliers from "./components/SelectSuppliers";
import { DeleteSVG, EditSVG, PluseSVG, PlusSVG } from "assets/jsx-svg";
import LoadingPage from "components/common/LoadingPage";
import { useForm } from "antd/es/form/Form";
import useAddBuyerGroup from "services/pricingModule/buyerGroup/Mutations/useAddBuyerGroup";
import useListBuyerGroub from "services/pricingModule/Queries/useListBuyerGroub";
// style
import "./styles.css";
import useListInventorySuppliers from "services/pricingModule/Queries/useListInventorySuppliers";
import useSetSupplierToBuyerGroub from "services/pricingModule/Mutations/useSetSupplierToBuyerGroub";
import useSetPrice from "services/pricingModule/Mutations/useSetPrice";
import useDeletePriceModel from "services/pricingModule/Mutations/useDeletePriceModel";
import formatNumber from "utils/formatNumber";
import useEditBuyerGroup from "services/pricingModule/buyerGroup/Mutations/useEditBuyerGroup";
import { useUserContext } from "context/userContext";
import OFFICER_TYPES from "constants/OFFICER_TYPES";
const suppliresTypes = [
  { label: "Hotels", value: "HOTELS" },
  { label: "Flights", value: "FLIGHTS" },
  { label: "Charter", value: "CHARTER" },
  { label: "Experiences", value: "EXPERIENCES" },
  { label: "Transfers", value: "TRANSFERS" },
  { label: "Airport hotel transfers", value: "AIRPORT_HOTEL_TRANSFERS" },
  { label: "Holiday Packages", value: "PACKAGES" },
];

const PricingModule = () => {
  usePageTitle("Pricing Module");
  // states
  const [isEditPricingModalOpen, setIsEditPricingModalOpen] = useState(false);
  const [isNewBuyerGroupModalOpen, setIsNewBuyerGroupModalOpen] = useState(false);
  const [editBuyerGroupId, setEditBuyerGroupId] = useState(null);
  const { user } = useUserContext();
  const isDMC = useMemo(() => user?.officerType === OFFICER_TYPES.DMC, [user.officerType]);

  const [isSelectSuppliersModalOpen, setIsSelectSuppliersModalOpen] = useState(false);
  const [selectdBuyerGroup, setSelectedBuyerGroup] = useState(undefined);
  const [selectdInventoryType, setSelectdInventoryType] = useState(undefined);
  const [selectdOfficeId, setSelectdOfficeId] = useState(undefined);
  const [selectdRowId, setSelectdRowId] = useState(undefined);

  // forms
  const [pricingModalForm] = useForm();
  const [buyerGroupForm] = useForm();
  const [selectSuppliersForm] = useForm();
  // queries
  const buyerGroupsList = useListBuyerGroub();
  const activeBuyerGroup = useListInventorySuppliers(selectdBuyerGroup, {
    enabled: !!selectdBuyerGroup,
  });

  useEffect(() => {
    if (!selectdBuyerGroup && buyerGroupsList?.data && buyerGroupsList?.data[0]?.id) {
      setSelectedBuyerGroup(buyerGroupsList?.data[0]?.id);
    }
  }, [buyerGroupsList.data]);

  // mutations
  const setPriceMutation = useSetPrice({
    onSuccess: () => {
      message.success("Price updated successfully");
      setIsEditPricingModalOpen(false);
      activeBuyerGroup.refetch();
      pricingModalForm.resetFields();
    },
    onError: (error) => {
      message.error("Failed to updated price");
      console.log(error);
    },
  });

  const addBuyerGroupMutation = useAddBuyerGroup({
    onSuccess: () => {
      message.success("Buyer Group added successfully");
      setIsNewBuyerGroupModalOpen(false);
      buyerGroupsList.refetch();
      buyerGroupForm.resetFields();
    },
    onError: (error) => {
      message.error("Failed to add buyer group");
      console.log(error);
    },
  });

  const editBuyerGroupMutation = useEditBuyerGroup({
    onSuccess: () => {
      message.success("Buyer Group updated successfully");
      setIsNewBuyerGroupModalOpen(false);
      setEditBuyerGroupId(null);
      buyerGroupsList.refetch();
      buyerGroupForm.resetFields();
    },
    onError: (error) => {
      message.error("Failed to update buyer group");
      console.log(error);
    },
  });

  const setSupplierToBuyerGroubMutation = useSetSupplierToBuyerGroub({
    onSuccess: () => {
      message.success("Suppliers updated successfully");
      setIsSelectSuppliersModalOpen(false);
      activeBuyerGroup.refetch();
      selectSuppliersForm.resetFields();
    },
    onError: (error) => {
      message.error("Failed to updat suppliers");
      console.log(error);
    },
  });

  const deletePriceModelMutation = useDeletePriceModel({
    onSuccess: () => {
      message.success("Pricing module deleted successfully");
      activeBuyerGroup.refetch();
    },
    onError: (error) => {
      message.error("Failed to delete pricing module");
      console.log(error);
    },
  });

  // handlers
  const handelEditPrice = () => {
    pricingModalForm.validateFields().then((values) => {
      setPriceMutation.mutate(values);
    });
  };

  const handelAddNewBuyerGroup = () => {
    buyerGroupForm.validateFields().then((values) => {
      if (editBuyerGroupId) {
        editBuyerGroupMutation.mutate({ ...values, id: editBuyerGroupId });
      } else {
        addBuyerGroupMutation.mutate(values);
      }
    });
  };

  const handelSelectSuppliers = () => {
    selectSuppliersForm.validateFields().then((values) => {
      setSupplierToBuyerGroubMutation.mutate(values);
    });
  };

  if (buyerGroupsList.isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="pricing_module_page">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBorderRadius: 0,
              headerBg: "rgb(234,236,242)",
            },
          },
        }}>
        {isEditPricingModalOpen && (
          <Modal
            className="pricing_modal"
            title={<p className="fz-14 fw-600">Edit pricing for selected supplier type</p>}
            open={isEditPricingModalOpen}
            onOk={handelEditPrice}
            onCancel={() => setIsEditPricingModalOpen(false)}
            okButtonProps={{ style: { width: "calc(50% - 4px)", background: "#424DF0" } }}
            okText={"Done"}
            cancelButtonProps={{ style: { width: "calc(50% - 4px)" } }}
            cancelText={"Discard"}>
            <EditPricing
              form={pricingModalForm}
              isLoading={setPriceMutation.isPending}
              buyerGroupId={selectdBuyerGroup}
              officeId={selectdOfficeId}
              id={selectdRowId}
              inventoryType={selectdInventoryType}
              currency={activeBuyerGroup?.data?.currency}
            />
          </Modal>
        )}
        {isNewBuyerGroupModalOpen && (
          <Modal
            className="pricing_modal"
            width={700}
            title={editBuyerGroupId ? "Edit Buyer Group" : "New Buyer Group"}
            open={isNewBuyerGroupModalOpen}
            onOk={handelAddNewBuyerGroup}
            onCancel={() => {
              setIsNewBuyerGroupModalOpen(false);
              setEditBuyerGroupId(null);
              buyerGroupForm.resetFields();
            }}
            okButtonProps={{ style: { width: "calc(50% - 4px)", background: "#424DF0" } }}
            okText={"Save"}
            cancelButtonProps={{ style: { width: "calc(50% - 4px)" } }}
            cancelText={"Discard"}>
            <NewBuyerGroup
              id={editBuyerGroupId}
              form={buyerGroupForm}
              isLoading={addBuyerGroupMutation.isPending}
            />
          </Modal>
        )}
        {isSelectSuppliersModalOpen && (
          <Modal
            className="pricing_modal"
            title={`Select ${selectdInventoryType && selectdInventoryType.toLowerCase()} Suppliers`}
            open={isSelectSuppliersModalOpen}
            onOk={handelSelectSuppliers}
            onCancel={() => setIsSelectSuppliersModalOpen(false)}
            okButtonProps={{ style: { width: "calc(50% - 4px)", background: "#424DF0" } }}
            okText={"Done"}
            cancelButtonProps={{ style: { width: "calc(50% - 4px)" } }}
            cancelText={"Discard"}>
            <SelectSuppliers
              inventoryType={selectdInventoryType}
              form={selectSuppliersForm}
              buyerGroupId={selectdBuyerGroup}
              isLoading={setSupplierToBuyerGroubMutation.isPending}
            />
          </Modal>
        )}
        <Tabs
          tabBarExtraContent={
            isDMC ? (
              <Button
                type={"text"}
                icon={<PluseSVG />}
                size={"small"}
                onClick={() => setIsNewBuyerGroupModalOpen(true)}>
                New Buyer Group
              </Button>
            ) : (
              <></>
            )
          }
          items={buyerGroupsList?.data?.map((el) => ({
            icon:
              el.id === selectdBuyerGroup && isDMC ? (
                <Tooltip title={"Edit buyer group"}>
                  <Button
                    type="primary"
                    icon={<EditSVG color="#fff" />}
                    className={"table_action_button"}
                    onClick={() => {
                      setEditBuyerGroupId(el.id);
                      setIsNewBuyerGroupModalOpen(true);
                    }}
                  />
                </Tooltip>
              ) : (
                <></>
              ),
            label: el.name,
            key: el.id,
            children: (
              <div>
                {suppliresTypes.map((type) => (
                  <Table
                    loading={activeBuyerGroup.isLoading}
                    locale={{
                      emptyText: (
                        <Empty
                          description={
                            <div>
                              <p>There are no suppliers available under this category</p>
                              {isDMC && (
                                <p>
                                  To begin selecting suppliers, please{" "}
                                  <span
                                    onClick={() => {
                                      setSelectdInventoryType(type?.value);
                                      setIsSelectSuppliersModalOpen(true);
                                    }}
                                    style={{
                                      color: "#6172F3",
                                      cursor: "pointer",
                                    }}>
                                    click here
                                  </span>
                                </p>
                              )}
                            </div>
                          }
                        />
                      ),
                    }}
                    pagination={false}
                    dataSource={activeBuyerGroup.data && activeBuyerGroup.data[type?.value]}
                    key={type?.value}
                    columns={[
                      {
                        width: "50%",
                        title: () => (
                          <div className="space-between">
                            <p>{type.label}</p>
                            {isDMC && (
                              <Button
                                size="small"
                                type="default"
                                style={{ color: "#6172F3", border: "1px solid #6172F3" }}
                                onClick={() => {
                                  setSelectdInventoryType(type?.value);
                                  setIsSelectSuppliersModalOpen(true);
                                }}>
                                Select supplier
                              </Button>
                            )}
                          </div>
                        ),
                        dataIndex: "officer",
                        render: (officer, rowData) => (
                          <p>
                            {officer?.fullName ||
                              rowData?.Supplier?.fullName ||
                              rowData?.company?.name}
                          </p>
                        ),
                      },
                      {
                        width: "50%",
                        title: "Price",
                        dataIndex: "officeId",
                        render: (officeId, rowData) => (
                          <div className="space-between">
                            {rowData && (
                              <p>
                                {rowData?.amount && rowData?.percent ? (
                                  <span className="fw-600">
                                    The rules was applied as follows:
                                    <br />
                                  </span>
                                ) : (
                                  "No price set yet"
                                )}
                                {rowData?.amount &&
                                  `A fee of ${formatNumber(rowData?.amount ?? 0)} ${
                                    rowData?.buyerGroup?.currencyCode || "USD"
                                  } (fixed amount)`}
                                <br />
                                {rowData?.percent &&
                                  `A fee of ${rowData?.percent ?? 0}% of the ${type?.value
                                    ?.substring(0, type?.value?.length - 1)
                                    ?.toLowerCase()} price.`}
                              </p>
                            )}
                            <Space>
                              <Tooltip
                                title={
                                  rowData?.amount || rowData?.percent
                                    ? "Edit pricing"
                                    : "Add pricing"
                                }>
                                <Button
                                  className="table_action_button"
                                  type="primary"
                                  onClick={() => {
                                    setSelectdOfficeId(officeId);
                                    setSelectdRowId(isDMC ? rowData.id : rowData.Supplier?.id);
                                    setSelectdInventoryType(type?.value);
                                    setIsEditPricingModalOpen(true);
                                  }}
                                  icon={
                                    rowData?.amount || rowData?.percent ? (
                                      <EditSVG color={"#fff"} />
                                    ) : (
                                      <PlusSVG color={"#fff"} />
                                    )
                                  }
                                />
                              </Tooltip>
                              {isDMC && (
                                <Tooltip title="Delete supplier">
                                  <Button
                                    type="primary"
                                    danger
                                    className="table_action_button"
                                    disabled={deletePriceModelMutation?.isPending}
                                    icon={<DeleteSVG color={"#fff"} />}
                                    onClick={() => {
                                      Modal.confirm({
                                        title: "Do you want to delete this supplier?",
                                        centered: true,
                                        okText: "Delete",
                                        okType: "danger",
                                        okButtonProps: {
                                          type: "primary",
                                        },
                                        cancelText: "Cancel",
                                        onOk() {
                                          return deletePriceModelMutation.mutateAsync(rowData.id);
                                        },
                                      });
                                    }}
                                  />
                                </Tooltip>
                              )}
                            </Space>
                          </div>
                        ),
                      },
                    ]}
                  />
                ))}
              </div>
            ),
          }))}
          activeKey={selectdBuyerGroup}
          onChange={(value) => {
            setSelectedBuyerGroup(value);
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default PricingModule;
