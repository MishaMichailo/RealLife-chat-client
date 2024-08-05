import { Button, CloseButton, Heading, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";

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
        <div className="w-1/2 bg-white p-8 rounded shadow-lg">
            <div className="flex flex-row justify-between mb-5">
                <Heading size="lg">{chatRoom}</Heading>
                <CloseButton onClick={closeChat} />
            </div>

            <div className="flex flex-col overflow-auto h-96 gap-3 pb-3">
                {messages.map((messageInfo, index) => (
                    <Message messageInfo={messageInfo} key={index} />
                ))}
                <span ref={messagesEndRef} />
            </div>
            <div className="flex gap-3 mt-4">
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
    );
};
