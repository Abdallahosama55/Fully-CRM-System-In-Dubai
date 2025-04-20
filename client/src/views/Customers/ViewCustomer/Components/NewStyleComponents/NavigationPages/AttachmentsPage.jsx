import PageHeader from "./Components/PageHeaderComponent";
import AttachmentCardComponent from "./Components/AttachmentCardComponent";
import NoDataToShowComponent from "./Components/NoDataToShowComponent";

export default function AttachmentsPage({ attachments = [] }) {
  return (
    <>
      <PageHeader title={"Attachments"} />
      {attachments?.length > 0 ? (
        <div style={{ height: "100vh" }}>
          <div className="row gy-3">
            {(attachments || [])?.map((item) => (
              <div className="col-md-6" key={item?.id}>
                <AttachmentCardComponent
                  id={item?.id}
                  img={item.attachment}
                  title={"Attachment"}
                  date={item.createdAt?.split("T")[0]}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoDataToShowComponent />
      )}
    </>
  );
}
