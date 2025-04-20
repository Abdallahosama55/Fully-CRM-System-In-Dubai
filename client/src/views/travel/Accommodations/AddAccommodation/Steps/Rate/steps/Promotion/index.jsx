import { Button, Dropdown, message, Table, Typography } from "antd";
import CustomButton from "components/common/Button";
import { useDrawer } from "context/drawerContext";
import AddPromotion from "./components/AddPromotion";
import useGetPromotionList from "services/travel/accommodations/Rate/Promotion/Queries/useGetPromotionList";
import dayjs from "dayjs";
import { ArrowRightSVG, BackArrow, DeleteSVG, EditSVG, MenuDotsSVG, PlusSVG } from "assets/jsx-svg";
import useDeletePromotion from "services/travel/accommodations/Rate/Promotion/Mutations/useDeletePromotion";
import { STEPS_KEYS } from "..";

const Promotion = ({ id, moveTo }) => {
    const DrawerAPI = useDrawer();
    const promotionListQuery = useGetPromotionList(id);

    const deletePromotionMutation = useDeletePromotion({
        onSuccess: () => {
            message.success("Promotion deleted successfully");
            promotionListQuery.refetch();
        },
        onError: error => message.error(error.message)
    })

    return (
        <div className="content">
            <div className="move_header space-between mb-1">
                <div className="prev move_link" onClick={() => moveTo(STEPS_KEYS.RATE)}><BackArrow color="#000" /> Rate</div>
                <div className="next move_link" onClick={() => moveTo(STEPS_KEYS.CANCELLATION)}>cancelation <ArrowRightSVG color="#000" /></div>
            </div>
            <div className="space-between mt-1">
                <Typography.Title level={5}>Promotion</Typography.Title>
                <Button
                    type="primary"
                    icon={<PlusSVG />}
                    size="small"
                    onClick={() => {
                        DrawerAPI.open("45%");
                        DrawerAPI.setDrawerContent(
                            <AddPromotion
                                accommodationId={id}
                                onEnd={() => {
                                    promotionListQuery.refetch();
                                    DrawerAPI.close();
                                }}
                            />,
                        );
                    }}>
                    New
                </Button>
            </div>
            <div className="table_container">
                <Table
                    loading={promotionListQuery?.isLoading || deletePromotionMutation.isPending}
                    scroll={{ x: 700 }}
                    style={{ marginTop: "32px" }}
                    columns={[
                        {
                            title: 'Promotion Name',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: 'Date',
                            dataIndex: 'startDate',
                            key: 'startDate',
                            render: (_, rowData) => {
                                const { startDate, endDate } = rowData;
                                return dayjs(startDate).format("DD/MM/YYYY")
                                    + " - " + dayjs(endDate).format("DD/MM/YYYY")
                            }
                        },
                        {
                            title: 'Min. stay',
                            dataIndex: 'minStay',
                            key: 'minStay',
                        },
                        {
                            title: 'Action',
                            dataIndex: 'id',
                            key: 'id',
                            fixed: 'right',
                            width: "120px",
                            render: (editID) => {
                                return <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                onClick: () => {
                                                    DrawerAPI.open("45%");
                                                    DrawerAPI.setDrawerContent(<AddPromotion
                                                        onEnd={() => {
                                                            promotionListQuery.refetch();
                                                            DrawerAPI.close();
                                                        }}
                                                        accommodationId={id}
                                                        id={editID}
                                                    />);
                                                },
                                                label: <div className="d-flex" style={{ gap: "5px", alignItems: "center" }}>
                                                    <EditSVG />Edit
                                                </div>,
                                                key: "0",
                                            },
                                            {
                                                onClick: () => deletePromotionMutation.mutate(editID),
                                                label: <div className="d-flex" style={{ gap: "5px", alignItems: "center" }}>
                                                    <DeleteSVG color="#F40055" />Delete
                                                </div>,
                                                key: "1",
                                            },
                                        ],
                                    }}
                                    trigger={['click']}
                                    placement="bottom"
                                >
                                    <Button type="default" size="small" className="actions_btn center-items">
                                        <MenuDotsSVG />
                                    </Button>
                                </Dropdown>
                            }
                        },
                    ]}
                    dataSource={promotionListQuery?.data?.data}
                />
            </div>
        </div>
    );
};

export default Promotion;
