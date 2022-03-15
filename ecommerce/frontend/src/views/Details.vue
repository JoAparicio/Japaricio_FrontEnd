<template>
  <div>
    <section class="wrapper">
      <template>
        <div>
          <section class="wrapper">
            <ul class="featured-items">
              <li
                style="
                  border: black 1px solid;
                  width: 400px;
                  display: inline-grid;
                "
                class="featured-items__item"
              >
                <img
                  class="product-image"
                  :src="item.mainImage"
                  alt=""
                  style="width: 100%"
                />
                <p class="product-title">{{ item.name }}</p>
                <p>
                  <em>${{ item.price }}</em>
                </p>

                <p>
                  <em>${{ item.description }}</em>
                </p>

                <b-button
                  ><router-link :to="{ name: 'Home' }"
                    >Back</router-link
                  ></b-button
                >
                ||
                <b-button style="background-color: blue" @click="addtoCart"
                  >Add to cart</b-button
                >
              </li>
            </ul>
          </section>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
import api_url from "../utils/api";

export default {
  name: "details",
  created() {
    this.getProductDetail(this.$route.params.id);
  },
  beforeRouteUpdate(to, from) {
    this.getProductDetail(to.params.id);
  },
  data() {
    return {
      item: {},
    };
  },
  components: {},

  methods: {
    addtoCart() {
      fetch(api_url("/cart/"), {
        method: "POST",
        body: JSON.stringify({
          productId: this.item.id,
          productName: this.item.name,
          quantity: 1,
          productPrice: this.item.price,
        }),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    },
    getProductDetail(id) {
      fetch(api_url("/products/" + id))
        .then((result) => result.json())
        .then((data) => (this.item = data));
    },
  },
};
</script>
