# Full-Stack Developer Home Assignment: React.js Chatbot with LLM API through Express.js backend and Firestore database

This assignment aims to assess your full-stack development skills using React, Node.js/Express, LLM API, and Firestore.  The estimated completion time for an experienced developer is approximately 2 hours. Styling is not a priority; focus on functionality.

**Objective:** Build a simple chatbot application that allows users to interact with an LLM API and store chat sessions in Firestore.

## Frontend (React.js)

- **Minimal features**: 
    - Create a user interface with a chat window for interacting with the chatbot.
    - Show chat history
    - Position input field and send button at the bottom of the window
- **Optional features**:
    - Implement a sidebar panel to display a list of saved chat sessions.
    - Clicking a saved session in the sidebar loads its chat history into the chat window.
    - Users can start new chat sessions, each assigned a unique ID and saved in Firestore.

* Use any UI library (e.g., Material UI, Ant Design) or plain CSS. Styling is not a key evaluation criterion.

## Backend (Node.js/Express.js)

- **Minimal features**:
    - Set up an Express.js server to handle API requests.
    - Create an API endpoint to receive user messages and forward them to a Large Language Model (LLM) API.
    - Receive the LLM API's response and send it back to the frontend.
    - Save chat hisotry to Firestore
    - Implement API endpoints for retrieving the chat history and sending it to the Frontend
- **Optional features**:
    - Creating new chat sessions in Firestore.
    - Retrieving a list of saved chat sessions for a user (assume a single user for simplicity).
    - Retrieving the chat history for a specific session from Firestore.
    - Saving messages to the corresponding chat session in Firestore.cd
- Use the official Firestore Node.js client library.

## Database (Firestore)

- Design a Firestore data structure to store chat sessions. Each session should store (at minimum):
    - A unique session ID.
    - An array of messages, each containing the text and sender (user or bot).
    
Note: As an alternative database you can also use a more standard one, like PostreSQL or MongoDB.

## LLM API Integration

- You can use the Groq API which offers LLM access thourgh a free API key that you should obtain [LINK](https://console.groq.com/keys)
- You can also use OpenAI, Gemini or any other LLM service if you are more familiar with them (but you may incur a tiny cost)

## Further instructions
- Please note the time it takes you to develop the application, and if you can provide a breakdown between Firestore setup/Backend and Frontend features.