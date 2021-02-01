function fetchBlockedSites() {
    chrome.storage.sync.get('blockedSites', function(data) {
        let listDom = document.getElementById("blocked-sites-list");
        listDom.innerText = data.blockedSites;
        console.log(data);
    })
}

fetchBlockedSites();