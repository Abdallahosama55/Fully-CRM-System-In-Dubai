export default function shortenString(paragraph, maxWidth = 12) {
  if (paragraph.length <= maxWidth) {
    return paragraph;
  } else {
    var truncatedParagraph = paragraph.substring(0, maxWidth - 3) + "...";
    return truncatedParagraph;
  }
}
