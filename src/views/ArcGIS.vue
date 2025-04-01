<template>
    <div style="display: flex;flex-direction: column;width: 100%;">
        <div>
            <select v-model="selectedLayer">
                <option disabled value="">請選擇圖層</option>
                <option value="BB_5">BB_5圳路渠道_桃管_石管_幹支線</option>
                <option value="BB_6">BB_6埤塘_1120512_桃管_石管</option>
                <option value="BB_4">BB_4水利小組範圍_桃管_石管</option>
                <option value="BB_3">BB_3工作站範圍_桃管_石管</option>
            </select>
        </div>

        <n-space item-style="display: flex;">
            <n-checkbox v-model="item.visible" :label="item.id" v-for="item in sublayers" :key="item.id" />
        </n-space>
        <div class="map_wrap" style="width: 100%;">
            <div id="mapViewDiv"></div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";

const selectedLayer = ref(""); // 用於存儲選中的圖層名稱
const mapViewDiv = ref(null);
let mapImageLayer = null; // MapImageLayer 實例

const sublayers = ref([
    { id: 3, visible: true },
    { id: 2, visible: true },
    { id: 1, visible: true },
    { id: 0, visible: true }
]);

// 監聽 sublayers 的變化並更新 MapImageLayer
watch(sublayers, (newSublayers) => {
    if (mapImageLayer) {
        newSublayers.forEach((layer) => {
            const mapLayer = mapImageLayer.findSublayerById(layer.id);
            if (mapLayer) {
                mapLayer.visible = layer.visible;
            }
        });
    }
}, { deep: true });


onMounted(() => {
    const map = new Map({
        // basemap: null,
    });

    const tiledLayer1 = new WebTileLayer({
        urlTemplate: "https://wmts.nlsc.gov.tw/wmts/PHOTO_MIX/default/GoogleMapsCompatible/{z}/{y}/{x}",
        // subDomains: ["a", "b", "c"],
        // copyright: 'Map data from &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> Map design by &copy; <a href="http://opentopomap.org/" target="_blank">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank">CC-BY-SA</a>) contributors'
    });

    map.add(tiledLayer1);

    const tileLayer = new TileLayer({
        url: "https://gisportal.triwra.org.tw/server/rest/services/Hosted/Hillshade_80_2022/MapServer"
        // urlTemplate: "https://wmts.nlsc.gov.tw/wmts/PHOTO_MIX/default/GoogleMapsCompatible/{z}/{y}/{x}"
    });

    // 將瓦片圖層添加到地圖中
    // map.add(tileLayer);

    // 創建 MapImageLayer 並將其添加到地圖中
    mapImageLayer = new MapImageLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
        sublayers: sublayers.value
    });
    map.add(mapImageLayer);

    const view = new MapView({
        container: "mapViewDiv",
        map: map,
        zoom: 8,
        center: [121.3, 23]
    });
});
</script>


<style scoped>
.map_wrap {
    padding: 10px;
    width: 100%;
    background-color: #b2d;
}

#mapViewDiv {
    width: 100%;
    height: 1000px;
}
</style>