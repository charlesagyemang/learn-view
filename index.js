
// create a component

Vue.config.devtools = true;


Vue.component('product',{
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
          <div class="container-fluid">
            <div class="row">
              <div class="col">
                <div class="product-image">
                  <img :src="image" height="400" width="400">
                  <a :href="googleLink" target="_blank">Heyaa</a>
                </div>
              </div>
              <div class="col">
                <div class="product-info">

                  <h1>{{ product }}</h1>
                  <p v-if="inStock">In Stock</p>
                  <p v-else>Out Of Stock</p>

                  <p>Shipping: {{ shipping }}</p>

                  <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                  </ul>


                  <div v-for="(variant, index) in variants"
                       :key="variant.variantID"
                       class="color-box"
                       :style="{ backgroundColor: variant.variantColor }"
                       @mouseover="updateProduct(index)">
                  </div>
                  <button v-on:click="addToCart" class="btn btn-primary" :disabled="!inStock"> Add to Cart </button>
                </div>
              </div>
            </div>
          </div>
  `,

    methods: {

      addToCart: function () {
        this.$emit('add-to-cart');
      },

      updateProduct: function(index) {
        this.selectedVariant = index;
      },



    },

    computed: {
      image: function () {
        return this.variants[this.selectedVariant].variantImage;
      },

      inStock: function () {
        return this.variants[this.selectedVariant].variantQuantity;
      },

      shipping: function () {
        if (this.premium) {
          return "Free";
        }
        return `$2.99`;
      },
    },

    data: function () {
      return {
        product: 'Boots',
        googleLink: "https://google.com",
        inventory: 90,
        selectedVariant: 0,
        details: [
          "80% Cotton",
          "20% Polyester",
          "General-neutral",
        ],
        variants: [
          {
            variantID: 2234,
            variantColor: 'green',
            variantImage: 'https://cdn.shopify.com/s/files/1/0052/7237/1293/products/1024x1024-Socks-White-LB1_1024x1024.jpg?v=1561393817',
            variantQuantity: 10,
          },
          {
            variantID: 2235,
            variantColor: 'blue',
            variantImage: 'https://cdn.shopify.com/s/files/1/0052/7237/1293/products/1024x1024-Unisex-CrewSocks-Navy-LB2_864x864.jpg?v=1561506248',
            variantQuantity: 0,
          },
        ],
      };
    },
});

// main app js
let app = new Vue({

  el: '#app',

  data: {
    premium: false,
    cart: 0,
  },

  methods: {

    updateCart: function () {
      this.cart += 1;
      // console.log("hey");
    },

  },
});
