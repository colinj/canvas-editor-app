<template>
  <div class="canvas-editor">
    <div class="canvas-editor__canvas">
      <img
        class="canvas-editor__hidden-image"
        ref="imgSource"
        :alt="fileName"
        tabindex="-1"
        @load="setupCanvas"
      />
      <div v-if="!imageData" class="canvas-editor__instructions">
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
import AppButton from "@/components/AppButton";

const pipe = (...fns) => initVal => fns.reduce((val, fn) => fn(val), initVal);

export default {
  components: {
    AppButton
  },
  name: "CanvasEditor",
  props: {
    settings: {
      type: Object,
      default: () => ({ brightness: 0, contrast: 0 })
    }
  },
  data() {
    return {
      fileName: "\xa0",
      context: null,
      imageData: null
    };
  },
  methods: {
    openFilePicker() {
      this.$refs.fileSelector.click();
    },
    loadImageFile(evt) {
      this.fileName = evt.target.files[0].name;
      this.$refs.imgSource.src = URL.createObjectURL(evt.target.files[0]);
      this.$refs.fileSelector.value = null;
    },
    setupCanvas() {
      const img = this.$refs.imgSource;
      URL.revokeObjectURL(img.src);
      this.$refs.canvas.width = img.width;
      this.$refs.canvas.height = img.height;
      this.context.drawImage(img, 0, 0, img.width, img.height);
      this.imageData = this.context.getImageData(0, 0, img.width, img.height);
      this.$emit("loaded");
    },
    getImageData() {
      const canvas = this.$refs.canvas;
      const imgData = this.context.createImageData(canvas.width, canvas.height);
      imgData.data.set(this.imageData.data);
      return imgData;
    },
    filterBrightness(imgData, brightness) {
      const data = imgData.data;
      const factor = brightness * 2; // Originally 2.55 but was reduced to be more granular.
      for (let i = 0; i < data.length; i += 4) {
        data[i] += factor;
        data[i + 1] += factor;
        data[i + 2] += factor;
      }
      return imgData;
    },
    filterContrast(imgData, contrast) {
      const data = imgData.data;
      const factor =
        (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));

      for (var i = 0; i < data.length; i += 4) {
        data[i] = factor * (data[i] - 128.0) + 128.0;
        data[i + 1] = factor * (data[i + 1] - 128.0) + 128.0;
        data[i + 2] = factor * (data[i + 2] - 128.0) + 128.0;
      }
      return imgData;
    },
    applyFilters({ brightness, contrast }) {
      const imgData = pipe(
        img => this.filterBrightness(img, brightness),
        img => this.filterContrast(img, contrast)
      )(this.getImageData());

      this.context.putImageData(imgData, 0, 0);
    }
  },
  watch: {
    settings: {
      deep: true,
      handler(val) {
        this.applyFilters(val);
      }
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext("2d");
  }
};
</script>

<style lang="scss" scoped>
.canvas-editor {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  height: 268px;
  border: 1px solid $grey-2;
  border-radius: $border-radius;
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
    padding: 80px 40px;
    height: 100%;
    background-color: $grey-1;
    color: $grey-4;
  }

  &__footer {
    display: flex;
    align-items: center;
    padding: 10px;

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
