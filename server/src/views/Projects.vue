<template>
  <div>
    <h1>Projects</h1>
    <el-button @click="onCreateProject">Create Project</el-button>
  </div>
</template>

<script lang="ts">
import {postMessage} from '@/utils';
export default {
  mounted () {
    window.addEventListener('message', this.receiveMessage)
  },
  beforeDestroy () {
    window.removeEventListener('message', this.receiveMessage)
  },
  methods: {
    onCreateProject() {
      postMessage({
        action: 'callFunction', // callFunction, executeCommand
        name: "sayHello",
        parameters: ['jack'],
      })
    },
    receiveMessage (event: any) {
      console.log('receiveMessage', event.data)
    }
  }
}
</script>