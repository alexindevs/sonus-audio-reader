// Update the background script to handle the response
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'convertTextToAudio') {
      // Handle the message received from the content script
      const textContent = message.content;
      // Convert the text to audio
      // ...
      // Once you have the audio, you can send it back to the popup.js or perform any other necessary actions
    }
  });
  