<template>
  <div class="hero-section">
    <img :src="heroImage" alt="Hero" />
    <div class="avatar avatar-position">
      <img :src="profilePic" :alt="profileName" :title="profileName" />
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
    profilePic: {
      type: String,
      default: null
    },
    profileName: {
      type: String,
      default: "profile picture"
    }
  }
};
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  margin-bottom: 15px;
}

$avatar-size: 62px;

.avatar {
  height: $avatar-size;
  width: $avatar-size;
  background-color: lightgreen;
  border: 2px solid #fff;
  border-radius: 50%;
  overflow: hidden;

  &-position {
    position: absolute;
    bottom: -10px;
    left: calc(50% - #{$avatar-size / 2});
  }
}
</style>
