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
.app-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70px;
  padding: 1.5rem;
  background-color: $purple;
  color: #fff;
  font-size: $font-size-md - 1;
}

h1 {
  font-size: $font-size-md;
}
</style>
