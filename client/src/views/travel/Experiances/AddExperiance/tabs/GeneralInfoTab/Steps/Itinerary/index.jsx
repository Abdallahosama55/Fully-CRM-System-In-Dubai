import { useState } from "react";
import { Button, Form, message, Skeleton, Typography } from "antd";
import AgendasSection from "./AgendasSection";
import AddAgeda from "./AddAgenda";
import { queryClient } from "services/queryClient";
import useGetAgendas from "services/travel/experiance/ExperianceAgenda/Querys/useGetAgendas";

// images
import no_agendas_img from "assets/images/no_agendas_img.png";
import map_img from "assets/images/map.png";
import { PlusSVG } from "assets/jsx-svg";

// style
import "./styles.css";

const Itinerary = ({ id, next }) => {
  const [isAddAgendaStep, setIsAddAgendaStep] = useState();
  const [editId, setEditId] = useState(null);

  const getAgendasQuery = useGetAgendas(id, {
    enabled: !!id,
    onError: (error) => {
      if (error?.message === "No product agendas found for the given productId") return;
      message.error(error.message);
    },
  });

  const startEdit = (editId) => {
    setEditId(editId);
    setIsAddAgendaStep(true);
  };

  const endEdit = () => {
    setEditId(null);
    setIsAddAgendaStep(false);
    getAgendasQuery.refetch();
  };

  const handelDelete = (id) => {
    queryClient.setQueriesData(
      [getAgendasQuery.key],
      getAgendasQuery.data?.filter((el) => el?.id !== id),
    );
  };

  if (getAgendasQuery.isLoading) {
    return <Skeleton active />;
  }

  return (
    <div>
      <img src={map_img} alt="rocket" />

      <Form
        hidden={true}
        id="form_inside_tab"
        onFinish={() => {
          next();
        }}
      />

      <Typography.Title level={3} className="fz-18 title">
        Create Your Itinerary
      </Typography.Title>
      <Typography.Paragraph className="fz-14 gc sub_title">
        Outline points of interest to help travelers understand the journey and make informed
        bookings
      </Typography.Paragraph>
      {isAddAgendaStep ? (
        <AddAgeda
          endEdit={endEdit}
          productId={id}
          editId={editId}
          back={() => {
            setEditId(null);
            setIsAddAgendaStep(false);
          }}
        />
      ) : getAgendasQuery.data?.length > 0 ? (
        <>
          <AgendasSection
            handelDelete={handelDelete}
            agendas={getAgendasQuery.data}
            onSortEnd={(newData) => {
              queryClient.setQueryData(getAgendasQuery.key, [...newData]);
            }}
            startEdit={startEdit}
            endEdit={endEdit}
            productId={id}
          />
          <Button
            type="primary"
            style={{ marginTop: "1rem" }}
            icon={<PlusSVG color={"currentColor"} />}
            onClick={() => setIsAddAgendaStep(true)}>
            Create Agenda Item
          </Button>
        </>
      ) : (
        <div className="no_agendas_container">
          <img src={no_agendas_img} alt={"No agendas"} />
          <p className="gc fz-16 no_agendas_text">
            Add agenda items to start planning this experience
          </p>
          <Button
            type="primary"
            icon={<PlusSVG color={"currentColor"} />}
            onClick={() => setIsAddAgendaStep(true)}>
            Create Agenda Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default Itinerary;
