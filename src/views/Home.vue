<template>
  <app-header
    title="Brightness & Contrast Developer Test"
    sub-title="01 Jun, 2018 – 31 Dec, 2020"
  />
  <hero-section
    :hero-image="heroImage"
    :profile-pic="profilePic"
    profile-name="Colin Johnsun"
  />
  <div class="controls">
    <range-slider
      v-model="options.brightness"
      id="brightness"
      label="Brightness"
      text="Slide to adjust image brightness! ☀️"
      color="green"
      :disabled="disabledControls"
    />
    <range-slider
      v-model="options.contrast"
      id="contrast"
      label="Contrast"
      text="Slide to adjust image contrast! 🌓"
      color="blue"
      :disabled="disabledControls"
    />
    <canvas-editor :filter-options="options" @loaded="imageLoaded" />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import HeroSection from "@/components/HeroSection.vue";
import RangeSlider from "@/components/RangeSlider.vue";
import CanvasEditor from "@/components/CanvasEditor.vue";
import heroImage from "@/assets/hero.png";
import profilePic from "@/assets/profile.png";

export default {
  components: {
    AppHeader,
    HeroSection,
    RangeSlider,
    CanvasEditor
  },
  name: "Home",
  data() {
    return {
      heroImage: heroImage,
      profilePic: profilePic,
      disabledControls: true,
      options: this.initaliseOptions()
    };
  },
  methods: {
    initaliseOptions() {
      return { brightness: 0, contrast: 0 };
    },
    imageLoaded(val) {
      this.disabledControls = !val;
      this.options = this.initaliseOptions();
    }
  }
};
</script>

<style lang="scss" scoped>
.controls {
  @extend %stacked-items;
  padding: 0 $gutter;
}
</style>
