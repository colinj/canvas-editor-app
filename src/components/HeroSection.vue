<template>
  <div class="hero-section">
    <img :src="heroImage" alt="Hero" />
    <div class="avatar avatar-position">
      <img :src="avatarImage" alt="profile pic" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
  props: {
    heroImage: {
      type: String,
      required: true
    },
    avatarImage: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  margin-bottom: 3rem
}

$avatar-size: 8rem;

.avatar {
  height: $avatar-size;
  width: $avatar-size;
  background-color: lightgreen;
  border: 4px solid #fff;
  border-radius: 50%;
  overflow: hidden;

  &-position {
    position: absolute;
    bottom: -2rem;
    left: calc(50% - #{$avatar-size / 2});
  }
}
</style>
