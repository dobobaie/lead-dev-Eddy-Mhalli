import React, { useEffect, useRef } from "react";
import { Message } from "../entities/message.entity";

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messageList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageList.current!.scrollTop = messageList.current!.scrollHeight;
  }, [messages]);

  return (
    <div className="message-list" ref={messageList}>
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          {msg.message}
        </div>
      ))}
    </div>
  );
};
