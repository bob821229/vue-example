import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import 'ui-water-jar';


import App from './App.vue'
import router from './router'

// 隨機產生顏色




// 導入 jQuery
import $ from 'jquery';
window.jQuery = window.$ = $; // 将 jQuery 暴露到全局命名空间中
// 導入Bootstrap Table
import 'bootstrap-table';
// 導入Bootstrap Table的css
import 'bootstrap-table/dist/bootstrap-table.min.css';
// 導入Bootstrap 的CSS
import 'bootstrap/dist/css/bootstrap.css';
// 導入Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle';
//導入 Bootstrap Icons 的 CSS 
import 'bootstrap-icons/font/bootstrap-icons.css';
import { defineCustomElements } from 'ui-water-jar/loader';
defineCustomElements();

const app = createApp(App)
app.use(naive)
app.use(createPinia())
app.use(router)


app.mount('#app')
