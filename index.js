


Vue.config.devtools = true;

// create a product component

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

            <div>
              <h2>Reviews</h2>
              <p v-if="reviews.length < 1">There are no reviews yet.</p>
              <ul>
                <li v-for="review in reviews">
                  <p>Name: {{ review.name }}</p>
                  <p>Rating: {{ review.rating }}</p>
                  <p>Review: {{ review.review }}</p>
                </li>
              </ul>
            </div>
            <product-review @review-submitted="addReview"></product-review>

          </div>
  `,

    methods: {

      addToCart: function () {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID);
      },

      updateProduct: function(index) {
        this.selectedVariant = index;
      },

      addReview: function(productReview) {
        this.reviews.push(productReview);
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
        reviews: [],
      };
    },
});
// create a product-review component

Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
      <b>Please correct the following errors(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name"></input>
    </p>

    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
      <label for="rating">Review:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>
      <input type="submit" value="submit">
    </p>

  </form>
  `,
  data: function () {
    return {
      name: null,
      review: "",
      rating: "",
      errors: [],
    };
  },

  methods: {
    onSubmit: function () {

      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        };

        this.$emit('review-submitted', productReview);

        this.name = null;
        this.review = null;
        this.rating = null;
      } else {

        if(!this.name) this.errors.push("Name Required");
        if(!this.review) this.errors.push("Review Required");
        if(!this.rating) this.errors.push("Name Rating");
      }



    },
  },
});

// main app js
let app = new Vue({

  el: '#app',

  data: {
    premium: false,
    cart: [],
  },

  methods: {

    updateCart: function (id) {
      this.cart.push(id);
      // console.log("hey");
    },

  },
});
