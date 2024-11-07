import { useRef, useState } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Message } from "../entities/message.entity";

interface ChatWelcome {
  onRegister: (message: string) => void;
}

export const Welcome: React.FC<ChatWelcome> = ({ onRegister }) => {
  const [messages] = useState<Message[]>([]);

  const userRegistering = useRef(false);

  return (
    <div className="chat">
      <h2>Welcome to this free Chat with AI</h2>
      <p>Please enter your name</p>
      {userRegistering.current === true ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <MessageList messages={messages} />
          <MessageInput onSend={onRegister} />
        </div>
      )}
    </div>
  );
};
