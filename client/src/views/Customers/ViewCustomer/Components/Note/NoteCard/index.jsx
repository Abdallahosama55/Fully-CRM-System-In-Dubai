import { Card, Flex } from "antd";
import { DateSVG } from "assets/jsx-svg";

const NoteCard = ({ content, date, loading }) => {
  return (
    <Card
      loading={loading}
      title="Note"
      extra={
        !loading && (
          <Flex gap={8} align="center">
            <DateSVG />
            {date}
          </Flex>
        )
      }>
      <div dangerouslySetInnerHTML={{ __html: content }} />{" "}
    </Card>
  );
};
export default NoteCard;
