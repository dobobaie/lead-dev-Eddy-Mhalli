import React from "react";

interface MessageListProps {
  id: string;
  label: string;
  messengerSelected: string | null;
  onMessengerSelected: (messengerId: string) => void;
}

export const MessengerItem: React.FC<MessageListProps> = ({
  id,
  label,
  messengerSelected,
  onMessengerSelected,
}) => {
  return (
    <li
      className={
        "messenger-item " + (messengerSelected === id ? "selected" : "")
      }
      onClick={() => onMessengerSelected(id)}
    >
      {label}
    </li>
  );
};
