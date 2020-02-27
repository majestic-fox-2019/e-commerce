<template>
<div class='container'>
  <div class='cartcontainer'>
    <div class="imagedetails">
      <img :src="detailsProduct.image_url" alt="">
    </div>
  </div>
    <div class='formcart'>
      <div class='productname'>
      <h1> {{detailsProduct.name}}</h1>
      </div>
      <br>
      <div class='productdescription'>
      <p>{{detailsProduct.description}}</p>
      </div>
      <div class='otherDetails'>
        <div class='details'>
          <h4>
            Rating: {{detailsProduct.rating}}
            </h4>
        </div>
        <div class='details'>
          <h4>
          Stock: {{detailsProduct.stock}}
          </h4>
        </div>
        <div class='details'>
          Qty:
          <input type="number">
                    <!--  -->
        </div>
      </div>
      <div class='buttons'>
         <v-btn color="warning" class="mr-4" @click="update">Update</v-btn>
      <v-btn color="red" class="mr-4" @click="cancel">Cancel</v-btn>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      detailsProduct: this.$store.state.dataDetails,
    };
  },
  // computed: {
  //   updateData() {
  //     return this.$store.state.dataDetails;
  //   }
  // }
};
</script>

<style>
.imagedetails img {
  width: 20em ;
  max-width: 20em;
  height: 20em;
  max-height: 20em;
  border-radius: 10%;
}
.buttons {
  margin-top: 10px;
}
.cartcontainer {
  /* border: solid black 2px */
}
.formcart {
  /* border: solid black 2px; */
  width: 70%;
}
.productname {
  /* border: solid black 2px; */
  background: #e6f5ea;
}
.productdescription {
  background: #e6f5ea;
  margin: 0px;
  /* border: solid grey 1px; */
  border-radius: 15px;
  height: auto;
  min-height: 50%;
  max-height: 100%;
}
.otherDetails {
  /* border: solid black 2px; */
  display: flex;
  flex-direction: row;
  margin-top: 2px;
  height: 15%;
}
.details {
  background: #e6f5ea;
  border-radius: 10px;
  width: 100%;
  margin-left: 10px;
}
.details input {
  border: solid black 0.5px;
  width: 50%;
}
</style>
