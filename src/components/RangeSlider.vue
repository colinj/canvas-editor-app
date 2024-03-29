<template>
  <div class="range-slider" :class="[colorClass, disabledState]">
    <label :for="id">{{ label }}</label>
    <div class="range-slider__container">
      <div class="range-slider__track"></div>
      <div
        class="range-slider__progress"
        :style="{ width: `${percentage}%` }"
      ></div>
      <input
        type="range"
        :name="id"
        :id="id"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.valueAsNumber)"
      />
      <div class="range-slider__value" :style="{ left: valuePosition }">
        {{ modelValue }}
      </div>
    </div>
    <span>{{ text }}</span>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "RangeSlider",
  props: {
    modelValue: {
      type: Number
    },
    id: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: null
    },
    label: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: ""
    },
    min: {
      type: Number,
      default: -100
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const percentage = computed(
      () => ((props.modelValue - props.min) / (props.max - props.min)) * 100
    );
    const valuePosition = computed(
      () => `calc(${percentage.value * 0.945}% - 3px)`
    );
    const colorClass = computed(() =>
      props.color ? `range-slider--${props.color}` : null
    );
    const disabledState = computed(() =>
      props.disabled ? "range-slider--disabled" : null
    );

    return {
      percentage,
      valuePosition,
      colorClass,
      disabledState
    };
  }
};
</script>

<style lang="scss" scoped>
$thumb-size: 15px;
$track-h: math.div($thumb-size, 3);
$radius-size: math.div($track-h, 2);

@mixin slider-thumb {
  &::-webkit-slider-thumb {
    position: relative;
    @content;
  }

  &::-moz-range-thumb {
    @content;
  }

  &::-ms-thumb {
    @content;
  }
}

@mixin slider-color($color) {
  label {
    color: $color;
  }

  input[type="range"] {
    @include slider-thumb {
      background-color: $color;

      &:active {
        background-color: darken($color, 10%);
      }
    }
  }

  .range-slider__track {
    background-color: rgba($color, 0.25);
  }
  .range-slider__progress {
    background-color: $color;
  }
}

.range-slider {
  @include slider-color($purple);
  position: relative;
  height: 88px;
  padding: 5px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: $border-radius;

  &:focus-within {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  }

  label {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 5px;
    font-size: $font-size-lg;
  }

  &__value {
    position: absolute;
    top: -25px;
    width: 25px;
    padding: 1px 0;
    background-color: $grey-1;
    border-radius: 2px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);
    font-size: $font-size-xs;
    text-align: center;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.2s ease-in-out;
  }
  &__container {
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 40px;
    height: $track-h;
    border-radius: $radius-size;
  }

  &__track,
  &__progress {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: $radius-size;
  }

  input[type="range"] {
    width: 100%;
    height: $track-h;
    background-color: transparent;
    z-index: 1;

    &,
    &::-webkit-slider-runnable-track,
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
    }

    &:active + .range-slider__value {
      opacity: 1;
    }

    @include slider-thumb {
      height: $thumb-size;
      width: $thumb-size;
      border-radius: 50%;
      box-shadow: 0 0 0 3px #fff;
      cursor: ew-resize;

      &:active {
        height: $thumb-size * 1.1;
        width: $thumb-size * 1.1;
      }
    }

    &:focus {
      outline: none;
    }
  }

  span {
    display: block;
    margin-top: 15px;
    font-size: $font-size-sm;
  }

  &--blue {
    @include slider-color($blue);
  }

  &--green {
    @include slider-color($green);
  }
  &--disabled {
    @include slider-color($grey-3);

    input[type="range"] {
      @include slider-thumb {
        cursor: not-allowed;
      }
    }

    span {
      color: $grey-3;
    }
  }
}
</style>
