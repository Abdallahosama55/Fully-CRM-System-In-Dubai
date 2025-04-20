import AddSlide from "./AddSlide";

export default function EditSlide({ editSlideData, setEditSlideModal }) {
  return <AddSlide setAddSlideModal={setEditSlideModal} defaultValues={editSlideData} />;
}
