import { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ItemCard from "./itemCard";
import { useDrawer } from "context/drawerContext";
import CreateitemForm from "../Createitem/CreateitemForm";
import { Form, Typography } from "antd";
import WarningModal from "components/common/WarningModal";
import { queryClient } from "services/queryClient";
import { QUERY_KEY } from "services/constants";
import { v4 as uuidv4 } from "uuid";

import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import useDragAndDrop from "hooks/useDragAndDrop";
import { PiplinesFolderSVG, PlusSVG, DeleteSVG, EditSVG, SaveSVG } from "assets/jsx-svg";
import "./styles.css";

//must get itemsStages from BE
const { Paragraph } = Typography;

const PipelineTemplateItem = ({ templateItem, deleteTemplate, updateTemplate }) => {
  const [editableStr, setEditableStr] = useState(templateItem.name);

  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    setWidth(ref.current?.clientWidth);
  }, []);

  const reorder = (list, source, destination) => {
    const result = Array.from(list);
    const oldItem = result[destination.index];
    const [removed] = result.splice(source.index, 1);

    //get the order of this item destItemToAddAfter and +1 to submit to BE
    // updateStageItemOrder({ pipelineId: removed.id, newOrder: oldItem.order });

    result.splice(destination.index, 0, removed);

    return result;
  };

  // const { data: stageItems, isPending } = useGetStageItems({
  //   select: (data) => data.data.data.rows,
  // });

  const { data, placeholder, setData, handelDragEnd, handleDragUpdate, handelDragStart } =
    useDragAndDrop(
      !templateItem.stages
        ? []
        : templateItem.stages?.map((item) => ({
            id: uuidv4(),
            ...item,
          })),
      reorder,
      "piplines-droppable",
      width,
    );
  // const mountRef = useRef(false);

  // useEffect(() => {
  //   if (mountRef.current) {
  //     setData(templateItem.stages?.sort((a, b) => a.order - b.order));
  //   } else {
  //     mountRef.current = true;
  //   }
  // }, [templateItem.stages]);
  const DrawerAPI = useDrawer();
  const onClose = () => {
    DrawerAPI.close();
  };

  const [isTemplateEditMode, setIsTemplateEditMode] = useState(false);
  const handelEditTempalteItem = () => {
    setIsTemplateEditMode(true);
  };
  const handelUpdateTempalte = () => {
    setIsTemplateEditMode(false);
    console.log("template items==>", data);
    console.log("templateItem?.name==>", editableStr);
    var objectToEdit = {
      name: editableStr,
      stages: data,
    };
    updateTemplate({ id: templateItem.id, data: objectToEdit });
  };
  const handelCancelUpdateTempalte = () => {
    // queryClient.invalidateQueries({
    //   queryKey: [QUERY_KEY.PIPELINES_TEMPLATES],
    // });
    setEditableStr(templateItem.name);
    setData(templateItem.stages);
    setIsTemplateEditMode(false);
  };
  const [createSagteItemform] = Form.useForm();

  const handelAddNewStageItem = (item) => {
    console.log("new item==>", item);
    const newItem = {
      id: uuidv4(),
      ...item,
    };
    setData([...data, newItem]);
    onClose();
    createSagteItemform.resetFields();
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});

  const onRowDelete = (template) => {
    showDeleteModal();
    setItemToDelete(template);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalOk = () => {
    deleteTemplate(itemToDelete.id);
    setIsDeleteModalOpen(false);
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };
  return (
    <div style={{ border: "1px solid #E5E5EA", borderRadius: 12, padding: 12 }}>
      <WarningModal
        isWarningModalOpen={isDeleteModalOpen}
        handleCancel={handleDeleteModalCancel}
        handleOk={handleDeleteModalOk}
        warningBody={`Are you sure you want to delete this "${itemToDelete?.name}" template?`}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>
          <Paragraph
            editable={
              isTemplateEditMode && {
                onChange: setEditableStr,
              }
            }>
            {editableStr}
          </Paragraph>
          {/* {templateItem?.name} */}
        </div>
        <div style={{ display: "flex", alignItems: "center", columnGap: 8 }}>
          {isTemplateEditMode && (
            <>
              <div
                title="Add stage"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  DrawerAPI.open("37%");
                  DrawerAPI.setDrawerContent(
                    <CreateitemForm
                      onClose={onClose}
                      onAddStageItem={handelAddNewStageItem}
                      form={createSagteItemform}
                    />,
                  );
                }}
                className="create-button">
                <PlusSVG fill="#000" /> New Stage
              </div>
              <span
                title="Save changes"
                className="save-button"
                onClick={handelUpdateTempalte}
                // style={{ cursor: "pointer", color: "red" }}
                // onClick={() => handelDeleteParticipant(record.id)}
              >
                <SaveSVG /> Save changes
              </span>
              <span
                title="Cancel"
                className="cancel-button"
                onClick={handelCancelUpdateTempalte}
                // style={{ cursor: "pointer", color: "red" }}
                // onClick={() => handelDeleteParticipant(record.id)}
              >
                Cancel
              </span>
            </>
          )}
          {!isTemplateEditMode && (
            <>
              <span
                title="Delete"
                className="edit-button"
                onClick={handelEditTempalteItem}
                // style={{ cursor: "pointer", color: "red" }}
                // onClick={() => handelDeleteParticipant(record.id)}
              >
                <EditSVG /> Edit
              </span>
              <span
                title="Delete"
                className="delete-button"
                // style={{ cursor: "pointer", color: "red" }}
                onClick={() => onRowDelete(templateItem)}>
                <DeleteSVG /> Delete
              </span>
            </>
          )}
        </div>
      </div>

      <div ref={ref} className="w-100" style={{ overflow: "auto" }}>
        <DragDropContext
          onDragEnd={handelDragEnd}
          onDragStart={handelDragStart}
          onDragUpdate={handleDragUpdate}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div
                className="piplines-droppable"
                style={{ gap: width / 100, position: "relative" }}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {data?.map((item, index) =>
                  isTemplateEditMode ? (
                    <Draggable key={item.id} draggableId={item.id + ""} index={index}>
                      {(provided, snapshot) => (
                        <NaturalDragAnimation
                          style={provided.draggableProps.style}
                          snapshot={snapshot}>
                          {(style) => (
                            <>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...style,
                                  minWidth: (width - 58) / 5,
                                }}
                                className="piplines-draggable">
                                <ItemCard
                                  isTemplateEditMode={isTemplateEditMode}
                                  cartsData={item}
                                  index={index}
                                  items={data}
                                  setItems={setData}
                                />
                              </div>
                            </>
                          )}
                        </NaturalDragAnimation>
                      )}
                    </Draggable>
                  ) : (
                    <div
                      // ref={provided.innerRef}
                      // {...provided.draggableProps}
                      // {...provided.dragHandleProps}
                      style={{
                        minWidth: (width - 58) / 5,
                      }}
                      className="piplines-draggable">
                      <ItemCard cartsData={item} index={index} items={data} setItems={setData} />
                    </div>
                  ),
                )}
                {placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
export default PipelineTemplateItem;
