import React from "react";
import Zoom from "react-medium-image-zoom";
import "./gallery.css";
import "react-medium-image-zoom/dist/styles.css";

const Media = ({ settings }) => {
  const { title } = settings || [];
  const { width, height, margin, padding, imgHeight, columns, borderRadius } =
    settings;

  const GalleryStyle = {
    ...(height && { height: `${height}px` }),
  };
  const style = {
    ...(width && { width: `${width}px` }),
    ...(margin && { margin: `${margin}px` }),
    ...(height && { height: `${imgHeight}` }),
    ...(padding && { padding: `${padding}px` }),
    ...(borderRadius && { borderRadius: `${borderRadius}px` }),
  };

  return (
    <div style={GalleryStyle} className="p-4 flex-1">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className={` grid grid-cols-${columns} gap-4`}>
        {settings?.images?.length > 0 &&
          settings?.images?.map((image, index) => (
            <Zoom>
              <div
                key={index}
                style={style}
                className="img-wrapper relative w-24 h-24 border border-gray-300 rounded shadow-md"
              >
                <img
                style={{borderRadius:borderRadius+'px'}}
                  src={image}
                  alt="Gallery"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </Zoom>
          ))}
      </div>
    </div>
  );
};

export default Media;
