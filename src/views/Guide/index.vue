<template>
  <div class="app-container">
    <el-button type="primary" @click.prevent.stop="guide">Start Guide</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Driver from 'driver.js'; // import driver.js
import 'driver.js/dist/driver.min.css'; // import driver.js css
import steps from './steps';
import defaultSettings from '@/settings';
const { fixedHeader } = defaultSettings;
export default {
  name: 'Guide',
  data() {
    return {
      driver: null,
    };
  },
  computed: {
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
  },
  mounted() {
    const that = this;
    this.driver = new Driver({
      onReset() {
        that.changeFixedHeader(fixedHeader);
      },
    });
  },
  methods: {
    ...mapActions({
      changeFixedHeader: 'settings/changeFixedHeader',
    }),
    guide(e) {
      this.driver.defineSteps(steps);
      this.handleFixedHeader();
      this.driver.start();
    },
    handleFixedHeader() {
      if (this.fixedHeader) {
        this.changeFixedHeader(false);
      }
    },
  },
};
</script>
