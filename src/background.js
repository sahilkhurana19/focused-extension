chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get('blockedSites', function(data) {
        if (!data.blockedSites) {
            chrome.storage.sync.set({'blockedSites': []}, function() {
                console.log("Initialised blocked sites memory");
            });
        }
    })
});

chrome.webNavigation.onCommitted.addListener((data) => {
    let websiteUrl = data.url;
    let urlToBlock = new URL(websiteUrl);
    let urlOrigin = urlToBlock.origin;
    chrome.storage.sync.get('blockedSites', function(data) {
        blockedSites = data.blockedSites;
        console.log(blockedSites);
        if (blockedSites) {
            if (blockedSites.indexOf(urlOrigin) > -1) {
                window.location = "https://www.google.com"
            }
        }
    })
})