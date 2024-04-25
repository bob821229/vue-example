<template>
    <div class="table_wrap">
        {{ test }}
        <button @click="addC">addC</button>
        <table id="myTable" class="table table-striped table-bordered border-dark">
        </table>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import 'bootstrap-table/dist/locale/bootstrap-table-zh-TW.min.js';
import axios from 'axios';
const test = ref({
    a: {
        b: {
            c: 0
        }
    }
})
function addC() {
    test.value.a.b.c++
}
// User相關的 api
const userRequest = axios.create({
    baseURL: '/data'
});
const dataTable = ref([]);
const getData = async () => {
    try {
        const response = await userRequest.get('menuDataSourceList.json');
        options.value.data = response.data;
        initTable()
    } catch (error) {
        console.log(error)
    }
}
const options = ref(
    {
        columns: [
            {
                title: "模組",
                field: "parentMenu",
            },
            {
                title: "功能",
                field: "menu",
            },
            {
                title: "資料名稱",
                field: "dataName",
            },
            {
                title: "資料來源",
                field: "dataSource",
            }
        ],
        data: []
    })
onMounted(async () => {
    await getData();
});
function initTable() {
    $('#myTable' as any).bootstrapTable(options.value);
}
// (波)義式番茄肉醬($12.5*5)
// (波)奶油培根白醬($12.5*5)
// (順)義大利麵條(10)($5.5*10)(我跟姊各5)
// 三星蔥拉餅(10*2)($170*2)(我跟媽)
// 地瓜拉餅(10)($170)(我跟姊各5)
// 金鶴葡萄奶酥(900g)($190)
// 格子網狀脆薯(2kg)($300)(我跟姊各半)
// 卜蜂雞塊(1kg*2)($135*2)(我跟媽)
</script>

<style scoped lang="scss">
.table_wrap {
    width: 80%;
    margin: 100px auto;
}
</style>