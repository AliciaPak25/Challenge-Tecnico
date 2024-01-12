import { useState } from "react";
import axios from "axios";
import "../App.css";
import SendIcon from "../assets/icons/Send";
import SpeakerIcon from "../assets/icons/Speaker";
import MicrophoneIcon from "../assets/icons/Microphone";
import StopRecordingIcon from "../assets/icons/StopRecording";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isSpeechRecording, setIsSpeechRecording] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  /* const handleSpeechRecognition = () => {
    if (transcript) {
      handleSpeechSubmit(transcript);
      resetTranscript();
    }
  }; */
  /* 
  const handleSpeechEnd = () => {
    handleSpeechRecognition();
    if (!isSpeechRecording) {
      resetTranscript();
    }
  }; */

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  /*  const handleUserInput = (input) => {
    setUserInput(input);
  }; */

  /*   const handleSpeechSubmit = (transcript) => {
    setUserInput(transcript);
  };
 */
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

  const handleSpeechRecording = () => {
    setIsSpeechRecording(!isSpeechRecording);
  };

  const handleSubmit = async () => {
    try {
      // Send the user input to the backend
      const response = await axios.post("http://localhost:5000/chat", {
        user_input: userInput || transcript,
      });

      // Update the chat messages with user input and bot response
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", text: userInput || transcript },
        { role: "cux", text: response.data.bot_response },
      ]);

      //handleTextToSpeech(response.data.bot_response);
      // Clear the input field
      //setUserInput("");
      setUserInput("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white w-full rounded-xl p-4 border-4 border-[#f3f4f6] m-5">
      <div className="chat-container overflow-y-auto px-5">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? "flex justify-end items-center"
                : "flex justify-start items-center"
            }
          >
            <div
              className={
                message.role === "cux"
                  ? "p-2 m-2 rounded-tr-xl rounded-br-xl rounded-bl-xl text-sm text-[#626262] bg-[#f4f4f4] text-left w-fit max-w-6/12 flex justify-center items-center"
                  : "p-2 m-2 rounded-tl-xl rounded-br-xl rounded-bl-xl text-sm text-white bg-[#dc99bb] text-right w-fit max-w-md"
              }
            >
              {message.text}
              {message.role === "cux" && (
                <button
                  onClick={() => handlePlayButtonClick(message.text)}
                  className="ml-2"
                >
                  <SpeakerIcon />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={isSpeechRecording ? transcript : userInput}
          onChange={handleInputChange}
          placeholder="Escribí tu mensaje acá"
          className="bg-[#f2dadf80] border-2 border-[#f2dadf] p-2 flex-grow rounded-md placeholder-[#c983b1]"
        />
        <button onClick={handleSpeechRecording}>
          {isSpeechRecording ? (
            listening ? (
              <div className="flex">
                <div
                  className="flex items-center justify-center"
                  onClick={SpeechRecognition.stopListening}
                >
                  <div className="relative">
                    <div className="microphone-icon">
                      <div className="bg-[#8869a5] p-2 text-white rounded-full flex items-center justify-center h-11 w-11">
                        <MicrophoneIcon />
                      </div>
                    </div>
                    <div className="recording-ring"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#8869a5] p-2 text-white rounded-full flex items-center justify-center h-11 w-11">
                <StopRecordingIcon />
              </div>
            )
          ) : (
            <button
              onClick={SpeechRecognition.startListening}
              className="bg-[#8869a5] p-2 text-white rounded-full flex items-center justify-center h-11 w-11"
            >
              <MicrophoneIcon />
            </button>
          )}
        </button>
        {/* {isSpeechRecording && (
          <div>
            <p>Microphone: {listening ? "on" : "off"}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
          </div>
        )} */}
        <button
          onClick={handleSubmit}
          className="bg-[#8869a5] p-2 text-white rounded-full flex items-center justify-center"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default Chat;
