<template>
  <div>
    <main class="page-content">
      <div class="card1" v-for="(pro, index) in category" :key="index">
        <div class="col align-self-center">
          <div class="content">
            <h2 class="title">{{index}}</h2>
            <p class="copy">{{pro.length}} Products</p>
            <button @click.prevent="searchCategory(index)" class="btn">View Trips</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    searchCategory(pro) {
      return (this.$store.state.search = pro);
    }
  },
  data() {
    return {
      product: {
        laptop: [],
        monitor: [],
        vga: [],
        processor: [],
        keyboard: [],
        mouse: []
      }
    };
  },
  created() {
    this.$store.dispatch("getProduct");
  },
  computed: {
    category() {
      this.product.laptop = [];
      this.product.monitor = [];
      this.product.vga = [];
      this.product.processor = [];
      this.product.keyboard = [];
      this.product.mouse = [];
      this.$store.state.products.forEach(element => {
        this.product[element.category].push(element);
      });
      return this.product;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=card1o:400i|Rubik:400,700&display=swap");
:root {
  --d: 700ms;
  --e: cubic-bezier(0.19, 1, 0.22, 1);
  --font-sans: "Rubik", sans-serif;
  --font-serif: "card1o", serif;
}

* {
  box-sizing: border-box;
}

/* body {
  display: grid;
  place-items: center;
} */

.page-content {
  display: flex;
  grid-gap: 1rem;
  padding: 1rem;
  max-width: 1224px;
  margin: 0 auto;
  font-family: var(--font-sans);
}
@media (min-width: 400px) {
  .page-content {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 600px) {
  .page-content {
    grid-template-columns: repeat(4, 1fr);
  }
}

.card1 {
  position: relative;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: end;
  align-items: flex-end;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  text-align: center;
  color: whitesmoke;
  background-color: whitesmoke;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.1);
}
@media (min-width: 600px) {
  .card1 {
    height: 300px;
  }
}
.card1:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background-size: cover;
  background-position: 0 0;
  -webkit-transition: -webkit-transform calc(var(--d) * 1.5) var(--e);
  transition: -webkit-transform calc(var(--d) * 1.5) var(--e);
  transition: transform calc(var(--d) * 1.5) var(--e);
  transition: transform calc(var(--d) * 1.5) var(--e),
    -webkit-transform calc(var(--d) * 1.5) var(--e);
  pointer-events: none;
}
.card1:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  pointer-events: none;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0)),
    color-stop(11.7%, rgba(0, 0, 0, 0.009)),
    color-stop(22.1%, rgba(0, 0, 0, 0.034)),
    color-stop(31.2%, rgba(0, 0, 0, 0.072)),
    color-stop(39.4%, rgba(0, 0, 0, 0.123)),
    color-stop(46.6%, rgba(0, 0, 0, 0.182)),
    color-stop(53.1%, rgba(0, 0, 0, 0.249)),
    color-stop(58.9%, rgba(0, 0, 0, 0.32)),
    color-stop(64.3%, rgba(0, 0, 0, 0.394)),
    color-stop(69.3%, rgba(0, 0, 0, 0.468)),
    color-stop(74.1%, rgba(0, 0, 0, 0.54)),
    color-stop(78.8%, rgba(0, 0, 0, 0.607)),
    color-stop(83.6%, rgba(0, 0, 0, 0.668)),
    color-stop(88.7%, rgba(0, 0, 0, 0.721)),
    color-stop(94.1%, rgba(0, 0, 0, 0.762)),
    to(rgba(0, 0, 0, 0.79))
  );
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.009) 11.7%,
    rgba(0, 0, 0, 0.034) 22.1%,
    rgba(0, 0, 0, 0.072) 31.2%,
    rgba(0, 0, 0, 0.123) 39.4%,
    rgba(0, 0, 0, 0.182) 46.6%,
    rgba(0, 0, 0, 0.249) 53.1%,
    rgba(0, 0, 0, 0.32) 58.9%,
    rgba(0, 0, 0, 0.394) 64.3%,
    rgba(0, 0, 0, 0.468) 69.3%,
    rgba(0, 0, 0, 0.54) 74.1%,
    rgba(0, 0, 0, 0.607) 78.8%,
    rgba(0, 0, 0, 0.668) 83.6%,
    rgba(0, 0, 0, 0.721) 88.7%,
    rgba(0, 0, 0, 0.762) 94.1%,
    rgba(0, 0, 0, 0.79) 100%
  );
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: -webkit-transform calc(var(--d) * 2) var(--e);
  transition: -webkit-transform calc(var(--d) * 2) var(--e);
  transition: transform calc(var(--d) * 2) var(--e);
  transition: transform calc(var(--d) * 2) var(--e),
    -webkit-transform calc(var(--d) * 2) var(--e);
}
.card1:nth-child(1):before {
  background-image: url(https://esports.itgaleri.com/wp-content/uploads/2019/08/Asus-ROG-Zephyrus-G-GA502DU-500x375.jpg);
}
.card1:nth-child(2):before {
  background-image: url(https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/14/7701906/7701906_52fc5394-ebb6-4f53-9909-9f34a8e00a62_500_500.png);
}
.card1:nth-child(3):before {
  background-image: url(https://cms.dailysocial.id/wp-content/uploads/2018/08/79cf7eff11fc79aacbf553cb8f91ffae_Nvidia-GeForce-RTX-2080-Ti-1.jpg);
}
.card1:nth-child(4):before {
  background-image: url(https://www.acerid.com/wp-content/uploads/2019/08/Intel-Quad-Core-Thumbnail.jpg);
}
.card1:nth-child(5):before {
  background-image: url(https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/5/1863939/1863939_3f034fdd-9ec0-4e8d-b074-840e655db0e7.png);
}
.card1:nth-child(6):before {
  background-image: url(https://i.imgur.com/Lh4dJ.png);
}

.content {
  margin-top: 100px;
  position: relative;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  -webkit-transition: -webkit-transform var(--d) var(--e);
  transition: -webkit-transform var(--d) var(--e);
  transition: transform var(--d) var(--e);
  transition: transform var(--d) var(--e), -webkit-transform var(--d) var(--e);
  z-index: 1;
}
.content > * + * {
  margin-top: 1rem;
}

.title {
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 1.2;
}

.copy {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-style: italic;
  line-height: 1.35;
}

.btn {
  cursor: pointer;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.65rem;
  font-weight: bold;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
  color: white;
  background-color: black;
  border: none;
}
.btn:hover {
  background-color: #0d0d0d;
}
.btn:focus {
  outline: 1px dashed yellow;
  outline-offset: 3px;
}

@media (hover: hover) and (min-width: 600px) {
  .card1:after {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  .content {
    -webkit-transform: translateY(calc(100% - 4.5rem));
    transform: translateY(calc(100% - 4.5rem));
  }
  .content > *:not(.title) {
    opacity: 0;
    -webkit-transform: translateY(1rem);
    transform: translateY(1rem);
    -webkit-transition: opacity var(--d) var(--e),
      -webkit-transform var(--d) var(--e);
    transition: opacity var(--d) var(--e), -webkit-transform var(--d) var(--e);
    transition: transform var(--d) var(--e), opacity var(--d) var(--e);
    transition: transform var(--d) var(--e), opacity var(--d) var(--e),
      -webkit-transform var(--d) var(--e);
  }

  .card1:hover,
  .card1:focus-within {
    -webkit-box-align: center;
    align-items: center;
  }
  .card1:hover:before,
  .card1:focus-within:before {
    -webkit-transform: translateY(-4%);
    transform: translateY(-4%);
  }
  .card1:hover:after,
  .card1:focus-within:after {
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .card1:hover .content,
  .card1:focus-within .content {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  .card1:hover .content > *:not(.title),
  .card1:focus-within .content > *:not(.title) {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-transition-delay: calc(var(--d) / 8);
    transition-delay: calc(var(--d) / 8);
  }

  .card1:focus-within:before,
  .card1:focus-within:after,
  .card1:focus-within .content,
  .card1:focus-within .content > *:not(.title) {
    -webkit-transition-duration: 0s;
    transition-duration: 0s;
  }
}
</style>