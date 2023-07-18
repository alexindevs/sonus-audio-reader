function convertTextToAudio(text) {
  const apiKey = '8b6b3cd6e389426792fc1214621296e0';
  const apiUrl = `https://api.voicerss.org/?key=${apiKey}&hl=en-us&src=${encodeURIComponent(text)}`;

  return fetch(apiUrl)
    .then(response => response.blob())
    .then(audioBlob => audioBlob)
    .catch(error => error);
}

// Background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'convertToAudio') {
    const { text } = message;

    convertTextToAudio(text)
      .then(audioBlob => {
        if (audioBlob) {
          // Convert blob to base64-encoded string
          const reader = new FileReader();
          reader.onloadend = () => {
            const audioData = reader.result;
            // Store audio data in chrome.storage
            chrome.storage.local.set({ audioData }, () => {
              sendResponse({ success: true });
            });
          };
          reader.readAsDataURL(audioBlob);
        } else {
          sendResponse({ error: 'Failed to fetch audio data' });
        }
      })
      .catch(error => {
        sendResponse({ error: error.message });
      });

    return true;
  }
});
