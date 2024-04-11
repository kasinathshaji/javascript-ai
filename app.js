const api_key = "your API key";
const voiceButton = document.getElementById("voice-button");
const sendButton = document.getElementById("send-button");
const textInput = document.getElementById("text-input");
const imageSection =document.querySelector('.Image-section')
const getImages = async () => {
  const message = textInput.value.trim();
  console.log(message);
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${api_key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: message,
      n: 4,
      size: "1024x1024",
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    );
    const data = await response.json();
    console.log(data);
    data?.data.forEach(imageObject => {
        const imageContainer = document.createElement('div')
        imageContainer.classList.add("image-container")
       const imageElement = document.createElement('img')
       imageElement.setAttribute('src',imageObject.url)
       imageContainer.append(imageElement)
       imageSection.append(imageContainer)
    });
  } catch (error) {
    console.error(error);
  }
};

voiceButton.addEventListener("click", () => {
  startVoiceRecognition();
});

sendButton.addEventListener("click", getImages);

function startVoiceRecognition() {
  const recognition =
    new window.webkitSpeechRecognition() || new window.SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    textInput.value = transcript;
  };

  recognition.onend = function () {
    recognition.stop();
  };
}
