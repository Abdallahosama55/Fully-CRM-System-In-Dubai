export const downloadParticipantsCSVTemplate = (headers) => {
  // Create the CSV content with headers only
  const csvContent = headers.join(",") + "\n";

  // Create a Blob object with the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a temporary anchor element
  const link = document.createElement("a");

  // Set the anchor's href attribute to the URL of the Blob object
  link.href = window.URL.createObjectURL(blob);

  // Set the anchor's download attribute with the desired file name
  link.download = "import_participants.csv";

  // Append the anchor to the document body
  document.body.appendChild(link);

  // Programmatically click the anchor to trigger the download
  link.click();

  // Remove the anchor from the document body
  document.body.removeChild(link);
};

export const isVideoFile = (texture) => {
  if (!texture) return false;
  const arrayOfTexture = texture.split(".");

  return (
    arrayOfTexture.length &&
    ["mp4", "mov", "wmv", "webM", "avi", "flv", "mkv", "mts"].includes(
      arrayOfTexture[arrayOfTexture.length - 1]?.split("?")?.[0],
    )
  );
};

export const getFileExtension = (url) => {
  try {
    const filename = url?.split("/")?.pop(); // Get the filename part
    const queryIndex = filename.indexOf("?"); // Check for query parameters
    const fragmentIndex = filename.indexOf("#"); // Check for fragments

    // Determine the end index of the filename
    const endIndex = Math.min(
      queryIndex !== -1 ? queryIndex : filename.length,
      fragmentIndex !== -1 ? fragmentIndex : filename.length,
    );

    const filenameWithoutParams = filename.slice(0, endIndex); // Remove query parameters and fragments
    const dotIndex = filenameWithoutParams.lastIndexOf("."); // Find the last occurrence of '.'

    if (dotIndex !== -1) {
      const extension = filenameWithoutParams.slice(dotIndex); // Extract the extension
      return extension;
    } else {
      return ""; // No extension found
    }
  } catch (e) {
    console.log(e);
    return "";
  }
};

export const isImage = (url) => {
  const imageExtensions = [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".svg"];
  if (!url) {
    return "";
  }
  const fileExtension = getFileExtension(url);
  return imageExtensions.includes(fileExtension.toLowerCase());
};
