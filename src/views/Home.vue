<template>
  <app-header
    title="Brightness & Contrast Developer Test"
    sub-title="01 Jun, 2018 – 31 Dec, 2019"
  />
  <div class="hero">
    <img src="@/assets/hero.png" alt="Hero" />
    <div class="avatar">
      <img src="@/assets/profile.png" alt="profile pic" />
    </div>
  </div>
  <div class="controls">
    <div class="input-range">
      <label for="brightness">Brightness</label>
      <input
        type="range"
        name="brightness"
        id="brightness"
        min="-100"
        max="100"
        step="1"
      />
      <div>Slide to adjust image brightness!☀️</div>
    </div>
    <div class="input-range">
      <label for="contrast">Contrast</label>
      <input
        type="range"
        name="contrast"
        id="contrast"
        min="-100"
        max="100"
        step="1"
      />
      <div>Slide to adjust image contrast! 🌓</div>
    </div>
  </div>
  <div class="main">
    <div class="image-container">
      <img :src="imageSource" alt="target image" />
      <div class="control-footer">
        <div class="file-loader">
          <label for="file-loader">Name</label>
          <input
            type="file"
            name="file-loader"
            id="file-loader"
            @change="selectFile"
          />
        </div>
        <button @click="uploadFile">Upload</button>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader
  },
  name: "Home",
  data() {
    return {
      selectedFile: null,
      imageSource: null
    };
  },
  methods: {
    selectFile(evt) {
      this.selectedFile = evt.target.files[0];
    },
    uploadFile() {
      this.imageSource = URL.createObjectURL(this.selectedFile);
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

.header {
  padding: 1.5rem;
  background-color: #7344c0;
  color: #fff;
  font-size: 1.5rem;
}

.hero {
  position: relative;
}

$avatar-size: 8rem;

.avatar {
  position: absolute;
  bottom: -2rem;
  left: calc(50% - #{$avatar-size / 2});
  height: $avatar-size;
  width: $avatar-size;
  background-color: lightgreen;
  border: 4px solid #fff;
  border-radius: 50%;
  overflow: hidden;
}
</style>
