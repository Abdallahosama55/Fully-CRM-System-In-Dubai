import React, { useEffect, useState } from "react";
import "grapesjs/dist/css/grapes.min.css"; // Import GrapesJS CSS
import { GrapesjsReact } from "grapesjs-react";
import gjspresetwebpage from "grapesjs-preset-webpage";
import gjsblockbasic from "grapesjs-blocks-basic";
import congigEditor from "./config/editor";

// styles
import "./styles.css";
import * as style from "./sliderStyle.css";
import SaveSVG from "assets/jsx-svg/SaveSVG";
import { renderToString } from "react-dom/server";
import "antd/es/grid/style/index";
import { Form, Input, message, Modal, Select, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import useGetPageById from "services/web-builder/Queries/useGetPageById";
import useAddPage from "services/web-builder/Mutations/useAddPage";
import useEditPage from "services/web-builder/Mutations/useEditPage";
import ROUTER_URLS from "constants/ROUTER_URLS";
import isValidJson from "utils/isValidJson";
import grapesjsTailwind from "grapesjs-tailwind";
import mainLayout from "./layouts/mainLayout";

const disallowedRoutes = ["/admin", "/login"];

const WebBuilder = () => {
  const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState(false);
  const { id } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState(null);

  // queries
  const pageById = useGetPageById(id, { enabled: !!id });

  useEffect(() => {
    if (pageById?.isSuccess && pageById?.data && editorData) {
      form.setFieldsValue(pageById?.data);

      if (isValidJson(pageById?.data?.content)) {
        editorData.loadProjectData(JSON.parse(pageById?.data?.content)?.projectData);
      }
    }
  }, [pageById?.data, form, pageById?.isSuccess, editorData]);

  // mutations
  const addPageMutation = useAddPage({
    onSuccess: () => {
      message.success("Page added successfully");
      setIsEditInfoModalOpen(false);
      setTimeout(() => {
        navigate(ROUTER_URLS.PAGES.INDEX);
      }, 500);
    },
    onError: (error) => {
      message.error(error?.message || "something went wrong");
    },
  });

  const editPageMutation = useEditPage(id, {
    onSuccess: () => {
      message.success("Page updated successfully");
      setIsEditInfoModalOpen(false);
      setTimeout(() => {
        navigate(ROUTER_URLS.PAGES.INDEX);
      }, 500);
    },
    onError: (error) => {
      message.error(error?.message || "something went wrong");
    },
  });

  const handleSaveContent = () => {
    form.validateFields().then((values) => {
      const temp = {
        ...values,
        isRoot: pageById?.data?.isRoot || false,
        content: JSON.stringify({
          html: editorData?.getHtml(),
          css: editorData?.getCss(),
          canvasScripts: editorData?.config?.canvas.scripts,
          canvasStyles: editorData?.config?.canvas.styles,
          projectData: editorData?.getProjectData(),
        }),
      };

      if (id) {
        editPageMutation.mutate(temp);
      } else {
        addPageMutation.mutate(temp);
      }
    });
  };

  return (
    <div className="web_builder_container">
      <Modal
        open={isEditInfoModalOpen}
        title={"Page info"}
        okText={"Save"}
        onCancel={() => {
          form.setFieldsValue(pageById?.data);
          setIsEditInfoModalOpen(false);
        }}
        onOk={handleSaveContent}>
        <Form form={form} layout="vertical">
          <Form.Item
            layout="vertical"
            label="Page url"
            name="page"
            required
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject(new Error("Please enter a route URL."));
                  }
                  const routePattern = /^\/[a-zA-Z0-9-/]*$/;

                  if (!routePattern.test(value)) {
                    return Promise.reject(
                      new Error(
                        "Please enter a valid route (e.g., /about-us or /services/contact).",
                      ),
                    );
                  }

                  if (disallowedRoutes?.includes(value)) {
                    return Promise.reject(
                      new Error("This route is restricted and cannot be used."),
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}>
            <Input placeholder="/about-us" />
          </Form.Item>
          <Form.Item
            layout="vertical"
            label="Page Keywords"
            name="metaKeywords"
            rules={[{ required: true, message: "Enter meta keywords" }]}>
            <Select
              mode="tags"
              tagRender={(el) => (
                <Tag closable onClose={el?.onClose}>
                  {el?.label}
                </Tag>
              )}
              placeholder="Keywords for SEO"
            />
          </Form.Item>
        </Form>
      </Modal>
      <GrapesjsReact
        id="grapesjs-react"
        storageManager={{
          type: "local",
          autosave: true,
          stepsBeforeSave: 1,
        }}
        plugins={[
          gjspresetwebpage,
          grapesjsTailwind,
          (editor) => congigEditor({ editor, navigate }),
          (editor) => gjsblockbasic(editor, { blocks: ["image", "video"] }),
          (editor) => {
            // Set initial content after the editor initializes
            editor.on("load", (editorData) => {
              setEditorData(editorData);
              editor.setComponents("");
              mainLayout(editorData);
            });

            // Add a custom save button to the toolbar
            editor.Panels.addButton("options", [
              {
                id: "save-button",
                command: "save-content",
                attributes: { title: "Save Content" },
                label: renderToString(<SaveSVG color={"#EEE"} width={14} height={14} />),
              },
            ]);

            // Define the command for saving
            editor.Commands.add("save-content", {
              run: () => setIsEditInfoModalOpen(true),
            });
          },
        ]}
        canvas={{
          styles: [
            "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
            style,
            "/post.css",
            "/all_antd_style.css",
          ],
          scripts: [
            "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
            "https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries",
          ],
        }}
      />
    </div>
  );
};

export default WebBuilder;
