let blockSiteButton = document.getElementById('block-site-button');
let currentTab = {};

window.addEventListener("pageshow", getCurrentTabDetails())

function getCurrentTabDetails() {
    chrome.tabs.query({active: true, currentWindow: true}, function(data) {
        currentTab = data[0];
    })
}

blockSiteButton.onclick = function(element) {
    let urlToBlock = new URL(currentTab.url);
    blockSite(urlToBlock.origin);
};

function blockSite(websiteUrl) {
    chrome.storage.sync.set({'blockedSite': websiteUrl}, function() {
        console.log("Blocked", websiteUrl);
    });
}