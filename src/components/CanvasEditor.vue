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
        :class="{ 'hide-instructions': isCanvasReady }"
      >
        Please click on the UPLOAD button to display an image file
      </div>
      <canvas ref="canvas" :title="fileName"></canvas>
    </div>

    <div class="canvas-editor__footer">
      <span>Name</span>
      <span :title="fileName">{{ fileName }}</span>
      <app-button @click="openFilePicker">
        <img src="@/assets/triangle.svg" />
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
import { onMounted, ref, watch } from "vue";
import { useCanvas } from "@/utils/canvas-filters";
import AppButton from "@/components/AppButton";

const useFilePicker = image => {
  const fileSelector = ref(null);
  const fileName = ref("\xa0");

  const openFilePicker = () => fileSelector.value.click();

  const loadImageFile = evt => {
    fileName.value = evt.target.files[0].name;
    image.value.src = URL.createObjectURL(evt.target.files[0]);
    fileSelector.value.value = null;
  };

  return {
    fileSelector,
    fileName,
    openFilePicker,
    loadImageFile
  };
};

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
  setup(props, { emit }) {
    let canvasFilter;

    const image = ref(null);
    const canvas = ref(null);
    const isCanvasReady = ref(false);

    const setupCanvas = () => {
      canvasFilter.copyImage(image.value);
      isCanvasReady.value = true;
      emit("loaded", true);
    };

    watch(
      () => props.filterOptions,
      options => isCanvasReady.value && canvasFilter.applyFilters(options),
      { deep: true }
    );

    onMounted(() => {
      canvasFilter = useCanvas(canvas.value);
      emit("loaded", false);
    });

    return {
      image,
      canvas,
      isCanvasReady,
      ...useFilePicker(image),
      setupCanvas
    };
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
  mask-image: -webkit-radial-gradient(white, black);
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
