import React, { useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
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
        value={text}
        onChange={(e) => setText(e.target.value)}
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
