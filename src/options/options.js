function fetchBlockedSites() {
    chrome.storage.sync.get('blockedSites', function(data) {
        let listDom = document.getElementById("blocked-sites-list");
        listDom.innerText = data.blockedSites;
        console.log(data);
    })
}

document.getElementById("clear-memory-button").onclick = function clearMemory() {
    chrome.storage.sync.clear();
}

fetchBlockedSites();