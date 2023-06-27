// Content Script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startCapture') {
      const textContent = Array.from(document.querySelectorAll('*')).map(element => element.textContent).join(' ');
      // Send the scraped text content to the popup script
      chrome.runtime.sendMessage({ action: 'scrapedText', content: textContent }, response => {
        sendResponse({ scrapedText: textContent }); // Send the scrapedText as the response
      });
      return true;
    }  
});
  