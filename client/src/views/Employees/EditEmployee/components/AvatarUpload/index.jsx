import { useState, useEffect } from 'react';
import Dragger from "antd/es/upload/Dragger";
import { Typography, message } from 'antd';
// icons
import { Upload } from 'assets/jsx-svg';
// utils
import { getBase64 } from 'utils/getBase64';
// images
import defaultAvatar from 'assets/images/avatar.png'
// style
import './styles.css';
const AvatarUpload = ({ value, onChange }) => {
    const [previewPic, setPreviewPic] = useState(value || defaultAvatar);
    useEffect(() => {
        if (value) {
            setPreviewPic(value);
        }
    }, [value])

    const draggerProps = {
        name: "avatar",
        showUploadList: false,
        multiple: false,
        action: false,
        maxCount: 1,
        beforeUpload: () => {
            return false;
        },
        async onChange(info) {
            onChange(info.fileList[0]);
            const { status } = info.file;
            setPreviewPic(await getBase64(info.fileList[0].originFileObj));
            if (status === "done") {
                message.success(`${info.file.name} image uploaded successfully.`);
            } else if (status === "error") {
                message.error(`${info.file.name} image upload failed.`);
            }
        },
        accept: "image/*",
        className: "avatar_image_dragger",
    };

    return (
        <div className="avatar_upload">
            <Dragger {...draggerProps}>
                <div className="image_preview_box">
                    <img src={previewPic} alt="avatar" className='avatar_preview' />
                    <div className="upload_overlay center-items">
                        <Upload />
                        <Typography.Text className='wc fz-12'>Upload</Typography.Text>
                    </div>
                </div>
            </Dragger>
        </div>
    )
}

export default AvatarUpload