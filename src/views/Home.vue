<template>
  <app-header
    title="Brightness & Contrast Developer Test"
    sub-title="01 Jun, 2018 – 31 Dec, 2020"
  />
  <hero-section
    :hero-image="require('@/assets/hero.png')"
    :profile-pic="require('@/assets/profile.png')"
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
import AppHeader from "@/components/AppHeader";
import HeroSection from "@/components/HeroSection";
import RangeSlider from "@/components/RangeSlider";
import CanvasEditor from "@/components/CanvasEditor";

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
