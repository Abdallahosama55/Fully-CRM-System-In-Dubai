import Link from "antd/es/typography/Link";
import { DeleteSVG, EditSVG } from "assets/jsx-svg";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => [
  {
    title: "No.",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
    width: 70,
  },
  {
    title: "Event Name",
    dataIndex: "event_name",
    key: "event_name",
    ellipsis: true,
    width: 130,
  },
  // {
  //   title: "Description",
  //   dataIndex: "description",
  //   key: "description",
  //   ellipsis: true,
  //   width: 200,
  // },

  {
    title: "Event Date",
    dataIndex: "event_date",
    key: "event_date",
    ellipsis: true,
    width: 130,
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
    ellipsis: true,
    width: 130,
  },
  {
    title: "Verse",
    dataIndex: "verse",
    key: "verse",
    ellipsis: true,
    width: 160,
  },

  {
    title: "Status",
    dataIndex: "isLive",
    key: "isLive",
    ellipsis: true,
    width: 130,
    render: (_, { isLive }) => {
      if (isLive) return "Live";
      return "Not live";
    },
  },
  {
    title: "Actions",

    key: "actions",
    dataIndex: "actions",
    ellipsis: true,
    width: 180,
    render: (_, record) => {
      return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {/* <Switch
            checked={record.status}
            title={record.status ? "Deactivate" : "Activate"}
            size="small"
            onChange={(e) => onRowSwitchChanged(record, e)}
          /> */}
          {
            <span
              title="Edit"
              style={{ cursor: "pointer" }}
              // onClick={() => record.status && onRowEditView(record)}
            >
              <EditSVG color={"#bfbfbf"} />
            </span>
          }
          <span
            title="Delete"
            style={{ cursor: "pointer" }}
            // onClick={() => onRowDelete(record)}
          >
            <DeleteSVG />
          </span>
        </div>
      );
    },
  },

  // {
  //   title: "Admin Link",
  //   dataIndex: "customerLink",
  //   key: "customerLink",
  //   ellipsis: true,
  //   width: 180,
  //   render: (_, { adminLink }) => {
  //     return (
  //       <Link target="_blank" href={adminLink}>
  //         Admin
  //       </Link>
  //     );
  //   },
  // },
  // {
  //   title: "Metaverse Link",

  //   ellipsis: true,
  //   width: 180,
  //   render: (_, { customerDimension }) => {
  //     return (
  //       <Link
  //         target="_blank"
  //         href={`${window.location.origin}/metaverse/${customerDimension.name}?meetingId=${customerDimension.id}`}>
  //         Metaverse
  //       </Link>
  //     );
  //   },
  // },

  // {
  //   title: "Status",
  //   dataIndex: "isLive",
  //   key: "isLive",
  //   ellipsis: true,
  //   width: 180,
  //   render: (_, { isLive }) => {
  //     if (isLive) return "Live";
  //     return "Not live";
  //   },
  // },
];
