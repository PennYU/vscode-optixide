<template>
  <div>
    <h1>Projects</h1>
    <el-button @click="onCreateProject">Create Project</el-button>
  </div>
</template>

<script lang="ts">
import {postMessage} from '@/utils';
export default {
  methods: {
    onCreateProject() {
      postMessage({
        command: "xxxx",
        parameters: [],
      })
    }
  }
}
</script>