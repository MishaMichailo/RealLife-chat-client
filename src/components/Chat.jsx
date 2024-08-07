import { Button, CloseButton, Heading, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import './styles/Chat.css';

export const Chat = ({ messages, chatRoom, sendMessage, closeChat }) => {
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onSendMessage = () => {
        sendMessage(message);
        setMessage("");
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
            <h2>Нажміть на хрестик щоб завершити з'єднання!</h2>
                <div className="chat-header">
                    <Heading size="lg">{chatRoom}</Heading>
                    <CloseButton onClick={closeChat} />
                </div>

                <div className="chat-messages">
                    {messages.map((messageInfo, index) => (
                        <Message messageInfo={messageInfo} key={index} />
                    ))}
                    <span ref={messagesEndRef} />
                </div>
                <div className="chat-input">
                    <Input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Введіть повідомлення"
                    />
                    <Button colorScheme="blue" onClick={onSendMessage}>
                        Відправити
                    </Button>
                </div>
            </div>
        </div>
    );
};