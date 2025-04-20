import React from 'react'
import default_image from "assets/images/default_image.png"
// style
import "./styles.css"
import { Button, Space, Tooltip, Typography } from 'antd'
import { DeleteSVG, EditSVG } from 'assets/jsx-svg'
import NewSubSection from '../NewSubSection'
import { useDrawer } from 'hooks/useDrawer'
const SubSectionCard = ({ eventId, id, title, description, image, handelDelete, handelEdit }) => {
    const DrawerAPI = useDrawer();
    return (
        <div className='sub_section_card'>
            {DrawerAPI.Render}
            <img src={image || default_image} alt={title} />
            <div className='sub_section_card_body'>
                <Typography.Paragraph ellipsis={{ rows: 2, tooltip: title }} className='xl_text_medium' style={{ margin: "0.5rem 0" }}>{title}</Typography.Paragraph>
                <Typography.Paragraph className='sm_text_regular' ellipsis={{ rows: 8 }} style={{ margin: "0" }}>{description}</Typography.Paragraph>
            </div>
            <Space className='center-items'>
                <Tooltip title={"Edit"}>
                    <Button
                        type={"primary"}
                        icon={<EditSVG color="#fff" />}
                        className='table_action_button'
                        onClick={() => {
                            DrawerAPI.setDrawerContent(<NewSubSection DrawerAPI={DrawerAPI} eventId={eventId} id={id} handelEdit={handelEdit} />)
                            DrawerAPI.open("55%")
                            DrawerAPI.setRootClassName("gray_bg_drawer")
                        }}
                    />
                </Tooltip>
                <Tooltip title={"Delete"}>
                    <Button
                        onClick={() => handelDelete(id)}
                        icon={<DeleteSVG color="#fff" />}
                        danger
                        type={"primary"}
                        className='table_action_button'
                    />
                </Tooltip>
            </Space>
        </div>
    )
}

export default SubSectionCard