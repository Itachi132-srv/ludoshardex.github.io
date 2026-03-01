function sendMessage(){
    const input=document.getElementById("input");
    const message=input.value.trim();
    if(message==="") return;
    addMessage(message,"user");
    input.value="";
    showTypingEffect();
    setTimeout(()=>{
        const reply=generateReply(message.toLowerCase());
        hideTypingEffect();
        addMessage(reply,"bot");
    },1500);
}

function addMessage(text,type){
    const chat=document.getElementById("chat");
    const msg=document.createElement("div");
    msg.classList.add("message",type);
    msg.innerText=text;
    chat.appendChild(msg);
    chat.scrollTop=chat.scrollHeight;
}

function generateReply(msg){
    // Predefined smart replies
    const replies = [
        {keywords:["hello","hi","hey"], response:"Hello! Main ChatBot hoon. Tum kya discuss karna chahte ho?"},
        {keywords:["sad","udaas","depressed"], response:"Oh… ye normal hai. Thoda relax karo aur safe cheezein karo."},
        {keywords:["help","assist","guide","kaise"], response:"Sorry, main help nahi de sakta. Main sirf chatting ke liye hoon."},
        {keywords:["time"], response:"Abhi ka time hai: "+new Date().toLocaleTimeString()},
        {keywords:["name","server"], response:"Yeh sirf chatting bot hai, koi real server nahi hai."}
    ];

    for(const item of replies){
        for(const kw of item.keywords){
            if(msg.includes(kw)) return item.response;
        }
    }

    // Default fallback
    return "Hmm… interesting! Tumne ye kaha: \""+msg+"\". Main sirf iska chat reply de sakta hoon.";
}

// Typing animation
function showTypingEffect(){
    const chat=document.getElementById("chat");
    const typing=document.createElement("div");
    typing.classList.add("message","bot");
    typing.id="typing";
    typing.innerText="...";
    chat.appendChild(typing);
    chat.scrollTop=chat.scrollHeight;
}

function hideTypingEffect(){
    const typing=document.getElementById("typing");
    if(typing) typing.remove();
}

document.getElementById("input").addEventListener("keypress",function(e){
    if(e.key==="Enter") sendMessage();
});
