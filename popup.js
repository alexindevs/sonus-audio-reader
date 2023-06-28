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
      startButton.style.backgroundColor = "#040354"
      statusText.textContent = 'Scraping in progress...';
    
      
      var scrapedText = null; 
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'startCapture' }, response => {
    scrapedText = response && response.scrapedText ? response.scrapedText : null;

    if (scrapedText) {
      // Send the scraped text to the background script
      chrome.runtime.sendMessage({ action: 'convertToAudio', text: scrapedText });

      // Update UI to indicate scraping is done
      startButton.disabled = false;
      statusText.textContent = 'Scraping complete';
    } else {
      // Update UI to indicate no text was scraped
      statusText.textContent = 'No text found on the page';
    }
  });
});

      "I'm trying to build an extension, and it's purpose requires me to scrape the text of the current tab, and store in a variable. Now, I'm trying to check if that worked the way it should, by console logging the value of the variable. But it's not working in the extensions devtools, AND in the website's devtools. Here is the code snippet from the frontend script (controlling the UI as the process goes on). "
}
    startButton.addEventListener("click", startScrape);