document.addEventListener("DOMContentLoaded", function() {
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  const nateUsername = "Nate";
  const aniUsername = "Ani";
  const channelID = 'fDFO6KFGLXFBD0jS';

  const drone = new Scaledrone(channelID);

  drone.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Connected to Scaledrone');
  });

  const room = drone.subscribe('chat-room');

  sendButton.addEventListener("click", function() {
    const message = messageInput.value.trim();
    if (message !== "") {
      const username = nateUsername;
      drone.publish({
        room: 'chat-room',
        message,
        username
      });
      messageInput.value = "";
    }
  });

  drone.on('message', (message) => {
    const senderUsername = message.clientData.username === nateUsername ? nateUsername : aniUsername;
    const messageText = message.data;
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.textContent = `${senderUsername}: ${messageText}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendButton.click();
      event.preventDefault();
    }
  });
});
