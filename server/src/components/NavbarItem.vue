<template>
<div class="navbar-item-box">
  <div class="icon">
    <el-icon><location /></el-icon>
  </div>
  <div class="label">{{label}}</div> 
</div>
</template>

<script lang="ts">
export default {
  props: {
    to: {
      type: String,
    },
    label: {
      type: String
    }
  }
}
</script>

<style>
.navbar-item-box {
  position: relative;
  height: 64px;
  width: 64px;
  background-color: lightgray;
}

.icon {
  position: relative;
  padding: 20px 0 0 24px;
}

.label {
  text-align: center;
  widows: 100%;
}

</style>