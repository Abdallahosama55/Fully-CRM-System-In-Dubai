import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Col, List, message, Row } from "antd";
import AgendaListSVG from "assets/jsx-svg/AgendaListSVG";
import AgendaCard from "./AgendaCard";
import useSortAgendas from "services/travel/experiance/ExperianceAgenda/Mutations/useSortAgendas";

const AgendasSection = ({ agendas, onSortEnd, startEdit, endEdit, productId, handelDelete }) => {
  const { sortAgendas, isPending } = useSortAgendas({
    onError: (error) => message.error(error.message),
  });

  const handelDrageEnd = (result) => {
    if (isPending) {
      return;
    }
    const destIndex = result?.destination?.index;
    const srcIndex = result?.source?.index;
    if (isNaN(destIndex) || isNaN(srcIndex) || destIndex === srcIndex) return;

    let newAgendas = [...agendas];
    let temp = newAgendas[destIndex];
    newAgendas[destIndex] = newAgendas[srcIndex];
    newAgendas[srcIndex] = temp;
    sortAgendas({
      sortingData: newAgendas.map((agenda, index) => ({ agendaId: agenda.id, index: index + 1 })),
      productId,
    });

    onSortEnd(newAgendas);
  };

  return (
    <DragDropContext onDragEnd={handelDrageEnd}>
      <Droppable droppableId="agendas" direction="vertical">
        {(provided) => (
          <div
            className="agendas-list"
            style={{ border: "1px solid #D1D1D6", borderRadius: "10px" }}
            {...provided.droppableProps}
            ref={provided.innerRef}>
            <List
              loading={isPending}
              {...provided.droppableProps}
              ref={provided.innerRef}
              header={
                <Row align="middle" gutter={[8, 0]} style={{ paddingInline: "24px" }}>
                  <Col>
                    <Row align="middle">
                      <AgendaListSVG />
                    </Row>
                  </Col>
                  <Col>Agenda List</Col>
                </Row>
              }
              // bordered
              dataSource={agendas}
              renderItem={(agenda, index) => {
                return (
                  <Draggable key={agenda.id} draggableId={`${agenda.id}`} index={index}>
                    {(provided) => (
                      <div
                        style={{ backgroundColor: "#FFF" }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <AgendaCard {...{ handelDelete, agenda, endEdit, startEdit }} />
                      </div>
                    )}
                  </Draggable>
                );
              }}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default AgendasSection;
