function fetchBlockedSites() {
    chrome.storage.sync.get('blockedSites', function(data) {
        let listDom = document.getElementById("blocked-sites-list");
        if (data.blockedSites && data.blockedSites.length > 0) {
            data.blockedSites.forEach(element => {
                let siteRow = document.createElement("div")
                customiseSiteRow(siteRow);

                let siteNameCol = document.createElement("div")
                customiseSiteNameCol(siteNameCol);

                let siteName = document.createElement("span")

                let deleteButtonCol = document.createElement("div")
                customiseDeleteButtonCol(deleteButtonCol);

                let deleteButton = document.createElement("button")
                customiseDeleteButton(deleteButton, element)

                siteName.innerText = element;

                siteNameCol.appendChild(siteName);
                deleteButtonCol.appendChild(deleteButton);

                siteRow.appendChild(siteNameCol);
                siteRow.appendChild(deleteButtonCol);

                listDom.appendChild(siteRow);
            });
        } else {
            handleEmptyList()
        }
    })
}

function customiseSiteRow(siteRow) {
    siteRow.classList = "row site-row";
}

function customiseSiteNameCol(siteNameCol) {
    siteNameCol.classList = "col-10 site-name-container";
}

function customiseDeleteButtonCol(deleteButtonCol) {
    deleteButtonCol.classList = "col-2 delete-button-container";
}

function customiseDeleteButton(deleteButton, url) {
    deleteButton.innerHTML = `<i class="fa fa-trash"></i>`;
    deleteButton.classList = "btn btn-danger";
    deleteButton.setAttribute("data-url", url);
    deleteButton.addEventListener("click", () => {
        removeWebsiteFromList(url);
    });
}

function handleEmptyList() {
    document.getElementById("clear-memory-button").classList.add("hidden");
    document.getElementById("empty-list-container").classList.remove("hidden");
}

function removeWebsiteFromList(url) {
    chrome.storage.sync.get('blockedSites', function(data) {
        if (data && data.blockedSites && data.blockedSites.length > 0) {
            let blockedSites = data.blockedSites;
            let newList = blockedSites.filter((element) => element !== url);
            storeNewList(newList);
        }
    })
}

function storeNewList(newList) {
    chrome.storage.sync.set({'blockedSites': newList}, function() {
        window.location.reload();
    })
}

document.getElementById("clear-memory-button").onclick = function clearMemory() {
    chrome.storage.sync.clear();
    window.location.reload()
}

fetchBlockedSites();