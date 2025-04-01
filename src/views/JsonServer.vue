<template>
    <div class="wrap">
        <div class="content">
            <div class="row">
                <div class="col-12 d-flex justify-content-between">

                    <InputText style="width: 60%;" type="text" v-model="searchText" placeholder="搜尋" />
                    <div class=" d-flex gap-2">
                        <Button label="添加" @click="newDialogVisible = true" />

                        <Button label="刪除" @click="deleteDialogVisible = true" />
                        <Button label="測試" @click="test()" />
                    </div>
                </div>
                <div class="col-3 mt-2">
                    <div class="filter-group">
                        <h5>IP</h5>
                        <ul class="filter-list">
                            <div v-for="i in IPList" :key="i">
                                <input :name="i" :id="i" type="checkbox" :value="i" v-model="selectedIPs">
                                <label class="ms-1" :for="i">{{ i }}</label>
                            </div>
                        </ul>
                    </div>
                    <div class="filter-group">
                        <h5>主題</h5>
                        <ul class="filter-list">
                            <div v-for="t in themeList" :key="t">
                                <input :name="t" :id="t" type="checkbox" :value="t" v-model="selectedThemes">
                                <label class="ms-1" :for="t">{{ t }}</label>
                            </div>
                        </ul>
                    </div>
                    <div class="filter-group">
                        <h5>價格</h5>
                        <div class="mb-3">
                            <label for="">最低:</label><br>
                            <InputText v-model.number="selectedPrice[0]" />
                            <br>
                            <label for="">最高:</label><br>
                            <InputText v-model.number="selectedPrice[1]" />
                        </div>
                        <div class="filter-list">
                            <Slider v-model="selectedPrice" range class="w-56" max="50000" />
                        </div>
                    </div>

                </div>
                <div class="card_wrap row col-9">
                    <div class="col-3 p-2" v-for="p in filterProductList" :key="p.id">
                        <div class="card shadow">
                            <img style="aspect-ratio: 1/1;" :src="p.img" :alt="p.productName"
                                class="card-img-top img-fluid">
                            <div class="card-body">
                                <h5 class="card-title fs-4 fw-bold">{{ p.ip }}</h5>
                                <p class="card-text">
                                    <span class="fs-6 fw-bold" style="color: gray;">
                                        {{ p.theme }}
                                    </span>
                                </p>
                                <p class="card-text fs-6 fw-bold">{{ p.productName }}</p>
                                <p class="card-text fw-bold fs-5" style="color: red"> NT${{ p.price }}</p>
                                <div class="d-flex justify-content-between align-items-center">

                                    <a href="#" class="btn btn-outline-danger"><i class="bi bi-heart-fill "></i></a>
                                    <Button label="修改" @click="openUpdateDialog(p)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Dialog v-model:visible="deleteDialogVisible" header="刪除商品" :style="{ width: '40rem' }">
        <div class="d-flex align-items-center gap-4 mb-4">
            <label for="email" class="font-semibold w-24">商品名稱</label>
            <!-- <InputText id="email" class="flex-auto" autocomplete="off" v-model="newProduct.ip"/> -->
            <Select v-model="deleteProductId" :options="productList" optionLabel="productName" optionValue="id"
                placeholder="選擇要刪除的商品" class="w-full md:w-56" />
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3">
            <Button type="button" label="取消" severity="secondary" @click="cancelDeleteProduct()"></Button>
            <Button type="button" label="刪除" @click="deleteProduct()"></Button>
        </div>
    </Dialog>
    <Dialog v-model:visible="newDialogVisible" header="新增商品" :style="{ width: '40rem' }">
        <div class="d-flex align-items-center gap-4 mb-4">
            <label for="email" class="font-semibold w-24">IP</label>
            <!-- <InputText id="email" class="flex-auto" autocomplete="off" v-model="newProduct.ip"/> -->
            <Select v-model="newProduct.ip" :options="ipList" optionLabel="ip" optionValue="ip" placeholder="選擇IP"
                class="w-full md:w-56" />
        </div>
        <div class="d-flex align-items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Theme</label>
            <InputText id="username" class="flex-auto" autocomplete="off" v-model="newProduct.theme" />
        </div>
        <div class="d-flex align-items-center gap-4 mb-4">
            <label for="email" class="font-semibold w-24">ProductName</label>
            <InputText id="email" class="flex-auto" autocomplete="off" v-model="newProduct.productName" />
        </div>

        <div class="d-flex align-items-center gap-4 mb-4">
            <label for="email" class="font-semibold w-24">Price</label>
            <InputText id="email" class="flex-auto" autocomplete="off" v-model.number="newProduct.price" />
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3">
            <Button type="button" label="取消" severity="secondary" @click="cancelAddProduct()"></Button>
            <Button type="button" label="添加" @click="addProduct()"></Button>
        </div>
    </Dialog>
    <Dialog v-model:visible="updateDialogVisible" header="更新商品" :style="{ width: '40rem' }">
        <div class="d-flex align-items-center gap-4 mb-4">
            <label for="email" class="font-semibold w-24">IP</label>
            <!-- <InputText id="email" class="flex-auto" autocomplete="off" v-model="newProduct.ip"/> -->
            <Select v-model="updateProductData.ip" :options="ipList" optionLabel="ip" optionValue="ip"
                placeholder="選擇IP" class="w-full md:w-56" />
        </div>
        <div class="d-flex align-items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Theme</label>
            <InputText id="username" class="flex-auto" autocomplete="off" v-model="updateProductData.theme" />
        </div>
        <div class="d-flex align-items-center gap-4 mb-4">
            <label for="email" class="font-semibold w-24">ProductName</label>
            <InputText id="email" class="flex-auto" autocomplete="off" v-model="updateProductData.productName" />
        </div>

        <div class="d-flex align-items-center gap-4 mb-4">
            <label for="email" class="font-semibold w-24">Price</label>
            <InputText id="email" class="flex-auto" autocomplete="off" v-model.number="updateProductData.price" />
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3">
            <Button type="button" label="取消" severity="secondary" @click="cancelUpdateProduct()"></Button>
            <Button type="button" label="更新" @click="updateProduct()"></Button>
        </div>
    </Dialog>
    <!-- {{ IPList }}
    <br>
    {{ themeList }} -->
</template>

<script setup lang="ts">
import { ref, onMounted, inject, computed } from "vue";
import { apiGetProducts, apiGetIpList, apiPostAddProduct, apiDeleteRemoveProduct, apiPutUpdateProduct, apiTestQueryString } from "../api.js"
//   import Button from "primevue/button"
import Card from 'primevue/card';
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import Slider from 'primevue/slider';
import { Search } from "@vicons/ionicons5";
const $global = inject('$global')

const selectedIPs = ref([])
const selectedThemes = ref([])
const selectedPrice = ref([0, 50000]); // 設定初始值
const IPList = computed(() => {
    return $global.Enumerable.from(productList.value)
        .select(p => p.ip)
        .distinct()
        .toArray()
});
const themeList = computed(() => {
    return $global.Enumerable.from(productList.value)
        .select(p => p.theme)
        .distinct()
        .toArray()
});

// 添加商品視窗
const newDialogVisible = ref(false);
// 刪除商品視窗
const deleteDialogVisible = ref(false);
//更新商品視窗
const updateDialogVisible = ref(false);
// 刪除商品ID
const deleteProductId = ref("");
// 更新商品ID
const updateProductId = ref("");
//新增商品圖片路徑
const newProductImagePath = computed(() => {
    return `/images/${newProduct.value.productName}.jpg`
})
//更新商品圖片路徑
const updateProductImagePath = computed(() => {
    return `/images/${updateProductData.value.productName}.jpg`
})
// 添加商品資料
const newProduct = ref<Product>({
    productName: "",
    theme: "",
    price: null,
    ip: "",
    img:null
});
// 更新商品資料
const updateProductData = ref({
    productName: "",
    theme: "",
    price: null,
    ip: "",
});
// 查詢關鍵字
const searchText = ref("")
// 產品interface
interface Product {
    productName: string;
    theme: string;
    price: number | null;
    ip: string;
    img: string | null;
}
//產品列表
const productList = ref<Product[]>([])
// 範圍後產品列表
// const filterProductList = computed(() => {
//     if (!searchText.value) {
//         return productList.value;
//     }
//     const searchTerm = searchText.value.toLowerCase();
//     return productList.value.filter((product) => {
//     // IP 過濾
//     const ipMatch = selectedIPs.value.length === 0 || selectedIPs.value.includes(product.ip)
//     // 主題過濾
//     const themeMatch = selectedThemes.value.length === 0 || selectedThemes.value.includes(product.theme)

//         return product.productName.toLowerCase().includes(searchTerm) ||
//             product.theme.toLowerCase().includes(searchTerm) ||
//             product.price.toString().toLowerCase().includes(searchTerm) ||
//             product.ip.toLowerCase().includes(searchTerm);
//     });
// });
// 修改 filterProductList 计算属性
const filterProductList = computed(() => {
  return productList.value.filter(product => {
    // IP 過濾
    const ipMatch = selectedIPs.value.length === 0 || selectedIPs.value.includes(product.ip)
    
    // 主题過濾
    const themeMatch = selectedThemes.value.length === 0 || selectedThemes.value.includes(product.theme)
    // 價格過濾
    const priceMatch = product.price >= selectedPrice.value[0] && product.price <= selectedPrice.value[1]

    // 搜索過濾（如果有）
    const searchMatch = !searchText.value || 
      product.productName.toLowerCase().includes(searchText.value.toLowerCase()) ||
      product.theme.toLowerCase().includes(searchText.value.toLowerCase()) ||
      product.ip.toLowerCase().includes(searchText.value.toLowerCase())
    
      return ipMatch && themeMatch && priceMatch && searchMatch
  })
})
//IP列表
const ipList = ref([])
// 添加商品
const addProduct = async () => {
    console.log(newProduct.value)
    newProduct.value.img = newProductImagePath.value
    try {
        const response = await apiPostAddProduct(newProduct.value)
        console.log(response.data)
        fecthData()//更新畫面
    } catch (error) {
        console.log(error)
    } finally {
        newDialogVisible.value = false
    }
}
// 刪除商品
const deleteProduct = async () => {
    console.log(deleteProductId.value)
    // newProduct.value.img = newProductImagePath.value
    try {
        const response = await apiDeleteRemoveProduct(deleteProductId.value)
        console.log(response.data)
        fecthData()//更新畫面
    } catch (error) {
        console.log(error)
    } finally {
        deleteDialogVisible.value = false
    }
}
// 開啟更新商品談窗
const openUpdateDialog = (product: any) => {
    updateProductData.value = deepCopy(product)
    updateDialogVisible.value = true
}
// 深拷貝
const deepCopy = (obj: any) => {
    return JSON.parse((JSON.stringify(obj)))
}
// 更新商品
const updateProduct = async () => {
    // console.log(deleteProductId.value)
    updateProductData.value.img = updateProductImagePath.value
    try {
        const response = await apiPutUpdateProduct(updateProductData.value.id, updateProductData.value)
        console.log(response.data)
        fecthData()//更新畫面
    } catch (error) {
        console.log(error)
    } finally {
        updateDialogVisible.value = false
    }
}
const test = async () => {
    let obj = {
        // id: "5274",
        // productName: "abcd1234",
        // theme: "BabyMollyabc123",
        price: "330",
    }
    try {
        const response = await apiTestQueryString(obj)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }

}
// 取消添加商品
const cancelAddProduct = () => {
    newDialogVisible.value = false
    newProduct.value = {
        productName: "",
        theme: "",
        price: "",
        ip: "",
    }
}
// 取消添加商品
const cancelDeleteProduct = () => {
    deleteDialogVisible.value = false
    deleteProductId.value = ""
}
// 取消添加商品
const cancelUpdateProduct = () => {
    updateDialogVisible.value = false
    updateProductId.value = ""
    updateProductData.value = {
        productName: "",
        theme: "",
        price: "",
        ip: "",
    }
}
//取得商品資料
async function fecthData() {
    try {
        const response = await apiGetProducts()
        productList.value = response.reverse()//反轉陣列，確保最新的在上面
        console.log(response)
    } catch (error) {
        console.log(error)
    }

}
//取得IP列表
async function fecthIpList() {
    try {
        const response = await apiGetIpList()
        ipList.value = response
        console.log(response)
    } catch (error) {
        console.log(error)
    }

}
onMounted(() => {
    fecthData()
    fecthIpList()
})
</script>

<style scoped lang="scss">
.wrap {
    margin: 20px auto;
    width: 80%;

    .content {
        width: 100%;

    }
}

.product-card {
    margin: 5px;
    padding: 10px;
}
</style>