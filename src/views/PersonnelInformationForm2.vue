<template>
    <div class="content">
        <div class="row">
            <div class="col-md-4">
                <label for="inputEmail4" class="form-label">人員編號</label>
                <input type="email" class="form-control" id="inputEmail4">
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">進用部門</label>
                <select id="inputState" class="form-select">
                    <option disabled value="">請選擇部門</option>
                    <option value="數發處">數發處</option>
                    <option value="研究一所">研究一所</option>
                    <option value="研究二所">研究二所</option>
                    <option value="研究三所">研究三所</option>
                    <option value="研究四所">研究四所</option>
                </select>
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">進用部門</label>

            </div>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
            </div>
            <div class="col-12">
                <label for="inputAddress2" class="form-label">Address 2</label>
                <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
            </div>
            <div class="col-md-6">
                <label for="inputCity" class="form-label">City</label>
                <input type="text" class="form-control" id="inputCity">
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">進用部門</label>
                <select id="inputState" class="form-select">
                    <option disabled value="">請選擇部門</option>
                    <option value="數發處">數發處</option>
                    <option value="研究一所">研究一所</option>
                    <option value="研究二所">研究二所</option>
                    <option value="研究三所">研究三所</option>
                    <option value="研究四所">研究四所</option>
                </select>
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Zip</label>
                <input type="text" class="form-control" id="inputZip">
            </div>
            <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck">
                    <label class="form-check-label" for="gridCheck">
                        Check me out
                    </label>
                </div>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Sign in</button>
            </div>

        </div>
        <input type="month">
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

</script>

<style scoped lang="scss">
.content {
    width: 80%;
    margin: 100px auto;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9
}
</style>