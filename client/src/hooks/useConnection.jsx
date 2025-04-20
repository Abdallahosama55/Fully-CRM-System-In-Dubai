import userContext from "context/userContext";
import React, { createContext, useContext, useState } from "react";
import { useCallback } from "react";
import LivekitService from "services/livekit.service";
import generateAgentToken from "utils/agentToken";

const ConnectionContext = createContext(undefined);

export const ConnectionProvider = ({ children }) => {
  const { user } = useContext(userContext);
  const [connectionDetails, setConnectionDetails] = useState({
    wsUrl: "",
    token: "",
  });

  const connect = useCallback(
    async (meetingId, isHost, isAgentMeeting, deskId) => {
      let token = "";
      let url = "";
      if (isAgentMeeting) {
        url = "wss://vverse-92f1iavl.livekit.cloud";
        const { accessToken } = await generateAgentToken(deskId);
        token = accessToken;
      } else {
        url = "wss://livekit.vverse.co";
        const res = await LivekitService.generateToken({
          participant: user.id + "web",
          room: `${+meetingId}`,
          metadata: JSON.stringify({
            id: user.id,
            profileImage: user.profileImage,
            isHost,
          }),
          name: user.fullName,
        });
        token = res.data.data.jwtAccessToken;
      }
      setConnectionDetails({ wsUrl: url, token, isAgentMeeting });
    },
    [user],
  );

  return (
    <ConnectionContext.Provider
      value={{
        wsUrl: connectionDetails.wsUrl,
        token: connectionDetails.token,
        isAgentMeeting: connectionDetails.isAgentMeeting,
        connect,
      }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = React.useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};
