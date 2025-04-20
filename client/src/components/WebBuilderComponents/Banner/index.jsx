import React, { useEffect, useState } from 'react'
// style
import "./styles.css";
import { Modal, Tooltip } from 'antd';
import { Delete2SVG, EditSVG } from 'assets/jsx-svg';
import { useForm } from 'antd/es/form/Form';
import BannerForm from '../Forms/BannerForm';
const Banner = ({
    link, image, name, id, onEdit, onDelete, isEditMode = false, height = 250 }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [form] = useForm();

    const handelChanges = () => {
        form.validateFields()
            .then((values) => {
                onEdit(id, values)
                setIsEditOpen(false);
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <>
            <Modal
                open={isEditOpen}
                onCancel={() => {
                    setIsEditOpen(false);
                }}
                onOk={handelChanges}
                okText="Save changes"
                okButtonProps={{ style: { backgroundColor: "#272942" } }}
            >
                <BannerForm form={form} data={{ link, image, name, id, height }} />
            </Modal>
            <div className='web_builder_banner'>
                <a href={link} className='banner_link' target='_blank'>
                    <img
                        className='banner_image'
                        src={image}
                        alt={"banner"}
                        style={{ height: `${height}px` }}
                    />
                </a>

                {isEditMode && <div className='edit_btns_container'>
                    <button className='center-items' onClick={() => {
                        onDelete(id)
                    }}>
                        <Tooltip title={"Delete banner"}>
                            <Delete2SVG color="#000" />
                        </Tooltip>
                    </button>
                    <button className='center-items' onClick={() => {
                        setIsEditOpen(true);
                    }}>
                        <Tooltip title={"Edit banner"}>
                            <EditSVG color="#000" />
                        </Tooltip>
                    </button>
                </div>}
            </div>
        </>
    )
}

export default Banner