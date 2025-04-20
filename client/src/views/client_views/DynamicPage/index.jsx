import LoadingPage from "components/common/LoadingPage";
import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetPageContent from "services/web-builder/Queries/useGetPageContent";
import isValidJson from "utils/isValidJson";
import { Helmet } from "react-helmet";
import EVENTS_MESSAGE_TYPES from "constants/EVENTS_MESSAGE_TYPES";

const DynamicPage = () => {
  const { pathname } = useLocation();
  const pageContent = useGetPageContent({ page: pathname }); // Fetch content based on the path
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
    return isValidJson(pageContent?.data?.content)
      ? JSON.parse(pageContent?.data?.content)
      : {
          html: `<div>
                /${pathname}
                <h1>/${pathname}: 404 Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>`,
          css: "",
        };
  }, [pageContent?.data?.content]);

  useEffect(() => {
    if (dataToRender?.html && dataToRender?.html.toString().includes("mySwiper")) {
      // Extract and execute <script> tags from the HTML content dynamically
      // This ensures that scripts embedded in the saved HTML are executed when rendered
      const scriptTags = document.createElement("div");
      scriptTags.innerHTML = dataToRender?.html;

      // Extract and execute script tags
      const scripts = scriptTags.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        newScript.textContent = script.textContent;

        document.body.appendChild(newScript);
      });
    }
  }, [dataToRender?.html]);

  if (pageContent.isLoading) {
    return <LoadingPage />;
  }

  // Check if content exists
  if (!pageContent.data) {
    return (
      <div>
        <h1>404 Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content={
            Array.isArray(pageContent?.data?.metaKeywords)
              ? pageContent?.data?.metaKeywords?.join(", ")
              : ""
          }
        />
        <link rel="stylesheet" href="all_antd_style.css" />
        <link rel="stylesheet" href="post.css" />
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
