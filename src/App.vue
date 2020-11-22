<template>
  <div class="container">
    <home />
  </div>
</template>

<script>
import Home from "@/views/Home.vue";
export default {
  components: {
    Home
  }
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
.container {
  padding-bottom: 3rem;
}
</style>
