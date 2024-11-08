import React, { useState } from "react";

interface MessageInputProps {
  onSend: (message: string, onMessageSent: () => void) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = () => {
    if (message.trim()) {
      setIsLoading(true);
      onSend(message, () => setIsLoading(false));
      setMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
      />
      {isLoading === true ? (
        <button>
          <div className="loader"></div>
        </button>
      ) : (
        <button onClick={handleSend}>Send</button>
      )}
    </div>
  );
};
