import React from 'react'
import {
    Button,
    Modal
} from "antd";
export default function WarningModal({ handleOk, handleCancel, isWarningModalOpen, warningBody, warningTitle }) {
    return (
        <Modal centered={true} width={400} title={null} open={isWarningModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <h3 style={{ textAlign: 'center' }}>Warning</h3>
            {warningTitle && <p style={{ textAlign: 'center', marginTop: '1rem' }}>{warningTitle}</p>}
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>{warningBody}</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
                <Button size='small' style={{ width: '48%' }} block onClick={handleCancel}>Cancel</Button>
                <Button size='small' style={{ width: '48%', backgroundColor: '#E81224', color: '#FFFFFF' }} danger onClick={handleOk}>Confirm</Button>

            </div>
        </Modal>
    )
}
