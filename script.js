//Radar script

for( var i=0, dot, r, t, container=document.getElementById('radar'); i<10; i++) {
	dot = document.createElement('div');
  dot.className = "object";
  r = Math.random()*190+5;
  t = Math.random()*Math.PI*2;
  dot.style.left = (200+Math.cos(t)*r)+"px";
  dot.style.top = (200+Math.sin(t)*r)+"px";
  dot.style.animationDelay = t/Math.PI/2*5+"s";
  container.appendChild(dot);
}

// Chat Bot script

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; // Store user's message
// const axios = require('axios');
const API_KEY = "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"; // API key 
const inputInitHeight = chatInput.scrollHeight;
const createChatLi = (message, className) => {
    // Chat element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}
const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/engines/davinci/completions";
    const messageElement = chatElement.querySelector("p");
    // Defining properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }
    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}
const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;
    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}
chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});
sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

/*----------------Scroll Reveal----------------*/

ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
})

ScrollReveal().reveal('.proj-heading h1', { origin: 'top'});
ScrollReveal().reveal('.proj-heading p, .button', { origin: 'bottom'});
ScrollReveal().reveal('.model2 p', { origin: 'left'});
ScrollReveal().reveal('.model-content', { origin: 'right'});

/*----------------Typed JS----------------*/

const typed = new Typed('.multiple-text', {
    strings: ['ADVAITH'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});
