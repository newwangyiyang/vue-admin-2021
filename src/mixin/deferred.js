export default function(count = 10) {
  let requestID = null;
  return {
    data() {
      return {
        displayPriority: 0,
      };
    },
    mounted() {
      this.runDisplayPriority();
    },
    beforeDestory() {
      if (requestID) {
        cancelAnimationFrame(requestID);
      }
    },
    methods: {
      runDisplayPriority() {
        const step = () => {
          // 屏幕每次刷新执行
          requestAnimationFrame(() => {
            this.displayPriority++;
            if (this.displayPriority < count) {
              step();
            }
          });
        };
        step();
      },
      defer(priority) {
        return this.displayPriority >= priority;
      },
    },
  };
}
