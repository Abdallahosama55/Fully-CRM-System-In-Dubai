import LoadingPage from "components/common/LoadingPage";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import isValidJson from "utils/isValidJson";
import { Helmet } from "react-helmet";
import EVENTS_MESSAGE_TYPES from "constants/EVENTS_MESSAGE_TYPES";
import { FloatButton } from "antd";
import { ArrowBackSVG } from "assets/jsx-svg";
import useGetPageById from "services/web-builder/Queries/useGetPageById";

const DynamicPage = () => {
  const { id } = useParams();
  const pageById = useGetPageById(id, { enabled: !!id });
  const navigate = useNavigate();

  useEffect(() => {
    const handleIframeMessage = (event) => {
      if (event.data.type === EVENTS_MESSAGE_TYPES.CHANGE_PAGE_EVENT && event.data.url) {
        const { url, data = {} } = event.data; // Access both URL and values data
        navigate(url, { state: { data } });
      }
    };

    window.addEventListener("message", handleIframeMessage);

    return () => {
      window.removeEventListener("message", handleIframeMessage);
    };
  }, [navigate]);

  const dataToRender = useMemo(() => {
    // Validate and parse the content, return default HTML if invalid
    return isValidJson(pageById?.data?.content)
      ? JSON.parse(pageById?.data?.content)
      : {
          html: `<div>
                /${id}
                <h1>/${id}: 404 Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>`,
          css: "",
        };
  }, [pageById?.data?.content]);

  useEffect(() => {
    if (dataToRender?.html) {
      // Extract and execute <script> tags from the HTML content dynamically
      const scriptTags = document.createElement("div");
      scriptTags.innerHTML = dataToRender?.html;

      // Extract and execute script tags
      const scripts = scriptTags.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        newScript.textContent = `
          (function() {
            "use strict";
            ${script.textContent}
          }).call(window); // Bind 'window' or the desired context
        `;

        document.body.appendChild(newScript);
      });
    }
  }, [dataToRender?.html]);

  if (pageById.isLoading) {
    return <LoadingPage />;
  }

  // Check if content exists
  if (!pageById.data) {
    return (
      <div>
        <h1>404 Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
      <FloatButton icon={<ArrowBackSVG />} onClick={() => navigate(-1)} />
      <Helmet>
        <meta
          name="keywords"
          content={
            Array.isArray(pageById?.data?.metaKeywords)
              ? pageById?.data?.metaKeywords?.join(", ")
              : ""
          }
        />
        <link rel="stylesheet" href="/all_antd_style.css" />
        <link rel="stylesheet" href="/post.css" />
        <style>{dataToRender.css}</style>
        {dataToRender?.canvasStyles?.map(
          (style, i) =>
            typeof style === "string" &&
            style.startsWith("https") && <link key={i} rel="stylesheet" href={style} />,
        )}
        {dataToRender?.canvasScripts?.map((script, i) => (
          <script key={i} src={script}></script>
        ))}
      </Helmet>
      <div dangerouslySetInnerHTML={{ __html: dataToRender?.html }} />
    </>
  );
};

export default DynamicPage;
