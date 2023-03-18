<script setup lang="ts">
import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";
import { vscode } from "./utilities/vscode";

import Home from '@/views/Home.vue';
import { def } from "@vue/shared";

// In order to use the Webview UI Toolkit web components they
// must be registered with the browser (i.e. webview) using the
// syntax below.
provideVSCodeDesignSystem().register(vsCodeButton());

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

<template>
  <main>
    <el-container style="height: 100vh;">
      <el-aside width="64px">
        <el-row>
          <router-link to="home">
            <el-icon><location /></el-icon>
            <div>Home</div> 
          </router-link>
        </el-row>
        <el-row>
          <router-link to="projects">
            <el-icon><location /></el-icon>
            <div>Project</div> 
          </router-link>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </main>
</template>
<script lang="ts">
export default {
  mounted() {
    window.onmessage = function(e) {
      console.log('works', e);
    };
  }
}
</script>

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

.no-margin {
  margin: 0
}
</style>
