<template>
  <div class="main">
    <div class="image-container">
      <img
        alt="target image"
        ref="imgSource"
        style="opacity:0;position:absolute;z-index:-100"
        @load="copyToCanvas()"
      />
      <canvas class="canvas" ref="canvas"></canvas>

      <div class="control-footer">
        <span>Name</span>
        <span>{{ fileName }}</span>
        <button class="btn" @click="uploadFile">
          <img src="@/assets/triangle.svg" alt="" srcset="" />
          Upload
        </button>
      </div>
    </div>
    <input class="hidden" type="file" ref="fileSelector" @change="selectFile" />
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
    selectFile(evt) {
      console.log(evt.target.files[0]);
      this.fileName = evt.target.files[0].name;
      this.$refs.imgSource.src = URL.createObjectURL(evt.target.files[0]);
    },
    copyToCanvas() {
      const img = this.$refs.imgSource;
      URL.revokeObjectURL(img.src);
      this.$refs.canvas.width = img.width;
      this.$refs.canvas.height = img.height;
      this.context.drawImage(img, 0, 0, img.width, img.height);
      this.imageData = this.context.getImageData(0, 0, img.width, img.height);
      this.$emit("load");
    },
    createImageData() {
      const img = this.$refs.imgSource;
      const imgData = this.context.createImageData(img.width, img.height);
      imgData.data.set(this.imageData.data);
      return imgData;
    },
    applyBrightness(imgData, brightness) {
      const data = imgData.data;
      const factor = brightness * 1.28; // 2.55;
      for (let i = 0; i < data.length; i += 4) {
        data[i] += factor;
        data[i + 1] += factor;
        data[i + 2] += factor;
      }
      return imgData;
    },
    applyContrast(imgData, contrast) {
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
    modifyImg() {
      const imgData = pipe(
        x => this.applyBrightness(x, this.settings.brightness),
        x => this.applyContrast(x, this.settings.contrast)
      )(this.createImageData());

      this.context.putImageData(imgData, 0, 0);
    },
    uploadFile() {
      this.$refs.fileSelector.click();
    }
  },
  watch: {
    settings: {
      deep: true,
      handler() {
        this.modifyImg();
      }
    }
  },
  mounted() {
    this.context = this.$refs.canvas.getContext("2d");
  }
};
</script>

<style lang="scss" scoped>
%control-style {
  padding: 1rem;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25;
  text-transform: uppercase;
  border: 1px solid $grey-2;
}

.hidden {
  display: none;
}

.image-container {
  border: 1px solid $grey-2;
  border-radius: 0.75rem;
  overflow: hidden;
}

.control-footer {
  display: flex;
  align-items: center;
  padding: 1.5rem;

  span {
    @extend %control-style;

    &:first-of-type {
      background-color: $grey-1;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      color: $grey-4;
    }

    &:last-of-type {
      flex-grow: 1;
      border-left-width: 0;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      color: $green;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.btn {
  @extend %control-style;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  border-radius: 5px;
  background-color: $grey-1;
  color: $blue;

  img {
    width: 1em;
    height: 1em;
    margin-right: 0.5em;
  }
}
</style>
