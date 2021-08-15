<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col text-center">
                    <h3 class="mainHeading">
                        <b>Focused!</b>
                    </h3>                  
                </div>
            </div>
            <div class="row my-2">
                <div class="col text-center">
                    <h6 class="subHeading">Block sites and get working</h6>
                </div>
            </div>
            <div class="row">
                <div class="col text-center">
                    <b-button v-if="siteAlreadyBlocked" variant="secondary" id="block-disabled-button" disabled style="display: none;">The website is already blocked!</b-button>
                    <b-button v-else variant="primary" id="block-site-button" @click="blockSite()">Block This Site!</b-button>
                </div>
            </div>
            <div class="mt-2">
                <div id="settings-icon">
                    <b-icon-gear-fill @click="navigateToOptions()"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "popup-page"
})
export default class PopupPage extends Vue {
    siteAlreadyBlocked = false;
    urlOrigin = "";

    mounted() {
        this.getCurrentTabDetails();
    }

    getCurrentTabDetails() {
        chrome.tabs.query({active: true, currentWindow: true}, function(data) {
        let currentTab = data[0];
        // let websiteUrl = currentTab.url;
        let urlToBlock = new URL(currentTab.url);
        this.urlOrigin = urlToBlock.host;
        chrome.storage.sync.get('blockedSites', function(data) {
            let blockedSites = data.blockedSites;
            console.log(blockedSites)
            if (blockedSites) {
                if (blockedSites.indexOf(this.urlOrigin) > -1) {
                   this.siteAlreadyBlocked = true;
                }
            }
        })
        })
    }

    blockSite() {
        chrome.storage.sync.get('blockedSites', function(data) {
            let blockedSites = data.blockedSites;
            if (blockedSites) blockedSites.push(this.urlOrigin);
            else {
                blockedSites = [];
                blockedSites.push(this.urlOrigin)
            }
            chrome.storage.sync.set({'blockedSites': blockedSites}, function() {
                chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
                    chrome.tabs.update(tab.id, {url: `chrome-extension://${chrome.runtime.id}/options.html`});
                });
            });
        })
    }

    navigateToOptions() {
        chrome.tabs.create({
            active: true,
            url: `chrome-extension://${chrome.runtime.id}/options.html`
        })
    }
}
</script>

<style lang="scss">
    .container {
        min-width: 350px;
        padding: 1em 2em;
        border: 5px solid #0d6efd;
    }

    #settings-icon {
        text-align: right;
        margin-bottom: -10px;
        cursor: pointer;
    }
</style>
