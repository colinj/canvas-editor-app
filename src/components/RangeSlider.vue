<template>
  <div class="range-slider">
    <label :for="id">{{ label }}</label>
    <input
      type="range"
      :name="id"
      :id="id"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.valueAsNumber)"
    />
    <span>{{ text }}</span>
  </div>
</template>

<script>
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
    }
  }
};
</script>

<style lang="scss" scoped>
.range-slider {
  padding: 1.5rem 3rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  label {
    display: block;
    font-size: 2rem;
  }

  input[type="range"] {
    margin-top: 1.5rem;
    width: 100%;
  }

  span {
    display: block;
    margin-top: 1.5rem;
    font-size: 1.5rem;
  }
}
</style>
