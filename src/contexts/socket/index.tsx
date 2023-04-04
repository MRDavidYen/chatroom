"use client"

import { createContext, useEffect } from "react";
import { SocketContext, SocketContextProperties } from "src/typing/context/socket";
import io from "socket.io-client";
import { fetchWithBody } from "src/endpoints";

const SocketContext = createContext<SocketContext>({})

const SocketProvider = ({ ...props }: SocketContextProperties) => {
    const socket = io("/")

    socket.on("connect", () => {
        console.log("socket connected")
    })

    return (
        <SocketContext.Provider value={{
            socket
        }}>
            {props.children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }