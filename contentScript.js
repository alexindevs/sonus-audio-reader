chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startCapture') {
    const textContent = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div:not(script), a:not(nav):not(.Navbar):not(#navbar):not(Header):not(.header):not(#header)')).map(element => element.textContent)
    .join(' ');
    chrome.runtime.sendMessage({ action: 'scrapedText', content: textContent }, response => {
      sendResponse({ scrapedText: textContent });
    });
    return true;
  }
});
