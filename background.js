function convertTextToAudio(text) {
  const apiKey = '8b6b3cd6e389426792fc1214621296e0';
  const apiUrl = `https://api.voicerss.org/?key=${apiKey}&hl=en-us&c=MP3&src=${encodeURIComponent(text)}`;

  return fetch(apiUrl)
    .then(response => response.blob())
    .then(audioBlob => audioBlob)
    .catch(error => error);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'convertToAudio') {
    const { text } = message;
    convertTextToAudio(text)
      .then(audioBlob => {
      sendResponse({ audioBlob });
    })
      .catch(error => {
        sendResponse({ error: error.message });
      });

    return true;
  }
});
