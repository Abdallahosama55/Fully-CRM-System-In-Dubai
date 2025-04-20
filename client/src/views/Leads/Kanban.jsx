import { useState, useEffect, useRef } from "react";
import { columnsFromBackend } from "./utlits";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { Row, Typography, Select, Button, Col, Form } from "antd";
import { DeleteSVG, PlusSVG } from "assets/jsx-svg";
import useUpdateLeadStage from "services/Leads/Mutations/useUpdateLeadStage";
import { addOpacityToColor } from "utils/color-picker";
import useDeleteLead from "services/Leads/Mutations/useDeleteLead";
import useGetLeads from "services/Leads/Querys/useGetLeads";
import LeadService from "services/Leads/Leads.service";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetPipelineTemplates from "services/pipelineTemplate/Querys/useGetPipelineTemplates";
import useGetCommonData from "services/Leads/Querys/useGetCommonData";
import { useDrawer } from "context/drawerContext";
import AddEditNewLeadForm from "./AddEditNewLeadForm";
import useGetPipelines from "services/pipelineTemplate/Querys/useGetPipelines";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateitemForm from "views/Piplines/components/Createitem/CreateitemForm";
import useAddStageItem from "services/Pipelines/Mutations/useAddStageItem";
import StageCard from "./StageCard";
import { useNotification } from "context/notificationContext";
import LoadingPage from "components/common/LoadingPage";
import useGetSourcesOfEventPipeline from "services/PipelineSources/Querys/useGetSourcesOfEventPipeline";
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import useUpdateStageItemOrder from "services/Pipelines/Mutations/useUpdateStageItemOrder";
import CRMBoard from "components/crm-board";
import useIsMobile from "hooks/useIsMobile";
function stringToNumber(str) {
  try {
    let num = parseFloat(str);
    return isNaN(num) ? 0 : num;
  } catch {
    return 0;
  }
}

const itemsPerPage = 100;
const fetchKanbanLeads = async ({ pageParam = 1 }) => {
  // Fetch data using nextPageCursor

  const response =
    pageParam && (await LeadService.getLeads({ page: pageParam, pageSize: itemsPerPage }));

  return {
    ...response.data.data?.stages,
    prevOffset: pageParam,
    maxStageTotal: response.data.data?.maxStageTotal,
  };
};

const Kanban = ({ UrlPiplineId }) => {
  const navigate = useNavigate();
  const { openNotificationWithIcon } = useNotification();
  const isMobile = useIsMobile();
  const [selectedPipelineId, setSelectedPipelineId] = useState(UrlPiplineId);
  const [selectedSource, setSelectedSource] = useState();

  const finalDataColumnAndItems = [];
  const [mockColumns, setMockColumns] = useState([]);

  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);
  const [reloadState, setReloadState] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { updateStageItemOrder } = useUpdateStageItemOrder();
  useEffect(() => {
    setIsPageLoading(true);
    LeadService.getLeads({
      page: 1,
      pageSize: itemsPerPage,
      pipelineId: selectedPipelineId || null,
      source: selectedSource || null,
    })
      .then((res) => {
        setIsPageLoading(false);

        const leadsColumns = res.data.data.stages;
        leadsColumns.map((commingLeadColumn) => {
          const columnIndex = finalDataColumnAndItems.findIndex(
            (item) => item.id === commingLeadColumn.id,
          );

          if (finalDataColumnAndItems.length != 0 && columnIndex !== -1) {
            commingLeadColumn?.items?.forEach((newItem) => {
              if (
                !finalDataColumnAndItems[columnIndex].items.some((item) => item.id === newItem.id)
              ) {
                finalDataColumnAndItems[columnIndex].items.push(newItem);
              }
            });

            // finalData.find(item=>item.id==leadColumn.id).items=[...finalData.items,...leadColumn.items]
          } else {
            finalDataColumnAndItems.push(commingLeadColumn);
          }
        });
        console.log("finalDataColumnAndItems==>", finalDataColumnAndItems);
        setMockColumns(finalDataColumnAndItems?.sort((a, b) => a.order - b.order));
      })
      .catch((err) => {
        setIsPageLoading(false);
        console.log(err);
      });
  }, [selectedPipelineId, selectedSource, reloadState]);
  const fetchMoreData = () => {
    LeadService.getLeads({
      page: index,
      pageSize: itemsPerPage,
      pipelineId: selectedPipelineId || null,
      source: selectedSource || null,
    })
      .then((res) => {
        // setItems((prevItems) => [...prevItems, ...res.data]);

        const leadsColumns = res.data.data.stages;
        // setItems(res.data);
        leadsColumns.map((commingLeadColumn) => {
          const columnIndex = mockColumns.findIndex((item) => item.id === commingLeadColumn.id);

          if (mockColumns.length != 0 && columnIndex !== -1) {
            var newListItems = [];
            commingLeadColumn?.items?.forEach((newItem) => {
              newListItems.push(newItem);
            });
            setMockColumns(
              mockColumns
                .map((column) => {
                  if (column.id == commingLeadColumn.id) {
                    return {
                      ...column,
                      items: [...column.items, ...newListItems],
                    };
                  } else {
                    return { ...column };
                  }
                })
                .sort((a, b) => a.order - b.order),
            );
          } else {
          }
        });
        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => {
        console.log(err);
      });

    setIndex((prevIndex) => prevIndex + 1);
  };
  const queryClient = useQueryClient();
  let isDoNotShowPopoverAgain = localStorage.getItem("isDoNotShowPopoverAgainSelected");

  const [showDelete, setShowDelete] = useState(false);
  const [isDoNotShowPopoverAgainSelected, setIsDoNotShowPopoverAgainSelected] = useState(false);
  const [canOpenPopover, setCanOpenPopover] = useState(() => {
    if (isDoNotShowPopoverAgain == "true") return false;
    return true;
  });
  const { updateLeadStage, isPending } = useUpdateLeadStage({
    onError: (error) => {
      var { errors } = error?.response.data;
    },
    onSuccess: (data, payload) => {
      queryClient.invalidateQueries({ queryKey: ["kanbanLeads"] });
    },
  });

  const handelPopoverClose = () => {
    localStorage.setItem("isDoNotShowPopoverAgainSelected", isDoNotShowPopoverAgainSelected);
    setCanOpenPopover(false);
  };
  const reorderStage = (list, source, destination) => {
    const result = Array.from(list);
    const oldItem = result[destination.index];
    const [removed] = result.splice(source.index, 1);

    //get the order of this item destItemToAddAfter and +1 to submit to BE
    // updateStageItemOrder({ pipelineId: removed.id, newOrder: oldItem.order });
    result.splice(destination.index, 0, removed);
    updateStageItemOrder({ stageId: removed.id, newOrder: oldItem?.order });

    return result;
  };
  const onDragEnd = (result, columns, setColumns) => {
    const { source, destination } = result;
    setShowDelete(false);
    if (!result.destination) return; //drag anywhere

    //drop to the same place that item draged
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    //start order column
    if (result.type === "COLUMN") {
      if (!destination || !source) return;
      setColumns(reorderStage(columns, source, destination));
      return;
    }

    //end order column

    // if (result.destination.droppableId === "detele-card-Id") {
    //   const sourceColumn = columns.filter(
    //     (item) => item.id.toString() === result.source.droppableId,
    //   )[0];

    //   const sourceItems = [...sourceColumn.items];
    //   const itemToDelete = sourceItems[result.source.index];

    //   const otherColumns = columns.filter(
    //     (item) => item.id.toString() !== result.source.droppableId,
    //   );

    //   sourceItems.splice(result.source.index, 1);
    //   const newsourceColumn = { ...sourceColumn, items: sourceItems };
    //   setColumns([...otherColumns, newsourceColumn].sort((a, b) => a.order - b.order));
    //   deleteLead({ leadId: itemToDelete.id });

    //   return;
    // }
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.filter((item) => item.id.toString() === source.droppableId)[0];
      const destColumn = columns.filter(
        (item) => item.id.toString() === destination.droppableId,
      )[0];

      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      var sourceLead = removed;
      var destStageId = destination.droppableId;
      var destOrder = destination.index + 1;
      const destLead = destItems[destination.index];

      destItems.splice(destination.index, 0, removed);
      //start
      var newSourceColumn = columns.filter((item) => item.id.toString() === source.droppableId)[0];
      var newSourceColumnObj = { ...newSourceColumn, items: sourceItems };

      var newDestinationColumn = columns.filter(
        (item) => item.id.toString() === destination.droppableId,
      )[0];
      var newDestinationColumnObj = { ...newDestinationColumn, items: destItems };

      const otherColumns = columns.filter(
        (item) =>
          item.id.toString() !== source.droppableId &&
          item.id.toString() !== destination.droppableId,
      );
      //remove-->
      newSourceColumnObj.total -= 1;
      newDestinationColumnObj.total += 1;
      try {
        const sourceItems = [...sourceColumn.items];
        const itemToMove = sourceItems[result.source.index];

        newSourceColumnObj.budget =
          stringToNumber(newSourceColumnObj.budget) - stringToNumber(itemToMove.budget);
        newDestinationColumnObj.budget =
          stringToNumber(newDestinationColumnObj.budget) + stringToNumber(itemToMove.budget);
      } catch { }

      setColumns(
        [...otherColumns, newSourceColumnObj, newDestinationColumnObj].sort(
          (a, b) => a.order - b.order,
        ),
      );
      const stageId = destination.droppableId;
      if (!destLead) {
        const obj = {
          destStageId: stageId,
          sourceDeal: {
            id: sourceLead.id,
            order: sourceLead.order,
            pipelineStageId: sourceLead.pipelineStageId,
            sortActionDate: sourceLead.sortActionDate,
          },
        };
        updateLeadStage(obj);
      } else {
        const obj = {
          destStageId: stageId,
          sourceDeal: {
            id: sourceLead.id,
            order: sourceLead.order,
            pipelineStageId: sourceLead.pipelineStageId,
            sortActionDate: sourceLead.sortActionDate,
          },

          destDeal: {
            id: destLead.id,
            order: destLead.order,
            pipelineStageId: destLead.pipelineStageId,
            sortActionDate: destLead.sortActionDate,
          },
        };
        updateLeadStage(obj);
      }
    } else {
      //here the move in the same column
      const column = columns.filter((item) => item.id.toString() === source.droppableId)[0];
      const copiedItems = [...column.items];

      const [removed] = copiedItems.splice(source.index, 1);
      const destLeadItem = copiedItems[destination.index];
      const sourceLeadItem = removed;

      copiedItems.splice(destination.index, 0, removed);
      const sourceColumn = columns.filter((item) => item.id.toString() === source.droppableId)[0];
      sourceColumn.items = copiedItems;

      const stageId = source.droppableId;
      const obj = {
        destStageId: stageId,
        sourceDeal: {
          id: sourceLeadItem.id,
          order: sourceLeadItem.order,
          pipelineStageId: sourceLeadItem.pipelineStageId,
          sortActionDate: sourceLeadItem.sortActionDate,
        },
        destDeal: {
          id: destLeadItem.id,
          order: destLeadItem.order,
          pipelineStageId: destLeadItem.pipelineStageId,
          sortActionDate: destLeadItem.sortActionDate,
        },
      };
      updateLeadStage(obj);
    }
  };

  const findMaxLength = () => {
    var maxLength = 0;
    finalDataColumnAndItems.map((item) => {
      if (maxLength < item.items?.length) {
        maxLength = item.items.length;
      }
    });
    return maxLength;
  };
  const { data: pipelinesOptions } = useGetPipelines({
    select: (data) => data.data.data,
  });
  const onChangePipeline = (value) => {
    setSelectedPipelineId(value);
    navigate("/crm/pipelines/" + value);
  };

  const {
    data: leadSources,
    refetch: refetchSources,
    isPending: isPendingGetSources,
  } = useGetSourcesOfEventPipeline(
    selectedPipelineId,
    {},
    {
      select: (data) => data?.data?.data,
    },
  );
  const onChangeSource = (value) => {
    setSelectedSource(value);
  };
  const DrawerAPI = useDrawer();

  const onCloseDrawer = () => {
    DrawerAPI.close();
  };
  const handelOpenAddLeadDrawer = () => {
    DrawerAPI.open("70%");
    DrawerAPI.setDrawerContent(
      <AddEditNewLeadForm
        onClose={onCloseDrawer}
        selectedPipelineId={selectedPipelineId}
        reloadState={reloadState}
        setReloadState={setReloadState}
      />,
    );
  };
  const [createSagteItemform] = Form.useForm();
  const onAddStageClose = () => {
    DrawerAPI.close();
    createSagteItemform.resetFields();
  };
  const { addStageItem, isAddStagePending } = useAddStageItem({
    onError: (error) => { },
    onSuccess: (data, payload) => {
      onAddStageClose();
      setReloadState(!reloadState);
      openNotificationWithIcon("success", "Added successfully");
    },
  });

  const handelAddNewStageItem = (values) => {
    const objectToAdd = {
      pipelineId: selectedPipelineId,
      ...values,
    };
    addStageItem(objectToAdd);
  };

  const handleOnLeadClick = (leadData) => {
    DrawerAPI.open("70%");
    DrawerAPI.setDrawerContent(
      <AddEditNewLeadForm
        leadStoredData={leadData}
        onClose={onCloseDrawer}
        selectedPipelineId={selectedPipelineId}
        reloadState={reloadState}
        setReloadState={setReloadState}
      />,
    );
  };

  return (
    <>
      <Form requiredMark={false}>
        <div style={!isMobile ? { display: "flex", justifyContent: "space-between" } : {}}>
          <div style={{ display: "flex", columnGap: 5 }}>
            <Form.Item
              initialValue={
                pipelinesOptions && pipelinesOptions.length > 0 ? UrlPiplineId : undefined
              }>
              <Select
                className="selected-pipeline"
                placeholder="Select a Pipeline"
                // defaultValue={UrlPiplineId }
                showSearch={true}
                filterOption={(input, option) =>
                  option.label?.toLowerCase().includes(input.toLowerCase())
                }
                style={{ width: 200 }}
                value={{
                  value: pipelinesOptions?.filter((item) => item.id == selectedPipelineId)[0]?.id,
                  label: pipelinesOptions?.filter((item) => item.id == selectedPipelineId)[0]?.name,
                }}
                onChange={onChangePipeline}
                options={pipelinesOptions?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}></Select>
            </Form.Item>
            <Select
              placeholder="Select a source"
              // defaultValue={templates?.length > 0 ? templates[0].id : undefined}
              style={{ width: 200 }}
              onChange={onChangeSource}>
              <Select.Option value={""}>All</Select.Option>
              {leadSources?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ display: "flex", columnGap: 12, alignItems: "center", marginBottom: 25 }}>
            <div
              onClick={() => {
                DrawerAPI.open("37%");
                DrawerAPI.setDrawerContent(
                  <CreateitemForm
                    onClose={onAddStageClose}
                    onAddStageItem={handelAddNewStageItem}
                    form={createSagteItemform}
                    isAddPending={isAddStagePending}
                  />,
                );
              }}
              style={{ cursor: "pointer" }}
              className="create-button">
              <PlusSVG fill="#000" /> New Stage
            </div>

            <Button
              onClick={handelOpenAddLeadDrawer}
              style={{ background: "#272942", color: "#fff", float: "right" }}>
              <Row align="middle" gutter={[8, 0]} wrap={false}>
                <Col>
                  <Row align="middle">
                    <PlusSVG />
                  </Row>
                </Col>
                <Col>New Deal</Col>
              </Row>
            </Button>
          </div>
        </div>
      </Form>
      {isPageLoading ? (
        <LoadingPage />
      ) : (
        <DragDropContext
          onDragStart={(result) => {
            console.log("rrrr", result);
            if (result.type != "COLUMN") {
              setShowDelete(true);
            }
          }}
          onDragEnd={(result) => onDragEnd(result, mockColumns, setMockColumns)}>
          <Droppable
            isCombineEnabled={true}
            droppableId="board"
            type="COLUMN"
            ignoreContainerClipping={false}
            direction="horizontal">
            {(provided) => (
              <div className="scroll-outer-div">
                <div
                  className="task-column-styles"
                  ref={provided.innerRef}
                  {...provided.droppableProps}>
                  {console.log("mockColumns==>", mockColumns)}
                  {mockColumns.map((column, columnIndex) => {
                    console.log('column :>> ', column);
                    console.log('columnIndex :>> ', columnIndex);
                    console.log('columnIndex === mockColumns?.length - 1 :>> ', columnIndex === mockColumns?.length - 1);
                    return (
                      <Draggable key={column.id} draggableId={column.id + ""} index={columnIndex}>
                        {(provided, snapshot) => (
                          <NaturalDragAnimation
                            style={provided.draggableProps.style}
                            snapshot={snapshot}>
                            {(style) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={{ ...style, minWidth: "200px", maxWidth: 220 }}
                              >
                                <StageCard
                                  isHasPrev={columnIndex <= mockColumns?.length - 1 && columnIndex !== 0 }
                                  isHasNext={columnIndex < mockColumns?.length - 1}
                                  setReloadState={setReloadState}
                                  cartsData={column}
                                  items={mockColumns}
                                  setItems={setMockColumns}
                                  dragHandleProps={{ ...provided.dragHandleProps }}
                                />
                                <Droppable key={column.id} droppableId={column.id + ""}>
                                  {(provided) => (
                                    <div
                                      className="task-list"
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}>
                                      {column.items?.map((item, index) => (
                                        <TaskCard
                                          handleOnLeadClick={() => handleOnLeadClick(item)}
                                          key={item.id}
                                          item={item}
                                          index={index}
                                          popover={{
                                            canOpen: canOpenPopover,
                                            isDoNotShowAgainSelected:
                                              isDoNotShowPopoverAgainSelected,
                                            setIsDoNotShowAgainSelected:
                                              setIsDoNotShowPopoverAgainSelected,
                                            handelClose: handelPopoverClose,
                                          }}
                                        />
                                      ))}
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                              </div>
                            )}
                          </NaturalDragAnimation>
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}
                  <InfiniteScroll
                    // dataLength={finalData?.length>0&&finalData[0].items?finalData[0].items.length:0}
                    dataLength={findMaxLength()}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loading={<div>Loading...</div>}>
                    <div></div>
                  </InfiniteScroll>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
};

export default Kanban;
