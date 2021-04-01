let settingsButton = document.getElementById('settings-button');
settingsButton.onclick = function (element) {
    chrome.tabs.create({
        active: true,
        url: `chrome-extension://${chrome.runtime.id}/options/options.html`
    })
}

function fetchBlockedSites() {
    chrome.storage.sync.get('blockedSites', function(data) {
        let listDom = document.getElementById("blocked-sites-list");
        listDom.innerText = data.blockedSites;
    })
}

// fetchBlockedSites();