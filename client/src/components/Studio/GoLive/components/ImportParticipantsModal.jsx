import { Button, Modal, Upload } from "antd";
import { downloadParticipantsCSVTemplate } from "utils/filesUtils";
import { validateEmail } from "utils/validators";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx/xlsx.mjs";

const ImportParticipantsModal = ({
  isOpen,
  onCancel,
  onParticipantsUploaded,
  isAddParticipants,
}) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleDownloadTemplate = () => {
    if (isAddParticipants) {
      downloadParticipantsCSVTemplate(["Name", "Email", "isVIP"]);
    } else {
      downloadParticipantsCSVTemplate([
        "Name",
        "Email",
        "Company",
        "Title",
        "Social Link",
        "Website",
        "Bio",
      ]);
    }
  };

  const handleImportFromExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const skippedIndexes = [];

      // Initialize a Set to store unique participant emails
      const emailSet = new Set();

      const participants = [];
      jsonData?.slice(1)?.forEach((data, index) => {
        if (!data[0] || !data[1] || !validateEmail(data[1])) {
          skippedIndexes.push(index + 2);
        } else {
          // Check if email already exists in the Set
          if (emailSet.has(data[1])) {
            skippedIndexes.push(index + 2);
          } else {
            emailSet.add(data[1]); // Add email to the Set
            const newParticipant = {
              id: uuidv4(),
            };
            jsonData[0]?.forEach((key, index) => {
              newParticipant[key === "isVIP" ? key : key.toLowerCase()] = data[index];
            });
            newParticipant.isVIP = newParticipant.isVIP === "true" ? true : false;
            console.log("newParticipant", newParticipant);
            participants.push(newParticipant);
          }
        }
      });

      onParticipantsUploaded({ participants, skippedIndexes });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Modal
      open={isOpen}
      centered
      title="Import File"
      onCancel={handleCancel}
      footer={
        <>
          <Button onClick={handleDownloadTemplate}>Download Template File</Button>
          <Upload
            accept=".xlsx, .xls, .csv"
            beforeUpload={(file) => {
              handleImportFromExcel(file);
              return false; // Prevent default upload behavior
            }}
            showUploadList={false}>
            <Button key="submit" type="primary" style={{ marginLeft: 16 }}>
              Upload File
            </Button>
          </Upload>
        </>
      }>
      <p style={{ marginTop: 24, marginBottom: 24 }}>
        To get started, download the CSV template by clicking the button below. This template
        contains the necessary structure for your data. Fill in the cells with your information.
      </p>
    </Modal>
  );
};

export default ImportParticipantsModal;
