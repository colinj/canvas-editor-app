<template>
  <div class="app-header">
    <h1>{{ title }}</h1>
    <div>{{ subTitle }}</div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    title: {
      type: String,
      default: null
    },
    subTitle: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  font-size: 2rem;
}

.app-header {
  padding: 1.5rem;
  background-color: #7344c0;
  color: #fff;
  font-size: 1.5rem;
}
</style>
