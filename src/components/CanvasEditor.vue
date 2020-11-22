<template>
  <div class="canvas-editor">
    <div class="canvas-editor__canvas">
      <img
        class="canvas-editor__hidden-image"
        ref="image"
        :alt="fileName"
        tabindex="-1"
        @load="setupCanvas"
      />
      <div
        class="canvas-editor__instructions"
        :class="{ 'hide-instructions': isImageLoaded }"
      >
        Please click on the UPLOAD button to display an image file
      </div>
      <canvas ref="canvas" :title="fileName"></canvas>
    </div>

    <div class="canvas-editor__footer">
      <span>Name</span>
      <span :title="fileName">{{ fileName }}</span>
      <app-button @click="openFilePicker">
        <img src="@/assets/triangle.svg" alt="" srcset="" />
        Upload
      </app-button>
    </div>
  </div>
  <input
    type="file"
    class="hidden"
    ref="fileSelector"
    accept="image/png, image/jpeg"
    @change="loadImageFile"
  />
</template>

<script>
import { useCanvas } from "@/utils/canvas-filters";
import AppButton from "@/components/AppButton";

export default {
  components: {
    AppButton
  },
  name: "CanvasEditor",
  props: {
    filterOptions: {
      type: Object,
      default: () => ({ brightness: 0, contrast: 0 })
    }
  },
  emits: ["loaded"],
  data() {
    return {
      fileName: "\xa0",
      canvasFilter: null,
      isImageLoaded: false
    };
  },
  methods: {
    openFilePicker() {
      this.$refs.fileSelector.click();
    },
    loadImageFile(evt) {
      this.fileName = evt.target.files[0].name;
      this.$refs.image.src = URL.createObjectURL(evt.target.files[0]);
      this.$refs.fileSelector.value = null;
    },
    setupCanvas() {
      this.canvasFilter.useImage(this.$refs.image);
      this.isImageLoaded = true;
      this.$emit("loaded", true);
    }
  },
  watch: {
    filterOptions: {
      deep: true,
      handler(val) {
        this.isImageLoaded && this.canvasFilter.applyFilters(val);
      }
    }
  },
  mounted() {
    this.canvasFilter = useCanvas(this.$refs.canvas);
    this.$emit("loaded", false);
  }
};
</script>

<style lang="scss" scoped>
.canvas-editor {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  height: 268px;
  border-radius: $border-radius;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;

  &__hidden-image {
    position: absolute;
    opacity: 0;
    z-index: -10;
  }

  &__canvas {
    position: relative;
    flex: 1;
    overflow: hidden;
  }

  &__instructions {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 80px 40px;
    background-color: $grey-1;
    color: $grey-4;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    border: 1px solid $grey-2;
    border-bottom: 0;
    z-index: -1;

    &.hide-instructions {
      background-color: #fff;
      color: #fff;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid $grey-2;
    border-top: 0;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;

    > span {
      @extend %control-style;

      &:first-of-type {
        background-color: $grey-1;
        border-top-left-radius: $border-radius;
        border-bottom-left-radius: $border-radius;
        color: $grey-4;
      }

      &:last-of-type {
        flex-grow: 1;
        display: block;
        border-left-width: 0;
        border-top-right-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
        color: $green;
        line-height: 28px;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    button {
      margin-left: $gutter;
    }
  }
}
</style>
