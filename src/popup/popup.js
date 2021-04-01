let blockSiteButton = document.getElementById('block-site-button');
let currentTab = {};
let blockedSites = [];
let urlToBlock = "";
let urlOrigin = ""

window.addEventListener("pageshow", getCurrentTabDetails())

function getCurrentTabDetails() {
    chrome.tabs.query({active: true, currentWindow: true}, function(data) {
        currentTab = data[0];
        websiteUrl = currentTab.url;
        urlToBlock = new URL(currentTab.url);
        urlOrigin = urlToBlock.host;
        chrome.storage.sync.get('blockedSites', function(data) {
            blockedSites = data.blockedSites;
            if (blockedSites) {
                if (blockedSites.indexOf(urlOrigin) > -1) {
                    document.getElementById('block-disabled-button').style.display = "inline-block";
                    document.getElementById('block-site-button').style.display = "none";
                    
                } else {
                    document.getElementById('block-disabled-button').style.display = "none";
                    document.getElementById('block-site-button').style.display = "inline-block";
                }
            }
            else {
                blockedSites = [];
                blockedSites.push(websiteUrl)
            }
        })
    })
}

blockSiteButton.onclick = function(element) {
    blockSite(urlOrigin);
};

async function blockSite(websiteUrl) {
    chrome.storage.sync.get('blockedSites', function(data) {
        blockedSites = data.blockedSites;
        if (blockedSites) blockedSites.push(websiteUrl);
        else {
            blockedSites = [];
            blockedSites.push(websiteUrl)
        }
        chrome.storage.sync.set({'blockedSites': blockedSites}, function() {
            chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
                chrome.tabs.update(tab.id, {url: `chrome-extension://${chrome.runtime.id}/blocked/blocked.html`});
            });
        });
    })
}