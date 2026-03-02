let API_KEY = "";

function saveKey(){
  API_KEY = document.getElementById("a93b720ddea64c2d8859e9541a266057").value;
  alert("API Key Saved!");
}

function addMessage(text, sender){
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(){
  const input = document.getElementById("userInput");
  const message = input.value;
  if(!message) return;

  addMessage(message, "user");
  input.value = "";

  addMessage("Typing...", "bot");

  try{
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {role: "system", content: "You are Detox AI, an intelligent assistant."},
          {role: "user", content: message}
        ]
      })
    });

    const data = await response.json();

    document.querySelector(".bot:last-child").remove();
    addMessage(data.choices[0].message.content, "bot");

  }catch(error){
    document.querySelector(".bot:last-child").remove();
    addMessage("Error connecting to API.", "bot");
  }
}
