import { useEffect, useRef, useState } from "react";
import { MessengerItem } from "./MessengerItem";
import MessengerRepository from "../repositories/messenger.repository";
import { Messenger } from "../entities/messenger.entity";

interface MessengerListProps {
  messengerSelected: string | null;
  onMessengerSelected: (messengerId: string) => void;
}

export const MessengerList: React.FC<MessengerListProps> = ({
  messengerSelected,
  onMessengerSelected,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messengers, setMessengers] = useState<Messenger[]>([]);

  const hasFetched = useRef(false);
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      MessengerRepository.getMessengers().then((messengers) => {
        setMessengers(messengers);
        setIsLoading(false);
      });
    }
  });

  const addConversation = () => {
    setIsLoading(true);
    MessengerRepository.newConversation().then((messengerId) => {
      onMessengerSelected(messengerId);
      hasFetched.current = false;
    });
  };

  return (
    <div className="messenger-container">
      {isLoading === true ? (
        <div className="loader"></div>
      ) : (
        <div>
          <ul className="messenger-list">
            {messengers.map((messenger) => (
              <MessengerItem
                key={messenger.id}
                id={messenger.id}
                label={messenger.label}
                messengerSelected={messengerSelected}
                onMessengerSelected={onMessengerSelected}
              />
            ))}
          </ul>
          <button className="messenger-button" onClick={addConversation}>
            New conversation
          </button>
        </div>
      )}
    </div>
  );
};
