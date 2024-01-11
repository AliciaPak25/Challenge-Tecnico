import { useState } from "react";
import axios from "axios";
import "../App.css";
import SendIcon from "../assets/icons/Send";

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleTextToSpeech = async (text) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/text-to-speech",
        { text }
      );
      const audio = new Audio(
        `data:audio/mp3;base64,${response.data.mp3_base64}`
      );
      audio.play();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePlayButtonClick = (text) => {
    handleTextToSpeech(text);
  };

  const handleSubmit = async () => {
    try {
      // Send the user input to the backend
      const response = await axios.post("http://localhost:5000/chat", {
        user_input: userInput,
      });

      // Update the chat messages with user input and bot response
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", text: userInput },
        { role: "bot", text: response.data.bot_response },
      ]);

      //handleTextToSpeech(response.data.bot_response);
      // Clear the input field
      //setUserInput("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="flex flex-col bg-white my-3 mx-5 w-full rounded-xl p-2">
      <div className="chat-container rounded-xl">
        {chatMessages.map((message, index) => (
          <div key={index} className={message.role}>
            <strong>{message.role === "user" ? "You:" : "Bot:"}</strong>{" "}
            {message.text}
            {message.role === "bot" && (
              <button onClick={() => handlePlayButtonClick(message.text)}>
                Play
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Escribí tu mensaje acá"
          className="bg-[#f2dadf80] border-2 border-[#f2dadf] p-2 flex-grow"
        />
        <button onClick={handleSubmit} className="bg-[#8869a5] p-2 text-white">
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default Chat;
