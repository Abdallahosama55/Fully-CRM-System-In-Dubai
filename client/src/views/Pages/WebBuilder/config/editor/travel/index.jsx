import WEB_BUILDER_ICONS from "assets/jsx-svg/WebBuilder";
import CLIENT_ROUTER_URLS from "constants/CLIENT_ROUTER_URLS";

const travelBlocks = (editor) => {
  // Define the container div component
  editor.Components.addType("booking-container", {
    model: {
      defaults: {
        tagName: "div",
        // Remove 'attributes.style' and use only 'style'
        style: {
          position: "relative",
          height: "220px", // Initial height, can be dynamic
          width: "100%",
        },

        draggable: true, // Allow the container to be draggable
        droppable: true, // Allow dropping other components outside the container
        stylable: true, // Allow styling via the Style Manager
        components: [
          {
            type: "booking-iframe",
            style: {
              position: "absolute",
              top: "0",
              left: "0",
              "z-index": 999,
              height: "100%", // Consider setting to '100%' if dynamic
              width: "100%",
              border: "none",
              // "pointer-events": "none", // Remove default border
            },
          },
        ],
        traits: [], // No traits for the container unless needed
        // Optional: Add a script for dynamic behavior
        script: function () {
          const container = this;

          function receiveMessage(event) {
            const allowedOrigin = "https://www.yoursite.com"; // Replace with your actual origin
            if (event.origin !== allowedOrigin) {
              console.warn("Received message from unauthorized origin:", event.origin);
              return;
            }

            const data = event.data;
            if (data.type === "resize" && data.height) {
              container.style.height = `${data.height}px`;
            }
          }

          window.addEventListener("message", receiveMessage, false);
          console.log(this, "this");

          // Cleanup the event listener when the component is removed
          if (this) {
            this?.model?.on("remove", () => {
              window.removeEventListener("message", receiveMessage, false);
            });
          }
        },
      },
    },
  });

  // Define the iframe component
  editor.Components.addType("booking-iframe", {
    model: {
      defaults: {
        tagName: "iframe",
        attributes: {
          src: CLIENT_ROUTER_URLS.BOOKING.ONLINE_BOOKING, // Set the default URL to booking
          frameborder: "0",
          scrolling: "no",
          // Removed height from attributes
        },
        style: {
          position: "absolute",
          "z-index": 999,
          height: "100%", // Set a default or use '100%' for dynamic sizing
          width: "100%",
          border: "none",
          // "pointer-events": "none", // Ensure no border
        },
        // Disable user interactions with the iframe component
        selectable: true,
        draggable: true,
        droppable: false,
        copyable: true,
        highlightable: true,
        removable: true,
        stylable: true, // Prevent styling via the Style Manager
        traits: [], // Remove traits to prevent attribute manipulation
      },
    },
    view: {
      onRender({ el }) {
        el.style["pointer-events"] = "none";
      },
    },
  });

  // Add the composite container to the Block Manager
  editor.BlockManager.add("booking-container-block", {
    label: "Booking Container",
    content: { type: "booking-container" },
    category: "Travel",
    media: WEB_BUILDER_ICONS.booking,
  });
};

export default travelBlocks;
