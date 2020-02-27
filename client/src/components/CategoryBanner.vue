<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 8" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(3) {
  background: url('https://static.musiciansfriend.com/thehub/binaries/content/gallery/mf/buying-guides/fender-player-jazz-bass.jpg');
  background-position: center;
  background-size: cover;
}

.el-carousel__item:nth-child(4) {
  background: url('https://galerimusikindonesia.com/image/cache/data/Digital%20Piano/Roland/RD2000/RD2000-600x315.jpg');
  background-position: center;
  background-size: cover;
}
.el-carousel__item:nth-child(5) {
  background: url('https://kinibisa.com/site/ckeditor/Skills/Musik/DRUM/Beberapa%20Birama%20dan%20Teknik%20Pukulan%20Dasar%20pada%20Drum%20Untuk%20Pemula/Beberapa%20Birama%20dan%20Teknik%20Pukulan%20Dasar%20pada%20Drum%20untuk%20Pemula.jpg');
  background-position: center;
  background-size: cover;
}
.el-carousel__item:nth-child(6) {
  background: url('https://static.musiciansfriend.com/thehub/binaries/content/gallery/mf/buying-guides/fender-player-jazz-bass.jpg');
  background-position: center;
  background-size: cover;
}
.el-carousel__item:nth-child(7) {
  background: url('https://upload.wikimedia.org/wikipedia/commons/7/7a/Korg_PS-3300_-_reduced_light_spot.JPG');
  background-position: center;
  background-size: cover;
}
.el-carousel__item:nth-child(8) {
  background: url('https://media.sweetwater.com/api/i/q-82__ha-a8b0b8401898c1a9__hmac-8baba4611e757f63276edb1c0a9126ca7ffd2abe/images/items/750/Fantom-6-large.jpg');
  background-position: center;
  background-size: cover;
}
.el-carousel__item:nth-child(9) {
  background: url('https://images-na.ssl-images-amazon.com/images/I/71HzOs%2BCwOL._AC_SL1500_.jpg');
  background-position: center;
  background-size: cover;
}
.el-carousel__item:nth-child(10) {
  background: url('https://dt7v1i9vyp3mf.cloudfront.net/styles/news_large/s3/imagelibrary/q/qakorgms20-R4b4WOF2wsoWB0L_hkaxRGx0L8_5IBJ6.jpg');
  background-position: center;
  background-size: cover;
}
</style>
