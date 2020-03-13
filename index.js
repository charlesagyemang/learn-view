


let app = new Vue({
  el: '#app',
  data: {
    product: 'Boots',
    googleLink: "https://google.com",
    image: 'https://cdn.shopify.com/s/files/1/0052/7237/1293/products/1024x1024-Socks-White-LB1_1024x1024.jpg?v=1561393817',
    image2: 'https://cdn.shopify.com/s/files/1/0052/7237/1293/products/1024x1024-Unisex-CrewSocks-Navy-LB2_864x864.jpg?v=1561506248',
    inventory: 90,
    details: [
      "80% Cotton",
      "20% Polyester",
      "General-neutral",
    ],
    variants: [
      {
        variantID: 2234,
        variantColor: "green",
      },
      {
        variantID: 2235,
        variantColor: "blue",
      },

    ],

    cart: 0,
  }
});
