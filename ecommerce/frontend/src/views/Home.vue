<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      Listado de productos

      <template>
        <div>
          <section class="wrapper">
            <ul class="featured-items">
              <li
                style="
                  border: black 1px solid;
                  width: 400px;
                  display: inline-grid;
                  margin: 10px;
                "
                v-for="item in items"
                :key="item.id"
                class="featured-items__item"
              >
                <img class="product-image" :src="item.mainImage" alt="" />
                <p class="product-title">{{ item.name }}</p>
                <p>
                  <em>${{ item.price }}</em>
                </p>
                <b-button><router-link :to="{ name: 'details', params: { id: item.id } }">Details</router-link></b-button> ||
                <b-button style="background-color: blue;" @click="addtoCart(item.id, item.name, item.price)">Comprar</b-button>
              </li>
            </ul>
          </section>
        </div>
      </template>
    </div>
  </div>
</template>
 

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import api_url from "../utils/api";
export default {
  name: "Home",
  created() {
    fetch(api_url("/products"))
      .then((result) => result.json())
      .then((data) => (this.items = data));
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
      addtoCart(productId, productName, productPrice) {
      fetch(api_url("/cart/"), {
        method: "POST",
        body: JSON.stringify({
          productId: productId,
          productName: productName,
          quantity: 1,
          productPrice: productPrice,
        }),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    },
  },
  components: {},
};
</script>

<style >
</style>
