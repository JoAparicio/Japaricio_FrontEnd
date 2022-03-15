<template>
  <div class="wrapper">
    <h1>Carrito</h1>
    <section class="wrapper">
      <ul style="display: inline-grid; justify-content: center; align-items: center; margin-top: 70px;">

        <li v-for="item in items" :key="item.id" style="border: black 3px solid; width: 1100px; display: flex; justify-content: center; align-items: center; padding-top: 15px; margin-bottom: 40px;">
          
          <p style="margin-right:20px;">==></p>

          <p><b>{{ item.productName }}</b></p>

          <p style="padding: 0px 100px"><b>Precio:</b> {{ item.productPrice }}$</p>

          <p style="padding-right: 100px"><b>Cantidad:</b> {{ item.quantity }}</p>
          <b-button @click="upgradeQuantity(item.id,item.quantity,item.productId,item.productName,item.productPrice)"
            style="margin-right: 10px; width: 40px; background-color: grey; color: black; margin-top: -15px;"><b>+</b></b-button>

          <b-button @click="downgradeQuantity(item.id,item.quantity,item.productId,item.productName,item.productPrice)"
            style="width: 40px; background-color: #f04646; color: black; margin-top: -15px;"><b>-</b></b-button>

          <b-button @click="removeProduct(item.id,item.quantity,item.productId,item.productName,item.productPrice)" 
            style="width: 100px; background-color: white; color: black; margin-top: -15px; font-size: 20px; margin-top: -15px; justify-content: center; margin-left: 10px;"
          ><b>Eliminar</b></b-button>
           
        <div style="border: black 3px solid; display: flex; justify-content: center; align-items: center; padding-top: 15px; margin-bottom: 10px; margin-left:15px;">

        <p style="margin-left:10px; margin-right:10px;">{{itemTotal(item.productPrice, item.quantity)}}$</p>

        </div>  

        </li>
        
    
      </ul>


      <div>

      <b-button style="background-color: blue; width:200px; height: 100px;" @click="addtoOrder"><router-link :to="{ name: 'checkout' }" style="text-decoration:none; color:white;">Comprar</router-link></b-button>

      </div>

      <div style="border: black 3px solid; width: 120px; display: flex; align-items: center; padding-top: 15px; margin-left: 1250px;">

        <p><b>Total:</b>{{ totalPrice }}$</p>

      </div>

    </section>

  </div>

</template>

<script>
import api_url from "../utils/api";
export default {
  name: "cart",
  created() {
    fetch(api_url("/cart/"))
      .then((result) => result.json())
      .then((data) => (this.items = data));
  },
  beforeRouteUpdate(to, from) {},
  data() {
    return {
      items: [],
    };
  },
  components: {},

 computed: {
    totalPrice: function () {
      let sum = 0;
      for (let i = 0; i < this.items.length; i++) {
        sum +=
          parseFloat(this.items[i].productPrice) *
          parseFloat(this.items[i].quantity);
      }

      return sum;
    },
  },

  methods: {
    upgradeQuantity(id, quantity, productId, name, price) {
      fetch(api_url("/cart/" + id), {
        method: "PUT",
        body: JSON.stringify({
          productId: productId,
          productName: name,
          quantity: quantity + 1,
          productPrice: price,
        }),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      fetch(api_url("/cart/"))
        .then((result) => result.json())
        .then((data) => (this.items = data));
    },


    removeProduct(id, quantity, productId, productName, productPrice) {
      fetch(api_url("/cart/" + id), {
        method: "DELETE",
        body: JSON.stringify({
          productId: productId,
          productName: productName,
          quantity: quantity,
          productPrice: productPrice,
        }),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      fetch(api_url("/cart/"))
        .then((result) => result.json())
        .then((data) => (this.items = data));
    },


    downgradeQuantity(id, quantity, productId, name, price) {
      if (quantity > 1) {
        fetch(api_url("/cart/" + id), {
          method: "PUT",
          body: JSON.stringify({
            productId: productId,
            productName: name,
            quantity: quantity - 1,
            productPrice: price,
          }),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      } else {
        fetch(api_url("/cart/" + id), {
          method: "DELETE",
          body: JSON.stringify({
            productId: productId,
            productName: name,
            quantity: quantity,
            productPrice: price,
          }),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      }
      fetch(api_url("/cart/"))
        .then((result) => result.json())
        .then((data) => (this.items = data));
    },


    itemTotal(productPrice, quantity){
        return (parseFloat(productPrice) * quantity)
    },


    addtoOrder(){
      for (let i = 0; i < this.items.length; i++) {
        fetch(api_url("/orders"), {
          method: "POST",
          body: JSON.stringify({
            productId: this.items[i].id,
            productName: this.items[i].productName,
            quantity: this.items[i].quantity,
            productPrice: this.items[i].productPrice,
            totalProduct: this.items[i].quantity * this.items[i].productPrice,
          }),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      }
      
      fetch(api_url("/orders"), {
          method: "POST",
          body: JSON.stringify({
            totalPrice: this.totalPrice
          }),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
    },


  },

 
};
</script>

<style>
</style>