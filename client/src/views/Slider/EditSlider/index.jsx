import HeaderPage from "./components/HeaderPage";
import ItemCard from "./components/ItemCard";
import Box from "components/Box";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { SliderGetStore, SliderProvider } from "./sliderStore";
import NoDataToShowComponent from "views/Customers/ViewCustomer/Components/NewStyleComponents/NavigationPages/Components/NoDataToShowComponent";
import useGetSlider from "services/Sliders/Queries/useGetSlider";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LoadingPage from "components/common/LoadingPage";
import ButtonSaveData from "./components/SaveDataButton";
import { formatGroupItem, formatResponse } from "./utils";
const EditSlider = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSlider(id, {
    select: (data) => {
      return { ...data.data.data, sliderItems: formatResponse(data.data.data.sliderItems) };
    },
  });
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  const onDragEnd = (result, list, setData) => {
    try {
      const destIndex = result?.destination?.index;
      const srcIndex = result?.source?.index;
      if (isNaN(destIndex) || isNaN(srcIndex) || destIndex === srcIndex) return;

      const newList = Array.from(list);
      const [removed] = newList.splice(srcIndex, 1); // Remove the dragged item from its original position
      newList.splice(destIndex, 0, removed); // Insert the dragged item at the destination index

      setData(newList);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section className="edit-slider">
      <SliderProvider initialState={{ list: data.sliderItems }}>
        <Flex
          align="center"
          style={{ marginBottom: "32px", marginTop: "24px" }}
          justify="space-between">
          <Flex gap={16} align="center">
            <Box
              onClick={() => navigate(-1)}
              sx={{
                cursor: "pointer",
                border: "1px solid #EBEBED",
                paddingInline: 4,
                borderRadius: 6,
              }}>
              <ArrowLeftOutlined
                style={{
                  fontSize: "12px",
                  color: "#272942",
                }}
              />
            </Box>
            <Typography.Text style={{ fontWeight: 600, fontSize: "16px" }}>
              {data?.slider?.name}
            </Typography.Text>
          </Flex>
          <ButtonSaveData></ButtonSaveData>
        </Flex>

        <HeaderPage />

        <SliderGetStore>
          {(list, setItems) => {
            if (list.length === 0) return <NoDataToShowComponent></NoDataToShowComponent>;
            return (
              <DragDropContext onDragEnd={(result) => onDragEnd(result, list, setItems)}>
                <Droppable droppableId="slider_item">
                  {(provided) => (
                    <div
                      style={{
                        gap: 8,
                        marginTop: "16px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      {...provided.droppableProps}
                      ref={provided?.innerRef}>
                      {(formatGroupItem(list) || []).map((item, index) => {
                        return (
                          <Draggable key={item.id} draggableId={item.id + ""} index={index}>
                            {(provided) => <ItemCard key={item.id} provided={provided} {...item} />}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            );
          }}
        </SliderGetStore>
      </SliderProvider>
    </section>
  );
};

export default EditSlider;
