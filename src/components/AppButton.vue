<template>
  <button class="app-btn" type="button">
    <span tabindex="-1">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "AppButton"
};
</script>

<style lang="scss" scoped></style>
