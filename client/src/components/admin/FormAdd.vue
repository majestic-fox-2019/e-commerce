<template>
    <form action="">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">Name</span>
            </div>
            <input type="text" aria-label="Name" class="form-control">
        </div>
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon01">Image</span>
            </div>
            <div class="custom-file">
                <input type="file" class="custom-file-input"
                id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
                <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
            </div>
        </div>
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">Price</span>
            </div>
            <input type="number" aria-label="Price" min="1" class="form-control">
        </div>
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">Stock</span>
            </div>
            <input type="number" aria-label="Stock" min="0" class="form-control">
        </div>
        <div class="input-group">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
</template>

<script>
export default {

};
</script>

<style scoped>

.input-group{
    padding: 1%;
    max-width: 50%;
}
</style>
