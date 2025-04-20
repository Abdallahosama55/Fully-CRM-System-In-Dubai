import { DownOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Dropdown, Input, Row, Space } from "antd";
import "./styles.css";
import { FilterSVG, SearchSVG } from "assets/jsx-svg";
import { Link } from "react-router-dom";
import { menuProps } from "./utils";
import PriorityBoard from "./components/PriorityBoard";
import { useNotification } from "context/notificationContext";
import { queryClient } from "services/queryClient";
import { v4 as uuidv4 } from "uuid";

import PipelineTemplateItem from "./components/PipelineTemplateItem";
import useGetPipelineTemplates from "services/pipelineTemplate/Querys/useGetPipelineTemplates";
import useDeletePipelineTemplate from "services/pipelineTemplate/Mutations/useDeletePipelineTemplate";
import { QUERY_KEY } from "services/constants";
import useUpdatePipelineTemplate from "services/pipelineTemplate/Mutations/useUpdatePipelineTemplate";
import LoadingPage from "components/common/LoadingPage";

function PipelineTemplates() {
  const { openNotificationWithIcon } = useNotification();
  
  var AddIdToStage = (stages) => {
    var newStage = [];
    stages.forEach((stage) => {
      newStage.push({
        id: uuidv4(),
        ...stage,
      });
    });
    console.log("aaaaaaaaaaaaa", newStage);
    return newStage;
  };
  const { data: PipelineTemplates, isLoading } = useGetPipelineTemplates({
    select: (data) => {
      return data.data.data.rows.map((row) => {
        return {
          ...row,
          // stages: [row.stages],
          // stages: [],
        };
      });
    },
  });
  console.log("PipelineTemplates==>", PipelineTemplates);
  const { deleteTemplate } = useDeletePipelineTemplate({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      const templateId = payload;
      queryClient.setQueryData([QUERY_KEY.PIPELINES_TEMPLATES], (prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            data: {
              ...prev.data.data,
              rows: prev.data.data.rows.filter((item) => item.id != templateId),
            },
          },
        };
      });
      // refetchEmailConfig();
      openNotificationWithIcon("success", "Deleted successfully");
    },
  });
  const { updateTemplate } = useUpdatePipelineTemplate({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      // const templateId = payload;
      // queryClient.setQueryData([QUERY_KEY.PIPELINES_TEMPLATES], (prev) => {
      //   return {
      //     ...prev,
      //     data: {
      //       ...prev.data,
      //       data: {
      //         ...prev.data.data,
      //         rows: prev.data.data.rows.filter((item) => item.id == templateId),
      //       },
      //     },
      //   };
      // });
      // refetchEmailConfig();
      openNotificationWithIcon("success", "Updated successfully");
    },
  });
  if (isLoading) return <LoadingPage></LoadingPage>;

  return (
    <>
      {PipelineTemplates?.map((template) => (
        <div style={{ marginBottom: 10 }}>
          <PipelineTemplateItem
            templateItem={template}
            deleteTemplate={deleteTemplate}
            updateTemplate={updateTemplate}
          />
        </div>
      ))}
    </>
  );
}

export default PipelineTemplates;
