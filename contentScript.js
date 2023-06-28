chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startCapture') {
    const textContent = Array.from(document.querySelectorAll('*')).map(element => element.textContent).join(' ');
    chrome.runtime.sendMessage({ action: 'scrapedText', content: textContent }, response => {
      sendResponse({ scrapedText: textContent });
    });
    return true;
  }
});
