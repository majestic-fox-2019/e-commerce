<template>
  <div>
    <!-- {{cartDetail}} -->
    <b-card>
      <div class="row">
        <div class="col-4">
          <img :src="cartNya.Product.image_url" height="100px" alt="belanjaanmu" />
        </div>
        <div class="col-8">
          <h4 class="namaP">{{cartNya.Product.name}}</h4>
          <h4 class="haP mt-2">{{price}}</h4>
          <div class="row justify-content-end">
            <div class="col-2">
              <i
                class="fa-lg el-icon-delete-solid tong"
                v-b-modal="'modalDeleteCart' + cartDetail.ProductId + cartDetail.UserId"
              ></i>
            </div>
            <div class="d-flex justify-content-center">
              <i class="fas fa-lg fa-minus-circle minuss" @click="kurangin"></i>
              <input min="0" class="inputCart" v-model="jumlahBeli" type="number" />
              <i class="fas fa-lg fa-plus-circle pluss" @click="tambahin"></i>
            </div>
            <div class="col-2">
              <div class="btn btn-warning" @click="editQtyCart">ok</div>
            </div>
          </div>
        </div>
      </div>
    </b-card>
    <div>
      <b-modal
        :id="'modalDeleteCart' + cartDetail.ProductId + cartDetail.UserId"
        title="Are you sure?"
        hide-footer
      >
        <p class="my-4">
          Are you sure you want to delete
          <strong>{{cartDetail.Product.name}}</strong> ?
        </p>
        <div class="row justify-content-end">
          <div
            class="btn btn-warning mr-2"
            @click="$bvModal.hide('modalDeleteCart' + cartDetail.ProductId + cartDetail.UserId)"
          >No</div>
          <div class="btn btn-danger" @click="deleteThisPls">Yes</div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "CartCard",
  props: ["cartDetail"],
  data() {
    return {
      jumlahBeli: null
    };
  },
  methods: {
    kurangin() {
      this.jumlahBeli -= 1;
    },
    tambahin() {
      this.jumlahBeli += 1;
    },
    editQtyCart() {
      if (this.jumlahBeli <= 0) {
        Swal.fire("Oops", "Your stock does not seem right", "error");
        this.jumlahBeli == this.cartDetail.qty;
        this.$emit("updatedCart");
      } else if (this.jumlahBeli > this.cartDetail.Product.stock) {
        this.$emit("updatedCart");

        Swal.fire(
          "Oops",
          "Your requested qty exceeds the existing stock of this product",
          "error"
        );
      } else {
        let objUpdateCart = {
          idUser: Number(localStorage.getItem("userId")),
          idProduct: this.cartDetail.ProductId,
          qty: this.jumlahBeli
        };
        this.$store.dispatch("updateCart", objUpdateCart).then(() => {
          Swal.fire("Yay", "Edited successfully", "success");
          this.$emit("updatedCart");
        });
      }
    },
    deleteThisPls() {
      let objDeleteFromCart = {
        idUser: Number(localStorage.getItem("userId")),
        idProduct: this.cartDetail.ProductId
      };
      this.$store.dispatch("deleteFromCart", objDeleteFromCart).then(() => {
        this.$emit("updatedCart");
        this.$bvModal.hide(
          "modalDeleteCart" + this.cartDetail.ProductId + this.cartDetail.UserId
        );
      });
    }
  },
  computed: {
    price() {
      let angka = this.cartDetail.Product.price;

      var rupiah = "";
      var angkarev = angka
        .toString()
        .split("")
        .reverse()
        .join("");
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
      return (
        "Rp. " +
        rupiah
          .split("", rupiah.length - 1)
          .reverse()
          .join("") +
        ",00"
      );
    },
    cartNya() {
      if (typeof this.cartDetail !== "object") {
        return "loading";
      } else {
        return this.cartDetail;
      }
    }
  },
  watch: {
    cartDetail() {
      // console.log(this.cartDetail,)
      if (this.cartDetail.qty) {
        this.jumlahBeli = this.cartDetail.qty;
      }
    }
  }
};
</script>

<style scoped>
.namaP {
  text-align: left;
  font-weight: bold;
}

.haP {
  text-align: left;
  font-weight: bold;
  color: #b53737;
}
.tong {
  color: gray;
}
.tong:hover {
  cursor: pointer;
  color: #bb5533;
}

.inputCart {
  border: none;
  border-bottom: 1px solid lightgray;
  text-align: center;
  width: 50px;
}
.inputCart::-webkit-outer-spin-button,
.inputCart::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.minuss:hover {
  cursor: pointer;
  color: #b53737;
}

.pluss:hover {
  cursor: pointer;
  color: green;
}
</style>