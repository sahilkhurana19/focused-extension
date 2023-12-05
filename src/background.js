let blockedSites = [];

chrome.runtime.onInstalled.addListener(() => {
    fetchBlockedSitesList();
});

chrome.tabs.onUpdated.addListener(
    function(changeInfo, tab) {
        fetchBlockedSitesList();
        if (changeInfo && changeInfo.status === "loading" && tab.url) {
            let url = new URL(tab.url);
            if (blockedSites && blockedSites.indexOf(url.host) != -1) {
                chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
                    chrome.tabs.update(tab.id, {url: `chrome-extension://${chrome.runtime.id}/blocked/blocked.html`});
                });
            }
        }
    }
);

function fetchBlockedSitesList() {
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
}
