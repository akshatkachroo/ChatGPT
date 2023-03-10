import logo from './logo.svg';
import './normal.css';
import './App.css';
import {useState} from 'react'

function App() {

  const[input, setInput] = useState ("");
  const[chatLog, setChatLog] = useState([{
    user: "chatgpt", 
    message: "How can I help you today?"
  }]);

  function clearChat (){
    setChatLog([]);
  }

  async function handleSubmit(e){
    e.preventDefault();
    let chatLogNew = [...chatLog, {user: "me", message: `${input}`}]
    await setInput("");
    setChatLog(chatLogNew)
    const messages = chatLogNew.map((message) => message.message).join("\n")
    const response = await fetch ("https://api.openai.com/v1/completions",{
      method:"POST",
      headers: {
        "Content-Type": "application/json", 
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: 1000,
        temperature: 0,
        
      })
      })
    // });
    const data = await response.json();
    console.log(data);
    setChatLog([...chatLogNew, {user: "chatgpt", message: `${data["choices"][0]["text"]}`}])


  }
  return (
    <div className="App">
      <aside className = "sidemenu">
        <div className="side-menu-button" onClick = {clearChat}>
          <span>
            
          </span>
            + New Chat
        </div>
      </aside>
    <section className="chatbox">
      <div className="chat-log">
        {chatLog.map((message, index)=> (
          <ChatMessage key = {index} message = {message}/>
        ))}
        </div>
        <div className= "chat-input-holder">
          <form onSubmit = {handleSubmit}>
          <input
          rows = "1"
          value = {input}
          onChange = {(e) => setInput(e.target.value)}
          className= "chat-input-text-area" >
          </input> 
          </form>
        </div>

      </section >
      
    </div>
  );
}

const ChatMessage = ({message}) =>  {
  return (
    <div className = {`chat-message ${message.user = "gpt" && "chatgpt"}`}>
          <div className = "chat-message-center">
        <div className = {`avatar ${message.user = "gpt" && "chatgpt"}`}>
         
        </div>
        <div className = "message">
        {message.message}
        </div>
        </div>
        </div>
  )
}

export default App;
