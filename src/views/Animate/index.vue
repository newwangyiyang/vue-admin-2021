<template>
  <div class="app-container">
    <el-button type="primary" @click="toggleVisible">show</el-button>
    <transition name="fade-transform">
      <div v-if="visible" class="w-20 h-20 bg-red-300 m-10"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Animation',
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    toggleVisible() {
      this.visible = !this.visible;
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
