import { useState } from "react";
import Editor from "components/crm-board/Content/Editor";
import Note from "./Note";
import useNotification from "antd/es/notification/useNotification";
import useAddNote from "services/CustomerLeadBoard/Mutations/useAddNote";
import useGetNotes from "services/CustomerLeadBoard/Querys/useGetNotes";
import { Form } from "antd";
// style
import "./styles.css";
const Notes = () => {
  const [form] = Form.useForm();
  const { openNotificationWithIcon } = useNotification();
  const { data, refetch: refetchNotes } = useGetNotes();

  const { addNote, isPending } = useAddNote({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      // onClose();
      refetchNotes();
      form.resetFields();
      // query.invalidateQueries({ queryKey: [QUERY_KEY.NOTES] })
      openNotificationWithIcon("success", "Added successfully");
    },
  });
  console.log("notes", data);
  const [notes, setNotes] = useState([
    {
      id: "1",
      by: "John Doe",
      Due: "12/12/2021",
      title: "This is note title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, doloribus et consequuntur hic vel dicta?",
      image: "https://picsum.photos/1000/250",
    },
    {
      id: "2",
      by: "John Doe",
      Due: "12/12/2021",
      title: "This is note title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, doloribus et consequuntur hic vel dicta?",
    },
    {
      id: "3",
      by: "John Doe",
      Due: "12/12/2021",
      title: "This is note title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, doloribus et consequuntur hic vel dicta?",
      image: "https://picsum.photos/1000/250",
    },
  ]);

  const handelCreateNote = (data) => {
    const dataToAdd = { ...data };
    console.log("note to add", data);
    addNote(dataToAdd);
  };

  return (
    <div className="tasks_tab">
      <Editor
        isLoading={isPending}
        form={form}
        onSubmit={handelCreateNote}
        btn_label={"Create note"}
        placeholder="Start typing to leave a note..."
      />
      {notes.map((note) => (
        <Note key={note.id} {...note} refetchNotes={refetchNotes} />
      ))}
    </div>
  );
};

export default Notes;
