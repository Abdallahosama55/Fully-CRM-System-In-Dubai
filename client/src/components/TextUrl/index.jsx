import { Typography } from "antd";

export default function TextUrl({ text, style }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return (
    <>
      {text?.split(urlRegex).map((section, index) =>
        urlRegex.test(section) ? (
          <Typography.Link
            key={index}
            href={section}
            style={{ textDecoration: "underline" }}
          >
            {section}
          </Typography.Link>
        ) : (
          <Typography.Text key={index} style={style}>
            {section}
          </Typography.Text>
        ),
      )}
    </>
  );
}
