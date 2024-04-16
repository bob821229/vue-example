<template>
  <!-- <Header />
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>


  <RouterView />
 -->

  <n-config-provider :theme="theme" :locale="locale" :date-locale="dateLocale">

    <n-space vertical>
      <n-layout>
        <n-layout-header bordered>
          <n-space justify="space-between" align="center">
            <n-space align="center">
              <!-- logo -->

              <RouterLink to="/">
                <img src="../src/assets/original-removebg-preview.png" style="height: 80px; margin-right: 16px;" alt="">
              </RouterLink>

              <!-- 導覽選項 -->
              <n-menu mode="horizontal" :options="menuOptions" />
            </n-space>


            <div>

              <!-- 主題開關 -->
              模式:
              <n-switch v-model:value="active" size="large">
                <template #checked-icon>
                  <n-icon :component="MoonSharp" />
                </template>
                <template #unchecked-icon>
                  <n-icon :component="Sunny" />
                </template>
              </n-switch>
              語言:
              <n-switch v-model:value="language" size="large" checked-value="中文" unchecked-value="英文">
                <template #checked>
                  中文
                </template>
                <template #unchecked>
                  英文
                </template>
              </n-switch>
            </div>
          </n-space>
        </n-layout-header>

        <n-layout has-sider>
          <RouterView />

        </n-layout>

        <n-layout-footer bordered>
          泡泡馬特沒有股份有限公司
        </n-layout-footer>
      </n-layout>
    </n-space>
  </n-config-provider>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { h, ref, Component } from 'vue'
import { NIcon } from 'naive-ui'
import {
  LaptopOutline as WorkIcon,
  LogOutOutline as HomeIcon,
  Accessibility as AccessibilityIcon
} from '@vicons/ionicons5'

import { darkTheme, zhTW, dateZhTW, enUS, dateEnUS } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { MoonSharp, Sunny } from '@vicons/ionicons5'
import { watch } from 'vue'
const theme = ref(null)
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '首頁' }
      ),
    key: 'go-back-home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/about'
          }
        },
        { default: () => '上班' }
      ),
    key: 'go-to-work',
    icon: renderIcon(WorkIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/PersonnelInformationForm'
          }
        },
        { default: () => '人員資料表' }
      ),
    key: 'go-to-acc',
    icon: renderIcon(AccessibilityIcon)
  }
]

let active = ref(false)
watch(active, (newValue) => {
  theme.value = newValue ? darkTheme : null // 根據 active 的值來切換主題
})
let locale = ref(enUS)
let dateLocale = ref(dateEnUS)
let language = ref('英文')

watch(language, (newValue) => {
  if (newValue === '中文') {
    locale.value = zhTW
    dateLocale.value = dateZhTW
  } else {
    locale.value = enUS
    dateLocale.value = dateEnUS
  }
})
</script>



<style scoped>
.n-layout-sider,
.n-layout {
  min-height: calc(100vh - 110px);
}

.n-switch {
  margin-right: 10px;
}
</style>
