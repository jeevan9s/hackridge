import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "the content you will be receiving is the latest values for heart rate, blood pressure, and respiratory rate. Based on these you should give professional healthcare advice including whether these values are in the healthy range, and then give advice such as diet improvements ." 
}

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm your personal Health Bot! You can ask me for tips on how to improve!",
      sentTime: "just now",
      sender: "HealthBot"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    // @ts-ignore
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "HealthBot") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div className="ChatBot">
      <div style={{ position:"relative", height: "800px", width: "700px"   }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="HealthBot is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                // @ts-ignore
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput   placeholder="Type message here"  onSend={handleSend}  />        
          </ChatContainer>
        </MainContainer>
      </div> 
    </div>
  )
}
export default ChatBot
