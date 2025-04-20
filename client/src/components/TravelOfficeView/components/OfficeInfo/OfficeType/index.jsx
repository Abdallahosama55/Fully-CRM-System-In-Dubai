import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Space } from "antd";
import Typography from "antd/es/typography/Typography";
import { ProspectsSVG, QualitySVG, ClientsSVG } from "assets/jsx-svg"; // Make sure these SVGs are correctly imported
import { useEffect, useState } from "react";
import useEditOfficeLevel from "services/agencies/Mutations/useEditOfficeLevel";

const types = [
    {
        key: "LEAD",
        label: `Lead`,
        color: "#0056B3",
        backgroundColor: "#E4F0FF",
        icon: <ProspectsSVG />,
    },
    {
        key: "REGISTERED",
        label: `Registered`,
        color: "#CC7000",
        backgroundColor: "#FFEED3",
        icon: <QualitySVG />,
    },
    {
        key: "CLIENTS",
        label: `Clients`,
        color: "#1C7A31",
        backgroundColor: "#E5F6E8",
        icon: <ClientsSVG />,
    },
];

const getTypeList = (type) => {
    switch (type) {
        case "LEAD":
            return [
                { key: "REGISTERED", label: `Registered`, color: "#CC7000", backgroundColor: "#FFEED3", icon: <QualitySVG /> },
                { key: "CLIENTS", label: `Clients`, color: "#1C7A31", backgroundColor: "#E5F6E8", icon: <ClientsSVG /> },
            ];
        case "REGISTERED":
            return [
                { key: "LEAD", label: `Lead`, color: "#0056B3", backgroundColor: "#E4F0FF", icon: <ProspectsSVG /> },
                { key: "CLIENTS", label: `Clients`, color: "#1C7A31", backgroundColor: "#E5F6E8", icon: <ClientsSVG /> },
            ];
        case "CLIENTS":
            return [
                { key: "REGISTERED", label: `Registered`, color: "#CC7000", backgroundColor: "#FFEED3", icon: <QualitySVG /> },
                { key: "LEAD", label: `Lead`, color: "#0056B3", backgroundColor: "#E4F0FF", icon: <ProspectsSVG /> },
            ];
        default:
            return [];
    }
};

const OfficeType = ({ type, id }) => {
    const [selectedType, setSelectedType] = useState(types[0]);
    const [typeList, setTypeList] = useState(getTypeList(type));
    console.log({type, id})
    const editOfficeLevel = useEditOfficeLevel({
        onSuccess: () => message.success("Updated successfully"),
        onError: (data) => message.error(data?.response?.data?.message || "Something went wrong with the server"),
    });

    useEffect(() => {
        if (type && id) {
            const foundType = types.find((item) => item.key === type);
            setSelectedType(foundType || types[0]);
            setTypeList(getTypeList(type));
        }else{
            setSelectedType(types[0]);
            setTypeList(getTypeList(types[0]?.key));
        }
    }, [type, id]);

    const handleChangeStatus = (status) => {
        setSelectedType(status);
        setTypeList(getTypeList(status.key));
        editOfficeLevel.mutate({ level: status.key, id });
    };

    const menu = (
        <Menu>
            {typeList.map((status) => (
                <Menu.Item key={status.key} onClick={() => handleChangeStatus(status)}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {status.icon}
                        <span style={{ marginLeft: 8 }}>{status.label}</span>
                    </div>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={["click"]}>
            <div style={{ cursor: "pointer" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: selectedType?.backgroundColor || "#F1F3F5",
                        color: selectedType?.color || "#313342",
                        padding: "8px 12px",
                        height: "36px",
                        borderRadius: "8px",
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <div style={{ display: "flex", columnGap: 4, alignItems: "center", flex: 1 }}>
                        {selectedType?.icon}
                        <Space style={{ paddingLeft: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <Typography.Text ellipsis={{ tooltip: selectedType?.label }}>{selectedType?.label || "Company"}</Typography.Text>
                        </Space>
                    </div>
                    <DownOutlined style={{ marginLeft: 8 }} />
                </div>
            </div>
        </Dropdown>
    );
};

export default OfficeType;
