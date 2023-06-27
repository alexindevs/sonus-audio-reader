// document.addEventListener('DOMContentLoaded', function() {
  
    var preloader = document.querySelector('#opening');
    var startButton = document.querySelector("#start")
 
    function addGoneClass() {
      preloader.classList.add('gone');
      startButton.style.display = "block";
    }
  
    setTimeout(addGoneClass, 10000);
    var statusText = document.getElementById("status");

    function startScrape() {
      // Update UI to indicate scraping is in progress
      startButton.style.backgroundColor = "#040354"
      statusText.textContent = 'Scraping in progress...';
    
      // Popup Script
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'startCapture' }, response => {
          // Handle the response from content script
          const scrapedText = response.scrapedText;
    
          if (scrapedText) {
            // Send the scraped text to the background script
            chrome.runtime.sendMessage({ action: 'convertToAudio', text: scrapedText });
    
            startButton.disabled = true;
            statusText.textContent = 'Scraping complete';
          } else {
            // Update UI to indicate no text was scraped
            statusText.textContent = 'No text found on the page';
          }
        });
      });
    }

    startButton.addEventListener("click", startScrape);