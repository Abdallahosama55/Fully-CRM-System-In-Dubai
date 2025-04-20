import { createContext, useContext, useState } from "react";

const AgentChatContext = createContext();

export const useAgentChatContext = () => {
  return useContext(AgentChatContext);
};

export default function AgentChatContextProvider({ children }) {
  const [agentChatMessages, setAgentChatMessage] = useState([]);
  return (
    <AgentChatContext.Provider value={[agentChatMessages, setAgentChatMessage]}>
      {children}
    </AgentChatContext.Provider>
  );
}
