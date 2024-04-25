<template>
  <div class="wrap">
    <n-space>
      <div
        style="display: flex;flex-direction: column;gap: 50px;padding: 20px;justify-content: center;align-items: center;height: 100%;min-width: 400px;">

        <n-color-picker v-model:value="color" />
        <n-radio-group v-model:value="shape" name="radiobuttongroup1">
          <n-radio-button value="rect" label="rect" />
          <n-radio-button value="circle" label="circle" />
        </n-radio-group>
        <n-slider v-model:value="value" :step="5" />
      </div>
      <div>
        <div class="water-jar-wrap">
          <ui-water-jar :value="value"></ui-water-jar>
          <span class="water-jar-value">
            {{ value }}%
          </span>

        </div>
        <div class="water-jar-wrap">

          <ui-water-jar :value="value" :color="color" :shape="shape"></ui-water-jar>
          <span class="water-jar-value">
            {{ value }}%
          </span>
        </div>
      </div>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const value = ref(50)
const shape = ref('rect')
const color = ref('#18A058')
function changeShape() {
  shape.value = shape.value === 'rect' ? 'circle' : 'rect'
}

// #F4DB23FF
watch(value, (newValue) => {
  if (newValue < 30) {
    color.value = '#BC1B1BFF'
  } else if (newValue < 60) {
    color.value = '#F4DB23FF'
  } else {
    color.value = '#18A058'
  }
}, { immediate: true })
</script>

<style scoped lang="scss">
.wrap {
  width: 80%;
  margin: 100px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.water-jar-wrap {
  width: 300px;
}

.water-jar-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  z-index: 10;
}
</style>