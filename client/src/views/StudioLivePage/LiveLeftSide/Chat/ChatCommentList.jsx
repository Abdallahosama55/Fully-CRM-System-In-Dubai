import { useEffect } from "react";
import VerseComment from "./VerseComment";
import { onValue, ref, remove } from "firebase/database";

function ChatCommentList({ comment, setComment, liveId, db }) {
  useEffect(() => {
    const referencenew = ref(db, `vverse/${liveId}/chats/massages`);
    onValue(referencenew, (data) => {
      const value = data.val();

      if (value) {
        setComment(Object.entries(value));
      } else {
        setComment([]);
      }
    });
  }, [db, setComment, liveId]);

  const handleDeleteComment = (id) => {
    const referencenew = ref(db, `vverse/${liveId}/chats/massages/${id}`);
    remove(referencenew);
  };

  return (
    <>
      {comment?.map(([id, data], i) => (
        <VerseComment
          handleDeleteComment={handleDeleteComment}
          data={data}
          key={id}
          id={id}
        />
      ))}
    </>
  );
}

export default ChatCommentList;
