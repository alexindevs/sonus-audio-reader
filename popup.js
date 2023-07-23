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
  // startButton.style.backgroundColor = "";
  statusText.textContent = 'Scraping in progress...';


  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'startCapture' }, response => {
    scrapedText = response && response.scrapedText ? response.scrapedText : null;;

    if (scrapedText) {
      // Send the scraped text to the background script
      chrome.runtime.sendMessage({ action: 'convertToAudio', text: scrapedText }, response => {
        if (response.success) {
          chrome.storage.local.get('audioData', data => {
            const audioData = data.audioData;
      
            if (audioData) {
              // Create a new Audio element and set its source to the audio data
              const audio = new Audio();
              audio.src = audioData;
      
              // Play the audio
              audio.play();
      
              // Inform the background script that the audio is playing
              sendResponse({ success: true });
            } else {
              console.error(response.error);
            }
          });      
        }
      });
      // Update UI to indicate scraping is done
      startButton.disabled = false;
      statusText.textContent = 'Scraping complete';
    } else {
      statusText.textContent = 'No text found on the page';
    }
  });
  }
)}
startButton.addEventListener("click", startScrape);

startButton.addEventListener("click", notice);

function notice() {
  let toast = document.querySelector(".container");

  toast.style.display = "flex";
  
  setTimeout(() =>{
    toast.style.display = "none";
  }, 3000);
}

