<template>
  <div style="height: 200vh" class="bg-gray-400 app-container">
    <sticky :stickyTop="104" />
    <back-to-top />
  </div>
</template>

<script>
import Sticky from '@/components/Sticky';
import BackToTop from '@/components/BackToTop';
export default {
  name: 'EditorPage',
  components: {
    Sticky,
    BackToTop,
  },
  beforeDestroy() {
    console.log('umount trigger,,,');
  },
};
</script>
