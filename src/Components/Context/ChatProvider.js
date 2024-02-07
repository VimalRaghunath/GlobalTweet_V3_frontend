import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"

const ChatContext = createContext();

const ChatProvider = ({children}) => {

    const [user,setUser] = useState();

    return (
        <ChatContext.Provider value={{ user,setUser }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {

    useContext(ChatContext)

}


export default ChatProvider;