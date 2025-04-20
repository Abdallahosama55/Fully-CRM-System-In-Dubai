import { createContext, useContext, useMemo, useState } from "react";

const MetavarseBottomScreenContext = createContext();

export default function Provider({
  children,
  dimensionId,
  dimensionFrames,
  iframeRef,
  dragedMedia,
  dragedParticipant,
  setDimensionFrames,
  setAudioFrames,
  audioFrames,
}) {
  const [allFrames, setAllFrames] = useState([]);
  const [allFrameFolders, setAllFrameFolders] = useState([]);
  const [framesState, setFramesState] = useState({});
  const [currentSelectedFolder, setCurrentSelectedFolder] = useState();
  const [selectedMediaType, setSelectedMediaType] = useState("MEDIA");
  const [isShowingOnlyFavFrames, setIsShowingOnlyFavFrames] = useState(false);

  const allFrameFoldersMap = useMemo(
    () => (allFrameFolders ?? []).reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}),
    [allFrameFolders],
  );

  return (
    <MetavarseBottomScreenContext.Provider
      value={{
        allFrames,
        allFrameFolders,
        allFrameFoldersMap,
        framesState,
        currentSelectedFolder,
        selectedMediaType,
        isShowingOnlyFavFrames,
        dimensionId,
        dimensionFrames,
        iframeRef,
        dragedMedia,
        dragedParticipant,
        setDimensionFrames,
        setAudioFrames,
        audioFrames,
        setAllFrames,
        setAllFrameFolders,
        setFramesState,
        setCurrentSelectedFolder,
        setSelectedMediaType,
        setIsShowingOnlyFavFrames,
      }}>
      {children}
    </MetavarseBottomScreenContext.Provider>
  );
}

export function useMetavarseBottomScreenContext() {
  const context = useContext(MetavarseBottomScreenContext);
  return context;
}
