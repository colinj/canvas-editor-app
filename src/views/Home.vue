<template>
  <app-header
    title="Brightness & Contrast Developer Test"
    sub-title="01 Jun, 2018 – 31 Dec, 2019"
  />
  <hero-section
    :hero-image="require('@/assets/hero.png')"
    :avatar-image="require('@/assets/profile.png')"
  />
  <div class="controls">
    <range-slider
      v-model="brightness"
      id="brightness"
      label="Brightness"
      text="Slide to adjust image brightness! ☀️"
    />
    <range-slider
      v-model="contrast"
      id="contrast"
      label="Contrast"
      text="Slide to adjust image contrast! 🌓"
    />
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
import AppHeader from "@/components/AppHeader";
import HeroSection from "@/components/HeroSection";
import RangeSlider from "@/components/RangeSlider";

export default {
  components: {
    AppHeader,
    HeroSection,
    RangeSlider
  },
  name: "Home",
  data() {
    return {
      brightness: 50,
      contrast: 0,
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
    },
    updateBrightness(val) {
      console.log("brightness", val);
      // this.brightness = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.controls {
  * + * {
    margin-top: 1.5rem;
  }
}
</style>
