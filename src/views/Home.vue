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
      v-model="settings.brightness"
      id="brightness"
      label="Brightness"
      text="Slide to adjust image brightness! ☀️"
      color="blue"
    />
    <range-slider
      v-model="settings.contrast"
      id="contrast"
      label="Contrast"
      text="Slide to adjust image contrast! 🌓"
      color="green"
    />
  </div>
  <canvas-editor :settings="settings" />
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
      settings: { brightness: 0, contrast: 0 }
    };
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
