<template>
    <!-- <div id="myChart" :style="{ width: '80%', height: '500px', margin: '50px auto' }"></div>
    <span :style="{ color: color }">{{ color }}</span>
    <button @click="ColorCode()">ccc</button> -->
    <div style="display: flex;flex-direction: column;">
        <div>{{ dataArrays }}</div>
        <p></p>
        <div>{{ processData(dataArrays) }}</div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';



const myChart = ref<echarts.ECharts | null>(null);
const color = ref<string>('123');
// 隨機產生顏色
function ColorCode() {
    let makingColorCode = '0123456789ABCDEF';
    let finalCode = '#';
    for (let counter = 0; counter < 6; counter++) {
        finalCode = finalCode + makingColorCode[Math.floor(Math.random() * 16)];
    }

    color.value = finalCode;
    return finalCode
}


let dataArrays = ref([
    [null, null, -1, -1.5, -1, null, -0.75, null, null, -1, -1.5, -1, null, -0.75, null, null, -1, -1.5, -1, null, -0.75],
    [null, null, -2, -1.5, -1.5, null, -1.75, null, null, -5, -1.5, -1, null, -0.75, null, null, -2.5, -1.5, -1, null, -0.75]
])
const series = ref([])
function processData(data: (number | null)[]) {
    const result: any[] = [];

    dataArrays.value.forEach((data, index) => {
        const color = ColorCode() // 设置颜色

        // 处理数据
        const newData = data.map(value => (value === null ? 0 : value));

        // 创建系列对象
        result.push({
            name: `108年`, // 设置名称
            data: newData,
            type: 'line',
            lineStyle: {
                normal: {
                    color: color,
                    width: 4,
                    type: 'dashed'
                }
            }
        });

        // 创建第二个系列对象
        result.push({
            data: data,
            type: 'line',
            lineStyle: {
                normal: {
                    color: color,
                    width: 4,
                }
            }
        });
    });
    console.log("這4結果:", result)
    return result;
}


onMounted(() => {
    const chartElement = document.getElementById('myChart');
    if (chartElement) {
        myChart.value = echarts.init(chartElement);

        myChart.value.setOption(
            {
                xAxis: {
                    type: 'category',
                    data: [
                        '5.上',
                        '5.中',
                        '5.下',
                        '6.上',
                        '6.中',
                        '6.下',
                        '7.上',
                        '7.中',
                        '7.下',
                        '8.上',
                        '8.中',
                        '8.下',
                        '9.上',
                        '9.中',
                        '9.下',
                        '10.上',
                        '10.中',
                        '10.下',
                        '11.上',
                        '11.中',
                        '11.下',
                        '12.上',
                        '12.中',
                        '12.下',
                        '1.上',
                        '1.中',
                        '1.下',
                        '2.上',
                        '2.中',
                        '2.下',
                        '3.上',
                        '3.中',
                        '3.下',
                        '4.上',
                        '4.中',
                        '4.下'
                    ],
                    axisLabel: {
                        interval: 1,
                        showMinLabel: true,
                        showMaxLabel: true
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '132',
                        data: [0, 0, -1, -1.5, -1, 0, -0.75, 0, 0, -1, -1.5, -1, 0, -0.75, 0, 0, -1, -1.5, -1, 0, -0.75],
                        type: 'line',
                        lineStyle: {
                            normal: {
                                color: 'green',
                                width: 4,
                                type: 'dashed'
                            }
                        }
                    },
                    {
                        data: [null, null, -1, -1.5, -1, null, -0.75, null, null, -1, -1.5, -1, null, -0.75, null, null, -1, -1.5, -1, null, -0.75],
                        type: 'line',
                        lineStyle: {
                            normal: {
                                color: 'green',
                                width: 4,
                            }
                        }
                    },
                    {
                        data: [-2, -3, -1.75, -1.25, 0, 0, -3.75],
                        type: 'line',
                        lineStyle: {
                            normal: {
                                color: 'red',
                                width: 4,
                                type: 'dashed'
                            }
                        }
                    },
                    {
                        data: [-2, -3, -1.75, -1.25, null, null, -3.75],
                        type: 'line',
                        lineStyle: {
                            normal: {
                                color: 'red',
                                width: 4,
                            }
                        }
                    }
                ],
                tooltip: {
                    trigger: 'item'
                }
            });
    }
});
</script>

<style scoped lang="scss"></style>