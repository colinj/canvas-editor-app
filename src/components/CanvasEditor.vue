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
      context: null,
      imageData: {}
    };
  },
  methods: {
    selectFile(evt) {
      console.log(evt.target.files[0]);
      this.$refs.imgSource.src = URL.createObjectURL(evt.target.files[0]);
    },
    copyToCanvas() {
      const img = this.$refs.imgSource;
      URL.revokeObjectURL(img.src);
      this.$refs.canvas.width = img.width;
      this.$refs.canvas.height = img.height;
      this.context.drawImage(img, 0, 0, img.width, img.height);
      this.imageData = this.context.getImageData(0, 0, img.width, img.height);
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

<style lang="scss" scoped></style>
