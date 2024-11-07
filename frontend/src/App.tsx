import React, { useState } from "react";

import { Welcome } from "./components/Welcome";
import { Chat } from "./components/Chat";
import { applicationErrors } from "./config/default";
import { User } from "./entities/user.entity";
import UserRepository from "./repositories/user.repository";

export const App: React.FC = () => {
  const userStorage = localStorage.getItem("user");
  const [user, setUser] = useState<User | null>(
    userStorage ? JSON.parse(userStorage) : null
  );

  const registerUser = async (username: string) => {
    const user = await UserRepository.createUser({ name: username });
    setUser(() => user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userSessionId", user.sessionId);
  };

  if (applicationErrors.length === 0) {
    return (
      <div className="App">
        <h1>Chatbot Messenger</h1>
        {user === null ? <Welcome onRegister={registerUser} /> : <Chat />}
      </div>
    );
  } else {
    return (
      <div className="error-container">
        <p>An error occurred while loading the application</p>
        <p>Please refresh the page</p>
      </div>
    );
  }
};
