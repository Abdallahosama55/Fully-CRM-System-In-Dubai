/// <reference types='vitest' />
import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/",
  esbuild: {
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
  build: {
    outDir: "build",
    exclude: ["node_modules"],
    include: ["src/**/*"],
  },
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    {
      name: "trest-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "/src"), // This is the base alias for your project
      layout: path.join(__dirname, "/src/layout"), // Alias for the "layout" folder
      context: path.join(__dirname, "/src/context"), // Alias for the "context" folder
      router: path.join(__dirname, "/src/router"), // Alias for the "router" folder
      services: path.join(__dirname, "/src/services"), // Alias for the "services" folder
      hooks: path.join(__dirname, "/src/hooks"), // Alias for the "hooks" folder
      assets: path.join(__dirname, "/src/assets"), // Alias for the "assets" folder
      components: path.join(__dirname, "/src/components"), // Alias for the "components" folder
      views: path.join(__dirname, "/src/views"), // Alias for the "views" folder
      utils: path.join(__dirname, "/src/utils"), // Alias for the "utils" folder
      styles: path.join(__dirname, "/src/styles"), // Alias for the "styles" folder
      constants: path.join(__dirname, "/src/constants"), // Alias for the "constants" folder
      HOC: path.join(__dirname, "/src/HOC"), // Alias for the "HOC" folder
      mock: path.join(__dirname, "/src/mock"), // Alias for the "mock" folder
    },
  },
  output: {
    output: {
      manualChunks(id) {
        if (id.includes("node_modules")) {
          if (id.includes("react") && !id.includes("react-quill")) {
            return "react-vendors";
          }
          if (id.includes("antd") || id.includes("@ant-design/icons")) {
            return "antd";
          }
          if (id.includes("@tanstack/react-query")) {
            return "react-query";
          }
          if (id.includes("@stripe/react-stripe-js") || id.includes("@stripe/stripe-js")) {
            return "stripe";
          }
          if (id.includes("@fullcalendar")) {
            return "fullcalendar";
          }
          if (id.includes("@react-google-maps") || id.includes("@vis.gl/react-google-maps")) {
            return "google-maps";
          }
          if (id.includes("react-quill")) {
            return "quill";
          }
          if (
            id.includes("@livekit") ||
            id.includes("livekit-client") ||
            id.includes("livekit-server-sdk")
          ) {
            return "livekit";
          }
          if (id.includes("firebase")) {
            return "firebase";
          }
          if (
            ["axios", "uuid", "xlsx", "compression", "date-fns", "dayjs", "dompurify"].some((lib) =>
              id.includes(lib),
            )
          ) {
            return "vendor";
          }
          if (
            ["emoji-mart", "react-color", "react-dnd", "react-slick", "slick-carousel"].some(
              (lib) => id.includes(lib),
            )
          ) {
            return "misc";
          }
          return "vendor";
        }
      },
    },
  },
});
