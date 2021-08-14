<template>
  <div>
    {{ text }}
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "options-page"
})
export default class OptionsPage extends Vue {
    text = "Text"

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

    .hidden {
        display: none !important;
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
