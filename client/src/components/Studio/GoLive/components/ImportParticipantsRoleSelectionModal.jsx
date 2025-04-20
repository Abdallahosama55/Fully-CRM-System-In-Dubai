import { Button, Col, Modal, Row, Typography, message } from "antd";

const ImportParticipantsRoleSelectionModal = ({ participants, onImport }) => {
  const handleImport = () => {
    message.success("Participants imported successfully!");
    onImport({ participants });
  };

  return (
    <Modal
      open={!!participants.length}
      centered
      closable={false}
      title="Role Selection"
      footer={
        <Button type="primary" onClick={handleImport}>
          Import
        </Button>
      }>
      <Row gutter={[0, 16]}>
        {participants.map((participant) => (
          <Col xs={24} key={participant.id}>
            {Object.entries(participant).map(([key, value]) => {
              if (key === "id") return;
              return (
                <Row key={key}>
                  <Col xs={8}>
                    <Typography.Text
                      style={{ textTransform: "capitalize" }}
                      className="fz-14 fw-800">
                      {key}
                    </Typography.Text>
                  </Col>
                  <Col xs={16}>
                    <Typography.Text className="fz-14 fw-600">
                      {typeof value === "boolean" ? (value ? "true" : "false") : value}
                    </Typography.Text>
                  </Col>
                </Row>
              );
            })}
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default ImportParticipantsRoleSelectionModal;
