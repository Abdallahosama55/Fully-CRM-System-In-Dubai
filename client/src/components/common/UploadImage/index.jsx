import React from 'react';
import { Upload, message } from 'antd';
import { AddImageSVG } from 'assets/jsx-svg';
// style
import "./styles.css"
const UploadImage = ({ value, onChange: onValueChange, maxImageSize = 5, name, action }) => {
    const handleUploadChange = info => {
        if (info.file.status === 'done') {
            onValueChange(info.file.response.uploadedFiles.file);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG images!');
        }
        const isLtMaxSize = file.size / 1024 / 1024 < maxImageSize;
        if (!isLtMaxSize) {
            message.error(`Image must smaller than ${maxImageSize}MB!`);
        }
        return isJpgOrPng && isLtMaxSize;
    };

    return (
        <div className='image_input'>
            <Upload.Dragger
                name={name}
                action={action}
                onChange={handleUploadChange}
                beforeUpload={beforeUpload}
                showUploadList={false}
            >
                {!value ? <>
                    <p className="ant-upload-drag-icon">
                        <AddImageSVG />
                    </p>
                    <p className="ant-upload-hint fz-12">
                        (Maximum 5Mb)
                    </p>
                    <p className="ant-upload-text">Upload image or drag and drop</p>
                </>
                    :
                    <img className="preview_image" src={value} alt="banner" />}
            </Upload.Dragger>
        </div>
    )
}

export default UploadImage