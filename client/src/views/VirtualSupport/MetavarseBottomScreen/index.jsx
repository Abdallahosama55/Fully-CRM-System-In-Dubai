import MetaverseBottomScreen from "./MetavarseBottomScreen";
import Provider from "./context/metavarseBottomScreenContext";

const MetaverseBottom = ({
  dimensionId,
  dimensionFrames,
  iframeRef,
  dragedMedia,
  dragedParticipant,
  setDimensionFrames,
  setAudioFrames,
  audioFrames,
}) => {
  return (
    <Provider
      dimensionId={dimensionId}
      dimensionFrames={dimensionFrames}
      iframeRef={iframeRef}
      dragedMedia={dragedMedia}
      dragedParticipant={dragedParticipant}
      setDimensionFrames={setDimensionFrames}
      setAudioFrames={setAudioFrames}
      audioFrames={audioFrames}>
      <MetaverseBottomScreen />
    </Provider>
  );
};
export default MetaverseBottom;
