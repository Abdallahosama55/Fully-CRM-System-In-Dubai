import { Modal } from 'antd'
import React from 'react'
// style
import "./styles.css";
const IframeModal = ({
    link, isOpen, title, close
}) => {
    return <Modal
        className='iframe-modal'
        title={null}
        open={isOpen}
        onCancel={close}
        footer={null}
        width="90vw" // Set the width of the modal
        styles={{ body: { padding: 0 } }} // Remove padding to fit iframe
        style={{ top: 20 ,  padding: 0 ,marginBottom: 0}} // Control vertical position if necessary
    >
        <iframe
            src={link}
            title="External Page"
            style={{
                width: '100%',
                border: 'none', // Remove iframe border
            }}
        />
    </Modal>

}

export default IframeModal