document.addEventListener('DOMContentLoaded', function() {

var preloader = document.querySelector('#opening');
var startButton = document.querySelector("#start")
var startDiv = document.querySelector("div.start");
var noticeText = document.querySelector(".notice #status");
var statusText = document.querySelector("#status")
var playButtons = document.querySelector(".option")
const playButton = document.querySelector("#play");
const pauseButton = document.querySelector("#pause");
const gitHubButton = document.querySelector("#github");
const downloadButton = document.querySelector("#download");

function addGoneClass() {
  preloader.classList.add('gone');
  startButton.style.display = "block";
  startDiv.style.display = "block";
}

setTimeout(addGoneClass, 10000);

var scrapedText;
var scrapedAudio;
function startScrape() {
  startButton.style.display = "none";
  statusText.style.display = "block";
  statusText.textContent = 'Scraping in progress...';

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'startCapture' }, response => {
      scrapedText = response && response.scrapedText ? response.scrapedText : null;

      if (scrapedText) {
        scrapedText = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum provident sed repudiandae praesentium et minus sunt nulla in ipsum dignissimos totam tempore natus, at dolor. Distinctio sed eius iste assumenda sint beatae a eum, tenetur velit, accusamus nulla vitae, minima fugit odit nemo expedita. Voluptate atque ipsam, cumque dolorum, sed laborum debitis, incidunt neque quaerat hic recusandae rerum odit! Exercitationem labore error maxime molestias, omnis dolor eius, deleniti cum unde nisi numquam! Voluptatum provident impedit dolorem praesentium, animi placeat consequatur quod voluptatem ducimus. Deserunt nesciunt expedita nostrum veniam odio voluptates.";
        var sizeInBytes = new Blob([scrapedText]).size;
        var sizeInKb = sizeInBytes / 1024;

        // If the size exceeds 100KB, truncate the text
        if (sizeInKb > 100) {
          scrapedText = scrapedText.substring(0, 90 * 1024);
        }

        // Convert the scrapedText Blob to a string
        var fileReader = new FileReader();
        fileReader.onload = function(event) {
          var textAsString = event.target.result;

          // Send the scraped text to the background script
          statusText.textContent = "Text retrieved successfully.";
          chrome.runtime.sendMessage({ action: 'convertToAudio', text: textAsString }, response => {
            if (response.success) {
              chrome.storage.local.get('audioData', data => {
                const audioData = data.audioData;
                if (audioData) {
                  // Create a new Audio element and set its source to the audio data
                  statusText.textContent = "Ready to play.";
                  statusText.style.display = "none";
                  startDiv.style.display = "none";
                  playButtons.style.display = "grid";

                  const audio = new Audio();
                  audio.src = audioData;

                  scrapedAudio = audio;
                } else {
                  statusText.textContent = response.error;
                }
              });      
            }
          });
        };
        fileReader.readAsText(new Blob([scrapedText]));
      } else {
        statusText.textContent = 'No text found on the page';
      }

      // Update UI to indicate scraping is done
      startButton.disabled = false;
      statusText.textContent = 'Scraping complete';
    });
  });
}



function playAudio() {
  scrapedAudio.play();
}

function pauseAudio() {
  scrapedAudio.pause();
}

function downloadAudio() {
  scrapedAudio.download = scrapedAudio.src;
}

function openGitHub() {
  window.open('https://github.com/alexindevs/sonus-audio-reader', '_blank');
}

playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
downloadButton.addEventListener("click", downloadAudio);
gitHubButton.addEventListener("click", openGitHub);

startButton.addEventListener("click", startScrape);

// startButton.addEventListener("click", notice);

// function notice() {
//   let toast = document.querySelector(".notice");

//   toast.style.display = "flex";
  
//   setTimeout(() =>{
//     toast.style.display = "none";
//   }, 3000);
// }

});