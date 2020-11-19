<template>
  <app-header
    title="Brightness & Contrast Developer Test"
    sub-title="01 Jun, 2018 – 31 Dec, 2020"
  />
  <hero-section
    :hero-image="require('@/assets/hero.png')"
    :avatar-image="require('@/assets/profile.png')"
  />
  <div class="controls">
    <range-slider
      v-model="settings.brightness"
      id="brightness"
      label="Brightness"
      text="Slide to adjust image brightness! ☀️"
      color="blue"
      :disabled="disabledControls"
    />
    <range-slider
      v-model="settings.contrast"
      id="contrast"
      label="Contrast"
      text="Slide to adjust image contrast! 🌓"
      color="green"
      :disabled="disabledControls"
    />
    <canvas-editor :settings="settings" @load="imageLoaded" />
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
      settings: { brightness: 0, contrast: 0 }
    };
  },
  methods: {
    imageLoaded() {
      this.disabledControls = false;
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
