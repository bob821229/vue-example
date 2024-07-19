<template>

    <!-- <n-button @click="test">Default</n-button> -->

    <!-- 模板内容 -->
    <n-space vertical class="n-form-wrap">
        <n-form ref="formRef" :rules="rules" size="large" label-placement="top">
            <n-grid :cols="24" :x-gap="24">
                <n-gi :span="24">
                    <n-divider>基本資料</n-divider>
                </n-gi>
                <n-form-item-gi :span="8">
                    <template #label>
                        人員編號
                        <span style="color: red">*</span>
                    </template>
                    <n-input v-model:value="model.employeeId" placeholder="人員編號" />
                </n-form-item-gi>
                <n-form-item-gi :span="8">
                    <template #label>
                        進用部門
                        <span style="color: red">*</span>
                    </template>
                    <n-select v-model:value="model.department" placeholder="進用部門" :options="departmentOptions" />
                </n-form-item-gi>
                <n-form-item-gi :span="8">
                    <template #label>
                        到職日
                        <span style="color: red">*</span>
                    </template>
                    <n-date-picker v-model:value="model.arrivalDate" type="date" />
                </n-form-item-gi>
                <n-form-item-gi :span="8">
                    <template #label>
                        姓名
                        <span style="color: red">*</span>
                    </template>
                    <n-input v-model:value="model.name" placeholder="姓名" />
                </n-form-item-gi>
                <n-form-item-gi :span="8">
                    <template #label>
                        身分證號
                        <span style="color: red">*</span>
                    </template>
                    <n-input v-model:value="model.idNumber" placeholder="身分證號" show-count :maxlength="10" />
                </n-form-item-gi>
                <n-form-item-gi :span="5">
                    <template #label>
                        性別
                        <span style="color: red">*</span>
                    </template>
                    <n-radio-group v-model:value="model.sex" name="sex">
                        <n-space>
                            <n-radio value="男性">
                                男性
                            </n-radio>
                            <n-radio value="女性">
                                女性
                            </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item-gi>
                <n-form-item-gi :span="3" label="大頭照">
                    <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                        :default-file-list="previewFileList" list-type="image-card" max=1 @preview="handlePreview" />
                    <n-modal v-model:show="showModal" preset="card" style="width: 600px" title="一张很酷的图片">
                        <img :src="previewImageUrl" style="width: 100%">
                    </n-modal>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="連絡電話">
                    <n-input v-model:value="model.homePhone" placeholder="連絡電話" :allow-input="onlyAllowNumber" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="行動電話">
                    <n-input v-model:value="model.phone" placeholder="行動電話" show-count :maxlength="10"
                        :allow-input="onlyAllowNumber" />
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <template #label>
                        戶籍地址
                        <span style="color: red">*</span>
                    </template>
                    <n-input v-model:value="model.residenceAddress" placeholder="戶籍地址" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="通訊地址 *">
                    <template #label>
                        通訊地址
                        <span style="color: red">*</span>
                    </template>
                    <n-input v-model:value="model.mailingAddress" placeholder="通訊地址" />
                    <n-button style="margin-left: 5px;" type="tertiary"
                        @click="copyResidenceAddress()">與戶籍地址相同</n-button>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <template #label>
                        E-mail
                        <span style="color: red">*</span>
                    </template>
                    <n-input v-model:value="model.email" placeholder="E-mail" />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="特殊身分">
                    <n-checkbox-group v-model:value="model.specialStatus">
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
                    <n-checkbox-group v-model:value="model.drvingLicense">
                        <n-space>
                            <n-checkbox value="汽車">
                                汽車
                            </n-checkbox>
                            <n-checkbox value="機車">
                                機車
                            </n-checkbox>
                        </n-space>
                    </n-checkbox-group>
                </n-form-item-gi>
                <n-form-item-gi :span="8">
                    <template #label>
                        婚姻狀況
                        <span style="color: red">*</span>
                    </template>
                    <n-radio-group v-model:value="model.maritalStatus" name="radiogroup1">
                        <n-space>
                            <n-radio value="已婚">
                                已婚
                            </n-radio>
                            <n-radio value="未婚">
                                未婚
                            </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item-gi>
                <n-gi :span="24">
                    <n-divider>教育程度</n-divider>
                </n-gi>
                <template v-for="(item, index) in model.schools" :key="index">
                    <n-form-item-gi :span="8" label="學校名稱">
                        <n-input v-model:value="model.schools[index].name" placeholder="學校名稱" />
                    </n-form-item-gi>
                    <n-form-item-gi :span="6" label="科系">
                        <n-input v-model:value="model.schools[index].department" placeholder="科系" />
                    </n-form-item-gi>
                    <n-form-item-gi :span="10" label="修業起訖年月">
                        <n-date-picker v-model:value="model.schools[index].period" type="monthrange" clearable />
                        <n-button-group>

                            <n-button round style="margin: 0 5px;" @click="deleteSchool(index)">
                                <template #icon>
                                    <n-icon>
                                        <CloseCircleIcon />
                                    </n-icon>
                                </template>
                            </n-button>
                            <n-button round style="margin: 0 5px;" @click="addSchool()">
                                <template #icon>
                                    <n-icon>
                                        <AddIcon />
                                    </n-icon>
                                </template>
                            </n-button>
                        </n-button-group>
                    </n-form-item-gi>
                </template>
                <n-gi :span="24">
                    <n-divider>職務經歷</n-divider>
                </n-gi>
                <template v-for="(item, index) in model.workExperience" :key="index">
                    <n-form-item-gi :span="4" label="原服務單位名稱">
                        <n-input v-model:value="model.workExperience[index].company" placeholder="原服務單位名稱" />
                    </n-form-item-gi>
                    <n-form-item-gi :span="3" label="職稱">
                        <n-input v-model:value="model.workExperience[index].position" placeholder="職稱" />
                    </n-form-item-gi>
                    <n-form-item-gi :span="3" label="薪資(元)">
                        <n-input v-model:value="model.workExperience[index].salary" placeholder="薪資"
                            :allow-input="onlyAllowNumber">
                            <template #suffix>
                                元
                            </template>
                        </n-input>
                    </n-form-item-gi>
                    <n-form-item-gi :span="6" label="離職原因">
                        <n-input v-model:value="model.workExperience[index].leavingReason" placeholder="離職原因" />
                    </n-form-item-gi>
                    <n-form-item-gi :span="8" label="服務起訖年月">
                        <n-date-picker v-model:value="model.workExperience[index].period" type="monthrange" clearable />
                        <n-button-group>

                            <n-button round style="margin: 0 5px;" @click="deleteWorkExperience(index)">
                                <template #icon>
                                    <n-icon>
                                        <CloseCircleIcon />
                                    </n-icon>
                                </template>
                            </n-button>
                            <n-button round style="margin: 0 5px;" @click="addWorkExperience()">
                                <template #icon>
                                    <n-icon>
                                        <AddIcon />
                                    </n-icon>
                                </template>
                            </n-button>
                        </n-button-group>
                    </n-form-item-gi>
                </template>
                <n-gi :span="24">
                    <n-divider>職能及證照</n-divider>
                </n-gi>
                <n-form-item-gi :span="14" label="語言能力">
                    <n-checkbox-group v-model:value="model.languages">
                        <n-space>
                            <n-checkbox :checked="lang.checked" :value="lang.value" v-for="lang in languagesOptions"
                                :key="lang.value">
                                {{ lang.value }}
                            </n-checkbox>
                        </n-space>
                    </n-checkbox-group>

                    <n-space align="center">
                        <n-checkbox v-model:checked="otherLanguage">
                            其他
                        </n-checkbox>
                        <n-input size="small" v-if="otherLanguage" v-model:value="customLanguage" placeholder="請輸入其他語言"
                            @keyup.enter="addCustom('language')" />
                    </n-space>

                </n-form-item-gi>
                <n-form-item-gi :span="10" label="已選擇語言">
                    <n-space>
                        <n-tag v-for="(l, idx) in model.languages" :key="idx" type="success" closable
                            @close="handleClose('language', idx)"> {{ l }}
                        </n-tag>
                    </n-space>
                </n-form-item-gi>
                <n-form-item-gi :span="14" label="電腦專長">
                    <n-checkbox-group v-model:value="model.computerExpertise">
                        <n-space>
                            <n-checkbox :value="lang.value" v-for="lang in computerExpertiseOptions" :key="lang.value">
                                {{ lang.value }}
                            </n-checkbox>
                        </n-space>
                    </n-checkbox-group>

                    <n-space align="center">
                        <n-checkbox v-model:checked="othercomputerExpertise">
                            其他
                        </n-checkbox>
                        <n-input size="small" v-if="othercomputerExpertise" v-model:value="customComputerExpertise"
                            placeholder="請輸入其他專長" @keyup.enter="addCustom('computerExpertise')" />
                    </n-space>

                </n-form-item-gi>
                <n-form-item-gi :span="10" label="已選擇電腦專長">
                    <n-space>
                        <n-tag v-for="(l, idx) in model.computerExpertise" :key="idx" type="success" closable
                            @close="handleClose('computerExpertise', idx)">
                            {{ l }}
                        </n-tag>
                    </n-space>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="專業證照">
                    <n-input v-model:value="model.professionalLicense" placeholder="專業證照" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="知識技能">
                    <n-input v-model:value="model.knowledgeAndSkills" placeholder="Ex:設備操作、簡報技巧...請自我表述" />
                </n-form-item-gi>
                <n-gi :span="24">
                    <n-divider>緊急聯絡人</n-divider>
                </n-gi>
                <n-form-item-gi :span="6" label="姓名">
                    <n-input v-model:value="model.emergencyContact.name" placeholder="姓名" />
                </n-form-item-gi>
                <n-form-item-gi :span="6" label="關係">
                    <n-input v-model:value="model.emergencyContact.relationship" placeholder="關係" />
                </n-form-item-gi>
                <n-form-item-gi :span="6" label="連絡電話">
                    <n-input v-model:value="model.emergencyContact.phone" placeholder="連絡電話"
                        :allow-input="onlyAllowNumber" />
                </n-form-item-gi>
                <n-form-item-gi :span="6" label="行動電話">
                    <n-input v-model:value="model.emergencyContact.mobile" placeholder="行動電話" show-count :maxlength="10"
                        :allow-input="onlyAllowNumber" />
                </n-form-item-gi>
                <n-gi :span="24">
                    <n-divider>國泰世華銀行 薪資撥入帳號 <span style="color:red;margin-left: 10px;">(請詳細填寫)</span></n-divider>
                </n-gi>
                <n-form-item-gi :span="12">
                    <template #label>
                        分行名稱
                        <span style="color: red">*</span>
                    </template>
                    <n-input v-model:value="model.bank.branchName" placeholder="分行名稱" />
                </n-form-item-gi>
                <n-form-item-gi :span="12">
                    <template #label>
                        帳號
                        <span style="color: red">*</span>
                    </template>
                    <n-input v-model:value="model.bank.account" type="text" :allow-input="onlyAllowNumber"
                        placeholder="帳號" show-count :maxlength="12" />
                </n-form-item-gi>
                <n-gi :span="24">
                    <n-divider>身分證</n-divider>
                </n-gi>
                <n-form-item-gi :span="12">
                    <n-upload multiple directory-dnd action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :max="5">
                        <n-upload-dragger>
                            <div style="margin-bottom: 12px">
                                <n-icon size="48" :depth="3">
                                    <archive-icon />
                                </n-icon>
                            </div>
                            <n-text style="font-size: 16px">
                                身分證照片
                            </n-text>
                            <n-p depth="3" style="margin: 8px 0 0 0">
                                (正面)
                            </n-p>
                        </n-upload-dragger>
                    </n-upload>
                </n-form-item-gi>

                <n-form-item-gi :span="12">
                    <n-upload multiple directory-dnd action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :max="5">
                        <n-upload-dragger>
                            <div style="margin-bottom: 12px">
                                <n-icon size="48" :depth="3">
                                    <archive-icon />
                                </n-icon>
                            </div>
                            <n-text style="font-size: 16px">
                                身分證照片
                            </n-text>
                            <n-p depth="3" style="margin: 8px 0 0 0">
                                (反面)
                            </n-p>
                        </n-upload-dragger>
                    </n-upload>
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
import { UploadFileInfo } from 'naive-ui'
import dayjs from 'dayjs'

import {
    Add as AddIcon,
    Remove as CloseCircleIcon,
    School,
    ArchiveOutline as ArchiveIcon

} from '@vicons/ionicons5'

function test() {
    model.value = { "employeeId": "A2354", "department": "研究一所", "arrivalDate": 1719417600000, "name": "王大明", "idNumber": "F123456789", "sex": "男性", "birthday": null, "homePhone": "033124569", "phone": "0912345648", "residenceAddress": "新北市淡水區中正東路38號", "mailingAddress": "新北市淡水區中正東路38號", "email": "abc@gmail.com", "specialStatus": ["原住民", "身心障礙"], "drvingLicense": ["汽車"], "maritalStatus": "已婚", "schools": [{ "name": "台大", "department": "數學", "period": [1717171200000, 1717171200000] }], "workExperience": [{ "company": "台農院", "position": "前端工程師", "salary": "22000", "leavingReason": "錢太少", "period": [1711900800000, 1717171200000] }], "languages": ["國語", "台語", "泰語"], "computerExpertise": ["Word", "Excel"], "professionalLicense": "化學丙級", "knowledgeAndSkills": "簡報技巧", "emergencyContact": { "name": "林小美", "relationship": "母子", "phone": "0332546985", "mobile": "0955568112" }, "bank": { "account": "443515454848", "branchName": "南崁" } }
}
//語言選項
const languagesOptions = ref([
    {
        value: '國語',
        checked: true
    },
    {
        value: '台語',
        checked: false
    },
    {
        value: '客語',
        checked: false
    },
    {
        value: '英語',
        checked: false
    },
    {
        value: '日語',
        checked: false
    }
])
//電腦專長選項
const computerExpertiseOptions = ref([
    {
        value: 'Word',
        checked: true
    },
    {
        value: 'Excel',
        checked: false
    },
    {
        value: 'PowerPoint',
        checked: false
    },
    {
        value: 'Visio',
        checked: false
    },
    {
        value: 'GIS',
        checked: false
    }
])
const otherLanguage = ref(false)//其他語言
const othercomputerExpertise = ref(false)//其他電腦專長
// 個人資訊
const model = ref({
    employeeId: '',//人員編號
    department: '',//進用部門
    arrivalDate: null,//到職日
    name: '',//姓名
    idNumber: '',//身分證號
    sex: '',//性別
    birthday: null,//生日
    homePhone: '',//連絡電話
    phone: '',//行動電話
    residenceAddress: '',//戶籍地址
    mailingAddress: '',//通訊地址
    email: '',//信箱
    specialStatus: [],//特殊身分
    drvingLicense: [],//駕照
    maritalStatus: [],//婚姻狀況
    schools: [
        {
            name: "",//學校名稱
            department: "",//科系
            period: null//修業起訖年月
        }
    ],//學歷
    workExperience: [
        {
            company: "",//公司名稱
            position: "",//職務名稱
            salary: null,//薪資
            leavingReason: "",//離職原因
            period: null//服務起訖年月
        }
    ],//職務經歷
    languages: [] as string[],//語言能力
    computerExpertise: [] as string[],//電腦專長
    professionalLicense: '',//專業證照
    knowledgeAndSkills: '',//知識技能
    emergencyContact: {
        name: '', // 緊急聯絡人姓名
        relationship: '', // 關係
        phone: '', // 連絡電話
        mobile: '' // 行動電話
    },//緊急聯絡人資訊
    bank: {
        account: '',//銀行帳號
        branchName: ''//分行名稱
    },//銀行資訊

})
//檢查條件
const rules = ref(
    {
        number: {
            required: true,
            trigger: ['blur', 'input'],
            message: '请输入 inputValue'
        }
    }
)
//部門列表
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

// 增加學經歷
function addSchool() {
    if (model.value.schools.length < 6) {
        model.value.schools.push({
            name: "",
            department: "",
            period: null
        })
    } else {
        alert("最多只能新增6筆教育經歷")
    }
}
// 刪除學經歷
function deleteSchool(idx: number) {
    if (model.value.schools.length > 1) {
        model.value.schools.splice(idx, 1)
    } else {
        alert("至少要一個教育經歷")
    }
}
//增加職務經歷
function addWorkExperience() {
    if (model.value.workExperience.length < 6) {
        model.value.workExperience.push({
            company: "",//公司名稱
            position: "",//職務名稱
            salary: null,//薪資
            leavingReason: "",//離職原因
            period: null//服務起訖年月
        })
    } else {
        alert("最多只能新增6筆教育經歷")
    }
}
//刪除職務經歷
function deleteWorkExperience(idx: number) {
    if (model.value.workExperience.length > 1) {
        model.value.workExperience.splice(idx, 1)
    } else {
        alert("至少要一個職務經歷")
    }
}
// 複製 戶籍地址資料=>通訊地址資料
function copyResidenceAddress() {
    model.value.mailingAddress = model.value.residenceAddress;
}
const customLanguage = ref('')//其他語言
const customComputerExpertise = ref('')//其他電腦專長
//增加語言
function addCustom(type: string) {
    if (type == 'language') {
        if (customLanguage.value.trim() !== '') {
            model.value.languages.push(customLanguage.value);
            customLanguage.value = ''; // 清空輸入框
        }
    } else {
        if (customComputerExpertise.value.trim() !== '') {
            model.value.computerExpertise.push(customComputerExpertise.value);
            customComputerExpertise.value = ''; // 清空輸入框
        }
    }
}
//刪除已選擇(語言/電腦專長)
function handleClose(type: string, idx: number) {
    if (type == 'language') {

        model.value.languages.splice(idx, 1);
    } else {
        model.value.computerExpertise.splice(idx, 1);
    }
}

const showModal = ref(false)
const previewImageUrl = ref('')
const previewFileList = ref<UploadFileInfo[]>([

])

function handlePreview(file: UploadFileInfo) {
    const { url } = file
    previewImageUrl.value = url as string
    showModal.value = true
}

//只能輸入數字
const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value);
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

.n-date-picker {
    width: 100%;
}

.n-divider {
    font-size: 24px;
    color: #616060;
    font-weight: 900;

}
</style>