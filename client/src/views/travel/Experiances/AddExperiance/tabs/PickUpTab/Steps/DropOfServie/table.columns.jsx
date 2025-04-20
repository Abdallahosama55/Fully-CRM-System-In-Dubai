import { Button, Dropdown } from "antd"
import { DeleteSVG, EditSVG, MenuDotsSVG } from "assets/jsx-svg"
import ExperianceService from "services/travel/experiance"

const getTableCoulmns = ({ startEdit, onDelete }) => {
    return [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: ' ',
            dataIndex: 'id',
            key: 'id',
            render: (id, rowData) => {
                return <Dropdown
                    menu={{
                        items: [
                            {
                                onClick: () => { startEdit(id) },
                                label: <div className="actions_menu_label">
                                    <EditSVG />Edit
                                </div>,
                                key: "0",
                            },
                            {
                                onClick: () => {
                                    ExperianceService.PickUpTab.deleteLocation(id, true)
                                        .then(() => { onDelete() })
                                        .catch(() => { })
                                },
                                label: <div className="actions_menu_label delete_action_btn">
                                    <DeleteSVG color="#F40055" />Delete
                                </div >,
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
                </Dropdown >
            }
        },
    ]
}

export default getTableCoulmns