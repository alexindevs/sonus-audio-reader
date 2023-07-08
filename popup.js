// document.addEventListener('DOMContentLoaded', function() {
  
    var preloader = document.querySelector('#opening');
    var startButton = document.querySelector("#start")
 
    function addGoneClass() {
      preloader.classList.add('gone');
      startButton.style.display = "block";
    }
  
    setTimeout(addGoneClass, 10000);
    var statusText = document.getElementById("status");

    var scrapedText;
    function startScrape() {
      startButton.style.backgroundColor = "#040354"
      statusText.textContent = 'Scraping in progress...';
    
      
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'startCapture' }, response => {
    scrapedText = response && response.scrapedText ? response.scrapedText : null;;

    if (scrapedText) {
      // Send the scraped text to the background script
      chrome.runtime.sendMessage({ action: 'convertToAudio', text: 'Hello, world!' }, response => {
        if (response.audioBlob && Object.keys(response.audioBlob).length > 0) {
          const audioBlob = response.audioBlob;
          const audio = new Audio();
          audio.src = window.URL.createObjectURL(audioBlob);
          audio.play();
        } else if (response.error) {
          const error = response.error;
          console.error(error);
        } else {
          console.error("Something else is wrong.");
        }
      });
      // Update UI to indicate scraping is done
      startButton.disabled = false;
      statusText.textContent = 'Scraping complete';
    } else {
      statusText.textContent = 'No text found on the page';
    }
  });
});

}
    startButton.addEventListener("click", startScrape);