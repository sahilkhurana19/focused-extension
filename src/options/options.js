function fetchBlockedSites() {
    chrome.storage.sync.get('blockedSites', function(data) {
        let listDom = document.getElementById("blocked-sites-list");
        if (data.blockedSites) {
            data.blockedSites.forEach(element => {
                let siteRow = document.createElement("div")
                customiseSiteRow(siteRow);

                let siteNameCol = document.createElement("div")
                customiseSiteNameCol(siteNameCol);

                let siteName = document.createElement("span")

                let deleteButtonCol = document.createElement("div")
                customiseDeleteButtonCol(deleteButtonCol);

                let deleteButton = document.createElement("button")
                customiseDeleteButton(deleteButton)

                siteName.innerText = element;

                siteNameCol.appendChild(siteName);
                deleteButtonCol.appendChild(deleteButton);

                siteRow.appendChild(siteNameCol);
                siteRow.appendChild(deleteButtonCol);

                listDom.appendChild(siteRow);
            });
        console.log(data);
        }
    })
}

function customiseSiteRow(siteRow) {
    siteRow.classList = "row";
}

function customiseSiteNameCol(siteNameCol) {
    siteNameCol.classList = "col-3";
}

function customiseDeleteButtonCol(deleteButtonCol) {
    deleteButtonCol.classList = "col-3";
}

function customiseDeleteButton(deleteButton) {
    deleteButton.innerHTML = `<i class="fa fa-trash"></i>`;
    deleteButton.classList = "btn btn-danger";
}

document.getElementById("clear-memory-button").onclick = function clearMemory() {
    chrome.storage.sync.clear();
}

fetchBlockedSites();