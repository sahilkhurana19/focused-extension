<template>
    <div class="container">
        <div class="row">
            <div class="col mt-4" id="settings-button-container">
                <button id="settings-button" class="btn" @click="navigateToOptions()">Settings</button>
            </div>
        </div>
        <div class="row">
            <div class="col d-flex justify-content-center align-items-center" id="blocked-bold-container">
                <span id="blocked-bold-text">BLOCKED!</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "blocked-page"
})
export default class BlockedPage extends Vue {
    navigateToOptions() {
        chrome.tabs.create({
            active: true,
            url: `chrome-extension://${chrome.runtime.id}/options.html`
        })
    }
}
</script>

<style lang="scss">
    #blocked-bold-container {
        height: 80vh;
    }

    #blocked-bold-text {
        font-size: 10em;
    }

    #settings-button-container {
        text-align: right;
        #settings-button {
            background: white;
            border: 1px solid black;
        }
    }
</style>
