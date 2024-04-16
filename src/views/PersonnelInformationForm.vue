<template>



    <!-- 模板内容 -->
    <!-- <n-date-picker v-model:value="timestamp" type="monthrange" clearable /> -->
    <!-- <pre>{{ JSON.stringify(timestamp) }}</pre> -->
    <n-space vertical class="n-form-wrap">
        <n-form ref="formRef" :rules="rules" size="large" label-placement="top">
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="12" label="人員編號">
                    <n-input v-model:value="model.number" placeholder="人員編號" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="進用部門">
                    <n-select v-model:value="model.department" placeholder="進用部門" :options="departmentOptions" />
                </n-form-item-gi>
                <!-- <n-form-item-gi :span="12" label="到職日">
                    <n-date-picker v-model:value="model.arrivalDate" type="date" />
                </n-form-item-gi> -->
                <n-form-item-gi :span="12" label="姓名">
                    <n-input v-model:value="model.name" placeholder="姓名" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="身分證號">
                    <n-input v-model:value="model.idNumber" placeholder="身分證號" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="連絡電話">
                    <n-input v-model:value="model.homePhone" placeholder="連絡電話" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="行動電話">
                    <n-input v-model:value="model.phone" placeholder="行動電話" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="戶籍地址">
                    <n-input v-model:value="model.phone" placeholder="戶籍地址" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="通訊地址">
                    <n-input v-model:value="model.phone" placeholder="通訊地址" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="E-mail">
                    <n-input v-model:value="model.phone" placeholder="E-mail" />
                </n-form-item-gi>
                <n-form-item-gi :span="12">

                </n-form-item-gi>
                <n-form-item-gi :span="8" label="特殊身分">
                    <n-checkbox-group v-model:value="model.checkboxGroupValue">
                        <n-space>
                            <n-checkbox value="原住民">
                                原住民
                            </n-checkbox>
                            <n-checkbox value="身心障礙">
                                身心障礙
                            </n-checkbox>
                        </n-space>
                    </n-checkbox-group>
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="駕照">
                    <n-checkbox-group v-model:value="model.checkboxGroupValue2">
                        <n-space>
                            <n-checkbox value="汽車">
                                汽車
                            </n-checkbox>
                            <n-checkbox value="機車">
                                機車
                            </n-checkbox>
                            <n-checkbox value="無">
                                無
                            </n-checkbox>
                        </n-space>
                    </n-checkbox-group>
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="婚姻狀況">
                    <n-radio-group v-model:value="model.checkboxGroupValue3" name="radiogroup1">
                        <n-space>
                            <n-radio value="已婚">
                                已婚
                            </n-radio>
                            <n-radio value="未婚">
                                未婚
                            </n-radio>
                            <n-radio value="其他">
                                其他
                            </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item-gi>
                <n-gi :span="24">
                    <div style="font-size: 20px;margin-bottom: 10px;margin-top: 20px;">
                        教育程度 :
                    </div>
                </n-gi>
                <n-form-item-gi :span="8" label="學校名稱">
                    <n-input v-model:value="model.phone" placeholder="學校名稱" />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="科系">
                    <n-input v-model:value="model.phone" placeholder="科系" />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="修業起訖年月">
                    <n-date-picker v-model:value="timestamp" type="monthrange" clearable />
                </n-form-item-gi>
                <n-gi :span="24">
                    <div style="font-size: 20px;margin-bottom: 10px;margin-top: 20px;">
                        職務經歷 :
                    </div>
                </n-gi>
                <n-form-item-gi :span="4" label="原服務單位名稱">
                    <n-input v-model:value="model.phone" placeholder="原服務單位名稱" />
                </n-form-item-gi>
                <n-form-item-gi :span="4" label="職稱">
                    <n-input v-model:value="model.phone" placeholder="職稱" />
                </n-form-item-gi>
                <n-form-item-gi :span="4" label="薪資(元)">
                    <n-input v-model:value="model.phone" placeholder="薪資" />
                </n-form-item-gi>
                <n-form-item-gi :span="6" label="離職原因">
                    <n-input v-model:value="model.phone" placeholder="離職原因" />
                </n-form-item-gi>
                <n-form-item-gi :span="6" label="服務起訖年月">
                    <n-date-picker v-model:value="timestamp" type="monthrange" clearable />
                </n-form-item-gi>


            </n-grid>
        </n-form>

        <p>
            {{ model }}
        </p>
    </n-space>

</template>


<script setup lang="ts">
import { ref } from 'vue'
import { FormInst, FormItemRule, useMessage } from 'naive-ui'


const timestamp = ref<[number, number]>([1183135260000, Date.now()])
const model = ref({
    number: '',
    department: '',
    arrivalDate: '',
    name: '',
    idNumber: '',
    homePhone: '',
    phone: '',
    checkboxGroupValue: [],
    checkboxGroupValue2: [],
    checkboxGroupValue3: []
})

const rules = ref(
    {
        number: {
            required: true,
            trigger: ['blur', 'input'],
            message: '请输入 inputValue'
        }
    }
)
const departmentOptions = ref([
    {
        label: '請選擇部門',
        value: '',
        disabled: true
    },
    {
        label: '數發處',
        value: '數發處'
    },
    {
        label: '研究一所',
        value: '研究一所'
    },
    {
        label: '研究二所',
        value: '研究二所'
    },
    {
        label: '研究三所',
        value: '研究三所'
    },
    {
        label: '研究四所',
        value: '研究四所'
    }
])
</script>


<style scoped lang="scss">
.n-gi {
    font-size: 20px;
}

.n-form-wrap {
    width: 100%;
    max-width: 1280px;
    margin: 100px auto;
    padding: 20px;
    border-radius: 10px;

}
</style>