<template>
  <!-- 這是home -->
  <n-layout-sider bordered show-trigger collapse-mode="width" :collapsed-width="100" :width="240"
    :native-scrollbar="false">
    這是左邊
    <n-menu :collapsed-width="100" :collapsed-icon-size="22" :options="menuOptions" />
  </n-layout-sider>

  <n-layout>
    這是右邊
  </n-layout>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { RouterLink, RouterView } from 'vue-router'
import { h, ref, Component } from 'vue'
import {
  LaptopOutline as WorkIcon,
  LogOutOutline as HomeIcon
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

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
  }
]

</script>

<style scoped lang="scss">
.n-layout-sider,
.n-layout {
  min-height: calc(100vh - 110px);
}
</style>