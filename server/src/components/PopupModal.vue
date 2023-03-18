<template>
  <transition name="fade">
      <div class="popup-modal" v-if="show">
          <div class="window">
              <slot></slot>
              <button @click="cancel">取消</button>
          </div>
      </div>
  </transition>
</template>

<script setup lang="ts">
  defineProps(['isVisible'])
  defineEmits(['update:isVisible'])
</script>

<script lang="ts">
export default {
    name: 'PopupModal',
    data() {
      return {
        show: false,
      }
    },
    watch: {
      isVisible: function(newVal: boolean) { // watch it
        this.show = newVal;
      }
    },
    methods: {
      cancel() {
        this.show = false;
        this.$emit('update:isVisible', false);
      }
    }
}
</script>

<style scoped>
/* css class for the transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.popup-modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 1;
}

.window {
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
}
</style>