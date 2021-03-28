let blockedSites = [];

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get('blockedSites', function(data) {
        if (!data.blockedSites) {
            chrome.storage.sync.set({'blockedSites': []}, function() {
                console.log("Initialised blocked sites memory");
            });
        } else {
            blockedSites = data.blockedSites;
            console.log(blockedSites);
        }
    })
});

// chrome.webRequest.onBeforeRequest.addListener(
chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        console.log(...arguments);
        if (changeInfo && changeInfo.status === "loading") {
            let url = new URL(tab.url);
            if (blockedSites && blockedSites.indexOf(url.host) != -1) {
                chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
                    chrome.tabs.update(tab.id, {url: `chrome-extension://${chrome.runtime.id}/blocked/blocked.html`});
                });
            }
        }
    }
);

// chrome.webNavigation.onCommitted.addListener((data) => {
//     let websiteUrl = data.url;
//     let urlToBlock = new URL(websiteUrl);
//     let urlOrigin = urlToBlock.origin;
//     chrome.storage.sync.get('blockedSites', function(data) {
//         blockedSites = data.blockedSites;
//         console.log(blockedSites);
//         if (blockedSites) {
//             if (blockedSites.indexOf(urlOrigin) > -1) {
//                 window.location = "https://www.google.com"
//             }
//         }
//     })
// })