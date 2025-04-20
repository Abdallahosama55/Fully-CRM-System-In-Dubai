export default function filterOption() {
  console.log("option?.children", option?.children.props.children[1].props.children[1]);
  return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
}
