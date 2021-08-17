<template>
    <div class="container">
        <div class="row mt-2">
            <div id="version-text">
                Version - 0.1.0
            </div>
            <div class="col text-center">
                <h2>Focused Extension</h2>
                <h4>Block sites and get working!</h4>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-6 blocked-sites-container">
                <div class="row">
                    <div class="col text-center">
                        <h5>Unblock currently blocked websites</h5>
                    </div>
                </div>
                <hr/>
                <div class="row" v-if="blockedSites.length > 0">
                    <div class="col">
                        <div id="blocked-sites-list">
                            <div v-for="(site, index) in blockedSites" :key="index">
                                <div class="row site-row">
                                    <div class="col-10 site-name-container">
                                        {{ site }}
                                    </div>
                                    <div class="col-2 delete-button-container">
                                        <b-button variant="danger" @click="removeWebsiteFromList(site)"><b-icon-trash-fill/></b-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="row" id="empty-list-container">
                    <div class="col text-center">
                        <p>You'll be able to track your blocked websites here!</p>
                    </div>
                </div>
                <div class="row" v-if="blockedSites.length > 0">
                    <div class="col">
                        <div id="clear-memory-button" class="text-center" @click="clearMemory()">
                            <b-button variant="danger">Reset Blocked Sites List</b-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="row">
                    <div class="col text-center">
                        <h5>Pomodoro Timer Settings</h5>
                    </div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col text-center">
                        <p>Feature coming soon!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "options-page"
})
export default class OptionsPage extends Vue {
    blockedSites = [];

    mounted() {
        this.fetchBlockedSites();
    }  

    fetchBlockedSites() {
        chrome.storage.sync.get('blockedSites', (data) => {
            this.blockedSites = data.blockedSites || [];
        })
    }

    removeWebsiteFromList(url) {
        chrome.storage.sync.get('blockedSites', (data) => {
            if (data && data.blockedSites && data.blockedSites.length > 0) {
                let blockedSites = data.blockedSites;
                let newList = blockedSites.filter((element) => element !== url);
                this.storeNewList(newList);
            }
        })
    }

    storeNewList(newList) {
        chrome.storage.sync.set({'blockedSites': newList}, () => {
            this.blockedSites = newList
        })
    }

    clearMemory() {
        chrome.storage.sync.clear();
        chrome.storage.sync.get('blockedSites', (data) => {
            this.blockedSites = data.blockedSites || [];
        })
    }
}

</script>

<style lang="scss">
    .blocked-sites-container {
        border-right: 1px solid black;
        min-height: 60vh;

        .site-row {
            margin-top: 5px;
            margin-bottom: 5px;
            .delete-button-container {
                text-align: right;
            }
        }
    }

    #version-text {
        font-size: 10px;
        text-align: right;
        position: absolute;
        right: 0;
        top: 0;
        height: 0px;
    }
</style>
