<template>
  <div>
    <div class="container-sm container-card">
      <div class="content-game ml-5 mt-2">
        <div class="no-content text-center mt-2" v-if="games.length == 0">
          <p>No Product is available</p>
        </div>
        <div class="row have-content overflow-auto">
          <div class="card-width" v-for="game in games" :key="game.id">
            <div class="card">
              <div class="card-body text-center">
                <div class="card-description">
                  <img class="card-img-top card-image-home rounded" :src="game.image_url" />
                  <h5 class="card-title">{{ game.name }}</h5>
                  <div class="d-flex justify-content-between mx-2 description-info">
                    <p class="card-text">Price:</p>
                    <p>{{ converting(game.price) }}</p>
                  </div>
                  <div class="d-flex justify-content-between mx-2 description-info">
                    <p class="card-text">Stock:</p>
                    <p>{{ stockcount(game.stock)}}</p>
                  </div>
                  <div class="d-flex justify-content-between mx-2 description-info">
                    <p class="card-text">Category:</p>
                    <p>{{ game.Category.name }}</p>
                  </div>
                  <div class="d-flex flex-row justify-content-center">
                    <div class="mr-2">
                      <img
                        @click="$emit('editForm', game.id )"
                        class="card-img-top rounded card-icon rounded mx-auto mb-2"
                        src="@/assets/edit-icon.png"
                      />
                    </div>
                    <div>
                      <img
                        @click="deleteGame(game.id)"
                        class="card-img-top rounded card-icon rounded mx-auto mb-2"
                        src="@/assets/trash-icon.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swal, Toast } from "@/api/swal.js";
export default {
  mounted() {
    this.$store.dispatch("getAllGames");
  },
  computed: {
    games() {
      return this.$store.state.listGame;
    }
  },
  methods: {
    converting(num) {
      let str = String(num);
      let converted = "";
      for (let i = 0; i < str.length; i++) {
        if ((str.length - i) % 3 == 0 && i !== 0) {
          converted += "." + str[i];
        } else {
          converted += str[i];
        }
      }
      return `Rp. ${converted},00`;
    },
    stockcount(num) {
      if (num <= 1) {
        return num + " pc";
      } else {
        return num + " pcs";
      }
    },
    deleteGame(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$axios
            .delete(`/products/${id}`, {
              headers: {
                token: localStorage.token
              }
            })
            .then(({ data }) => {
              Toast.fire({
                icon: "success",
                title: `Product ${data.name} successfully deleted`,
                timer: 2000
              });
              this.$store.dispatch("getAllGames");
            })
            .catch(({ response }) => {
              console.log(response);
              // if (error.response.status == 403) {
              //   Swal.fire({
              //     icon: "error",
              //     title: "Oops...",
              //     text: "You are not authorized to delete this task!"
              //   });
              // }
            });
        }
      });
    }
  }
};
</script>
<style scoped>
* {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}

.content-game {
  width: 45vw;
}

.have-content {
  width: 47vw;
  max-height: 79vh;
}

.no-content {
  width: 45vw;
  height: 70vh;
  font-size: 20px;
  font-weight: bold;
}

.card-image-home {
  width: 100%;
  height: 140px;
  margin: 0;
  padding: 0;
}

.card-body {
  width: 200px;
  color: rgb(78, 75, 75);
  background-color: rgba(182, 190, 216, 0.247);
}

.card-description:hover {
  transition: 0.5s;
  background-color: rgb(176, 194, 176);
}

.card-title {
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 15px;
}

.card-icon {
  height: 20px;
  width: 20px;
  margin-top: 5px;
  margin-right: 5px;
  cursor: pointer;
}

.container-card {
  font-size: 12px;
}

.description-info {
  margin-bottom: -20px;
}

.card-description {
  border: solid 1px black;
  border-radius: 10px;
  height: 100%;
}

.card {
  border: none;
}
</style>