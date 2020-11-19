<template>
  <div class="main">
    <div class="image-container">
      <img
        class="hide-image"
        ref="imgSource"
        :alt="fileName"
        tabindex="-1"
        @load="setupCanvas"
      />
      <canvas class="canvas" ref="canvas" :title="fileName"></canvas>

      <div class="control-footer">
        <span>Name</span>
        <span :title="fileName">{{ fileName }}</span>
        <button class="btn" @click="openFilePicker">
          <img src="@/assets/triangle.svg" alt="" srcset="" />
          Upload
        </button>
      </div>
    </div>
    <input
      type="file"
      class="hidden"
      ref="fileSelector"
      @change="loadImageFile"
    />
  </div>
</template>

<script>
const pipe = (...fns) => initVal => fns.reduce((val, fn) => fn(val), initVal);

export default {
  components: {},
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
      imageData: {}
    };
  },
  methods: {
    openFilePicker() {
      this.$refs.fileSelector.click();
    },
    loadImageFile(evt) {
      console.log(evt.target.files[0]);
      this.fileName = evt.target.files[0].name;
      this.$refs.imgSource.src = URL.createObjectURL(evt.target.files[0]);
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
      const img = this.$refs.imgSource;
      const imgData = this.context.createImageData(img.width, img.height);
      imgData.data.set(this.imageData.data);
      return imgData;
    },
    filterBrightness(imgData, brightness) {
      const data = imgData.data;
      const factor = brightness * 1.28; // 2.55;
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
.image-container {
  border: 1px solid $grey-2;
  border-radius: $border-radius-lg;
  overflow: hidden;
}

.hide-image {
  position: absolute;
  opacity: 0;
  z-index: -10;
}
.control-footer {
  display: flex;
  align-items: center;
  padding: 1.5rem;

  span {
    @extend %control-style;

    &:first-of-type {
      background-color: $grey-1;
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
      color: $grey-4;
    }

    &:last-of-type {
      flex-grow: 1;
      border-left-width: 0;
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
      color: $green;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.btn {
  margin-left: 1.5rem;
}
</style>
