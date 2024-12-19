import { useState } from "react";
import styles from "./Chatbot.module.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chatbotWrapper}>
      <button onClick={toggleChatbot} className={styles.chatbotButton}>
        {isOpen ? "Close Chat" : "Chat with SolAI"}
      </button>

      {isOpen && (
        <div className={styles.chatbotContainer}>
          <iframe
            src="https://bot.dialogflow.com/b5523111-0f84-4c6d-91f6-8e7cd5691fa6"
            title="SolAI Chatbot"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          ></iframe>
        </div>
      )}
    </div>
  );
}
