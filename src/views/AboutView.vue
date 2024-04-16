<template>
  上班
  <ui-water-jar :value="42" color="#c0392b" shape="rect"></ui-water-jar>
  <ui-water-jar :value="67"></ui-water-jar>


  <n-auto-complete v-model:value="value" :input-props="{
    autocomplete: 'disabled'
  }" :options="options" placeholder="輸入email" clearable />

  <n-form ref="formRef" inline :label-width="80" :model="formValue" :rules="rules" :size="size">
    <n-form-item label="姓名" path="user.name">
      <n-input v-model:value="formValue.user.name" placeholder="輸入姓名" />
    </n-form-item>
    <n-form-item label="年齡" path="user.age">
      <n-input v-model:value="formValue.user.age" placeholder="輸入年齡" />
    </n-form-item>
    <n-form-item label="電話號碼" path="phone">
      <n-input v-model:value="formValue.phone" placeholder="輸入電話" />
    </n-form-item>
    <n-form-item label="信箱" path="phone">
      <!-- <n-input v-model:value="formValue.email" placeholder="輸入email" /> -->
      <n-auto-complete v-model:value="formValue.email" :input-props="{
    autocomplete: 'disabled'
  }" :options="options" placeholder="輸入email" clearable />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">
        驗證
      </n-button>
    </n-form-item>
  </n-form>

  {{ formValue }}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { FormInst, useMessage } from 'naive-ui'

const value = ref('')
const options = computed(() => {
  return ['@gmail.com', '@hotmail.com', '@yahoo.com.tw'].map((suffix) => {
    const prefix = value.value.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
})

const formRef = ref<FormInst | null>(null)
const formValue = ref({
  user: {
    name: '',
    age: ''
  },
  phone: '',
  email: ''
})
const rules = {
  user: {
    name: {
      required: true,
      message: '請輸入姓名',
      trigger: 'blur'
    },
    age: {
      required: true,
      message: '請輸入年齡',
      trigger: ['input', 'blur']
    }
  },
  phone: {
    required: true,
    message: '請輸入電話號碼',
    trigger: 'blur'
  }
}
const size = ref<'medium' | 'small' | 'mini'>('medium')
const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('validate success:', formValue.value)
    } else {
      console.log('validate failed:', errors)
    }
  })
}

</script>

<style scoped lang="scss"></style>