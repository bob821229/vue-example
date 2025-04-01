import './assets/main.css'

import { createApp,provide } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
// import 'ui-water-jar';
import { defineCustomElements } from 'ui-water-jar/loader';
defineCustomElements();
import App from './App.vue'
import router from './router'

// 隨機產生顏色




// 導入 jQuery
// import $ from 'jquery';
// window.jQuery = window.$ = $; // 将 jQuery 暴露到全局命名空间中
// 引入 jQuery 和 Summernote
import $ from 'jquery';
import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite.js';

// 將 jQuery 註冊到全域
(window as any).$ = $;
(window as any).jQuery = $;
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


import '@arcgis/core/assets/esri/themes/light/main.css';
import qs from 'qs';
// qs.parse() 把url的query string轉換成物件
// qs.stringify() 把物件轉換成url的query string
import Enumerable from 'linq'
// 全域常數provide，用於各組件inject(注入)

// 引入PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import Button from "primevue/button"
import * as d3 from "d3"; // 引入d3




const app = createApp(App)
// 全域常數provide，用於各組件inject(注入)
app.provide("$global", {
    qs,
    Enumerable
});
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(naive)
app.use(createPinia())
app.use(router)
app.component('Button', Button);


app.mount('#app')
