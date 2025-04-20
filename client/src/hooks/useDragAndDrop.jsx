import { useState, useCallback } from "react";
import { isEmpty } from "utils";

const useDragAndDrop = (initialData, reorder, container_class_name, width) => {
  const [data, setData] = useState(initialData);
  const [activeDragIndex, setActiveDragIndex] = useState(-1);
  const [placeholderProps, setPlaceholderProps] = useState({});

  const handelDragEnd = (result) => {
    const { source, destination } = result;
    setActiveDragIndex(-1);
    setPlaceholderProps({});
    if (!destination || !source) return;
    setData((prev) => reorder(prev, source, destination));
  };

  const handelDragStart = (event) => {
    console.log(event, "WWWWWWWWWW");
    setActiveDragIndex(event.source.index);
    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY: width
        ? parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop)
        : parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
          [...draggedDOM.parentNode.children].slice(0, sourceIndex).reduce((total, curr) => {
            const style = curr.currentStyle || window.getComputedStyle(curr);
            const marginBottom = parseFloat(style.marginBottom);
            return total + curr.clientHeight + marginBottom;
          }, 0),
      clientX: width
        ? parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
          [...draggedDOM.parentNode.children].slice(0, sourceIndex).reduce((total, curr) => {
            return total + curr.clientWidth + width / 100;
          }, 0)
        : parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft),
    });
  };

  const handleDragUpdate = (event) => {
    if (!event.destination) {
      return;
    }

    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...draggedDOM.parentNode.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY: width
        ? parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop)
        : parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
          updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
            const style = curr.currentStyle || window.getComputedStyle(curr);
            const marginBottom = parseFloat(style.marginBottom);
            return total + curr.clientHeight + marginBottom;
          }, 0),
      clientX: width
        ? parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft) +
          updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
            return total + curr.clientWidth + width / 100;
          }, 0)
        : parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft),
    });
  };

  const getDraggedDom = useCallback((draggableId) => {
    const domQuery = `.${container_class_name} [data-rbd-drag-handle-draggable-id='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  }, []);

  return {
    data,
    activeDragIndex,
    placeholderProps,
    placeholder: !isEmpty(placeholderProps) ? (
      <div
        className="placeholder"
        style={{
          borderRadius: "8px",
          position: "absolute",
          backgroundColor: "#E5E5EA",
          top: placeholderProps.clientY,
          left: placeholderProps.clientX,
          height: placeholderProps.clientHeight,
          width: placeholderProps.clientWidth,
        }}
      />
    ) : (
      ""
    ),
    setData,
    handelDragEnd,
    handelDragStart,
    handleDragUpdate,
  };
};

export default useDragAndDrop;
