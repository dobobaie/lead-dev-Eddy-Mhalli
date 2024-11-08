import { useEffect, useState } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { MessengerList } from "./MessengerList";
import { Message } from "../entities/message.entity";
import messengerRepository from "../repositories/messenger.repository";

export const Chat = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messengerSelected, selectMessenger] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!messengerSelected) {
      return;
    }

    setIsLoading(true);
    messengerRepository
      .getMessages(messengerSelected)
      .then((messages: Message[]) => {
        setMessages(messages);
        setIsLoading(false);
      });
  }, [messengerSelected]);

  const addMessage = (message: string, onMessageSent: () => void) => {
    // NOTE: set message for user
    messages.push({
      message,
      sender: "user",
      createdAt: new Date(),
    });
    setMessages(messages);
    onMessageSent();

    // NOTE: set message for assistant
    const messagesCopy = [...messages];
    let messageAssistant = "";
    const messageAssistantTracking = {
      message: messageAssistant,
      sender: "assistant",
      createdAt: new Date(),
    };
    setMessages([...messages, messageAssistantTracking]);

    // NOTE: ask assistant to reply
    messengerRepository
      .sendMessageToAssistant(messengerSelected!, { message })
      .then((reader: ReadableStreamDefaultReader<Uint8Array>) => {
        reader!.read().then(function pump({ done, value }): any {
          if (done) {
            return;
          }

          // NOTE: update the current assistant message
          const valueMessage = new TextDecoder().decode(value);
          messageAssistant += valueMessage;
          setMessages([
            ...messagesCopy,
            Object.assign({}, messageAssistantTracking, {
              message: messageAssistant,
            }),
          ]);
          return reader!.read().then(pump);
        });
      });
  };

  return (
    <div className="chat">
      <h2>Ask me everything !</h2>
      <div className="chat-container">
        <div className="chat-left">
          <MessengerList
            messengerSelected={messengerSelected}
            onMessengerSelected={selectMessenger}
          />
        </div>
        <div className="chat-right">
          {isLoading === true ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <MessageList messages={messages} />
          )}
          {messengerSelected ? (
            <MessageInput onSend={addMessage} />
          ) : (
            <p>Feel free to start a new conversation</p>
          )}
        </div>
      </div>
    </div>
  );
};
