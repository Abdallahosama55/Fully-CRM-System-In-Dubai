// icons
import { MessageSVG } from "assets/jsx-svg";
// style
import "./styles.css";
import CustomCollapse from "../../components/CustomCollapse";

import useNotification from "antd/es/notification/useNotification";
import useDeleteNote from "services/Note/Mutations/useDeleteNote";
import { Spin } from "antd";

const Note = ({ id, by, Due, title, description, image, refetchNotes, isWithOutMenu }) => {
  const { openNotificationWithIcon } = useNotification();

  const { deleteNote, isPending } = useDeleteNote({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      // onClose();
      refetchNotes(id);
      openNotificationWithIcon("success", "Deleted successfully");
    },
  });
  const handelRemoveNote = () => {
    deleteNote(id);
    // deleteNote(id);
  };
  return (
    <Spin spinning={isPending}>
      <CustomCollapse
        onRemove={handelRemoveNote}
        by={by}
        isLoading={isPending}
        isWithOutMenu={isWithOutMenu}
        by_label="Note by"
        by_icon={<MessageSVG />}
        Due={Due}>
        <div className="note_card_body">
          <p className="fz-14">{title}</p>
          <div className="fz-12 gc">{description}</div>
          {image && <img className="card_image" src={image} alt="note card" />}
        </div>
      </CustomCollapse>
    </Spin>
  );
};

export default Note;
