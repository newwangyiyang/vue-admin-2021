<template>
  <div class="text-center demo">demo text</div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}
.demo:hover {
  animation: octocat-wave 560ms ease-in-out;
}
</style>
