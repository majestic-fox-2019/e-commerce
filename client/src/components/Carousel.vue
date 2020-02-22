<template>
    <div>
        <div id="carouselBanner" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselBanner" data-slide-to="0" class="active"></li>
            <li data-target="#carouselBanner" data-slide-to="1"></li>
            <li data-target="#carouselBanner" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src="https://image.freepik.com/free-photo/rye-sliced-bread-table_1112-1265.jpg" class="d-block w-100" style="height: 350px;">
            </div>
            <div class="carousel-item">
            <img src="https://image.freepik.com/free-photo/types-fresh-bread-with-flour-cloth_23-2148361878.jpg" class="d-block w-100" style="height: 350px;">
            </div>
            <div class="carousel-item">
            <img src="https://image.freepik.com/free-photo/delicious-bread-table_144627-12454.jpg" class="d-block w-100" style="height: 350px;">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselBanner" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselBanner" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'carousel',

}
</script>

<style scoped>
ol.carousel-indicators li,
ol.carousel-indicators li.active {
  width: 3%;
  height: 3px;
  border-radius: 0;
  border: 0;
}
ol.carousel-indicators li.active {
  background: black;
}
.carousel-control-prev {
    margin-left: 1300px;
    width: 20px;
}
.carousel-control-next {
    width: 20px;
    right: 50px;
}
.carousel-control-prev-icon {
    background-color:rgba(245, 10, 175, 0.5);
}
.carousel-control-next-icon {
    background-color:rgba(245, 10, 175, 0.5);
}
</style>