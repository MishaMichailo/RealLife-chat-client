import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import CreateRoom from "./components/CreateRoom ";
import JoinRoom from "./components/JoinRoom";
import {Chat} from "./components/Chat";
import './App.css';

const App = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatRoom, setChatRoom] = useState("");
    const [notification, setNotification] = useState(""); 

    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const handleRouteChange = () => {
            if (location.pathname !== "/chat" && connection) {
                closeChat();
            }
        };

        handleRouteChange(); 
        return () => {
            handleRouteChange();
        };
    }, [location.pathname]);

    const createRoom = async (roomName, password) => {
        try {
            const response = await fetch("https://real-chat20240807131154.azurewebsites.net/api/Room/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ roomName, password })
            });

            if (response.ok) {
                setNotification("Room created successfully!");
                navigate("/"); 
            } else if (response.status === 409) {
                setNotification("Room already exists.");
            } else {
                setNotification("Error creating room");
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const joinRoom = async (userName, roomName, password) => {
        const connection = new HubConnectionBuilder()
            .withUrl("https://real-chat20240807131154.azurewebsites.net/chat")
            .withAutomaticReconnect()
            .build();
    
        connection.on("ReceiveMessage", (userName, message) => {
            setMessages((messages) => [...messages, { userName, message }]);
        });
    
        connection.on("ReceiveMessageHistory", (messageHistory) => {
            setMessages(messageHistory);
        });
    
        try {
            await connection.start();
            await connection.invoke("JoinRoom", userName, roomName, password);
            setConnection(connection);
            setChatRoom(roomName);
            navigate("/chat");
        } catch (error) {
            console.log("Error joining room:", error);
            setNotification("Failed to join room. Please check your credentials.");
        }
    };

    const sendMessage = async (message) => {
        if (connection) {
            try {
                await connection.invoke("SendMessage", message);
            } catch (error) {
                console.log("Error sending message: ", error);
            }
        }
    };

    const closeChat = async () => {
        if (connection) {
            try {
                await connection.stop();
                navigate("/");
            } catch (error) {
                console.log("Error closing chat: ", error);
            } finally {
                setConnection(null);
            }
        }
    };

    return (
        <div className="min-h-screen">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/create">Create Room</Link>
                <Link to="/join">Join Room</Link>
            </nav>
            <div className="main-content">
                {notification && <div className="notification">{notification}</div>} 
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <h1>Welcome to the Chat App</h1>
                            </div>
                        }
                    />
                    <Route path="/create" element={<CreateRoom createRoom={createRoom} />} />
                    <Route path="/join" element={<JoinRoom joinRoom={joinRoom} />} />
                    <Route
                        path="/chat"
                        element={
                            <Chat
                                messages={messages}
                                sendMessage={sendMessage}
                                closeChat={closeChat}
                                chatRoom={chatRoom}
                            />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default App;
