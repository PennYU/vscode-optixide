<script setup lang="ts">
import { 
  provideVSCodeDesignSystem,
  vsCodeButton,
  vsCodePanels,
  vsCodePanelTab,
  vsCodePanelView
} from "@vscode/webview-ui-toolkit";
import { vscode } from "../utilities/vscode";

// In order to use the Webview UI Toolkit web components they
// must be registered with the browser (i.e. webview) using the
// syntax below.
provideVSCodeDesignSystem().register(
  vsCodeButton(),
  vsCodePanels(),
  vsCodePanelTab(),
  vsCodePanelView()
);

// To register more toolkit components, simply import the component
// registration function and call it from within the register
// function, like so:
//
// provideVSCodeDesignSystem().register(
//   vsCodeButton(),
//   vsCodeCheckbox()
// );
//
// Finally, if you would like to register all of the toolkit
// components at once, there's a handy convenience function:
//
// provideVSCodeDesignSystem().register(allComponents.register());

function handleHowdyClick() {
  vscode.postMessage({
    command: "hello",
    text: "Hey there partner! 🤠",
  });
}
</script>

<script lang="ts">
import PopupModal from '../components/PopupModal.vue'

export default {
    name: 'ConfirmDialogue',

    components: { PopupModal },

    data: () => ({
        showDialog: false,
    }),

    methods: {
        show() {
          this.showDialog = true;
        },
    },
}
</script>

<template>
  <main>
    <h1>Hello world home!</h1>
    <vscode-button @click="handleHowdyClick">Howdy!</vscode-button>
    <button @click="show">点我</button>
    <popup-modal v-model:is-visible="showDialog">
        <h2 style="margin-top: 0">hahahaha</h2>
    </popup-modal>
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

main > * {
  margin: 1rem 0;
}

/* Add a black background color to the top navigation */
.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #04AA6D;
  color: white;
}
</style>
