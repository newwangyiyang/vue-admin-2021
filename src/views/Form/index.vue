<template>
  <div class="components-container app-container">
    <split-pane split="vertical" @resize="resize">
      <template #paneL>
        <div class="left-container" />
      </template>
      <template #paneR>
        <split-pane split="horizontal">
          <template #paneL>
            <div class="top-container" />
          </template>
          <template #paneR>
            <div class="bottom-container" />
          </template>
        </split-pane>
      </template>
    </split-pane>
    <back-to-top />
  </div>
</template>

<script>
import splitPane from 'vue-splitpane';
import BackToTop from '@/components/BackToTop';

export default {
  name: 'CusForm',
  components: { splitPane, BackToTop },
  methods: {
    resize() {
      console.log('resize');
    },
  },
};
</script>

<style scoped>
.components-container {
  position: relative;
  height: 100vh;
}

.left-container {
  background-color: #f38181;
  height: 100%;
}

.right-container {
  background-color: #fce38a;
  height: 200px;
}

.top-container {
  background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95e1d3;
  height: 100%;
}
</style>
