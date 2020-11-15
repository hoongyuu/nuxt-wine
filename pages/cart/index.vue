<template>
  <section class="cart">
    <div class="container">
      <div class="cart-header">
        <h2>購物車</h2>
        <nuxt-link to="/products">
          <i class="fas fa-angle-left"></i>
          繼續選購
        </nuxt-link>
      </div>
      <div class="cart-main" v-if="cartData.length === 0">
        <h3 class="cart-main-empty">您的購物車目前是空的</h3>
      </div>
      <div class="cart-main" v-else>
        <div
          class="cart-main-item"
          v-for="item in cartData"
          :key="item.product.id"
        >
            <div class="cart-main-info">
              <img :src="item.product.imageUrl" />
              <div class="cart-main-txt">
                <h4 class="item-winery">
                  {{ item.productData.options.winery }}
                </h4>
                <h3 class="item-title">{{ item.product.title }}</h3>
                <span class="item-info">
                  {{ item.productData.options.year }} |
                  {{ item.productData.options.capacity }} |
                  {{ item.product.category }}
                </span>
              </div>
            </div>
            <div class="cart-main-quantity">
              <button
                type="button"
                @click="updateData(item, 'reduce')"
                :disabled="item.quantity === 1"
              >
                -
              </button>
              <input
                type="text"
                v-model="item.quantity"
                @keyup="checkNum(item)"
                @change="updateData(item)"
              />
              <button type="button" @click="updateData(item, 'increment')">
                +
              </button>
            </div>
            <div class="cart-main-del">
              <button type="button" @click="showDel(item.productData)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
            <span class="cart-main-price">
              $ {{ (item.product.price * item.quantity) | currency }}
            </span>
          </div>
        <div class="cart-main-confirm">
          <nuxt-link to="cart/cart-form" class="btn">確認購物單</nuxt-link>
        </div>
        <!-- delModal -->
        <delmodel
          :class="{ active: showModal }"
          :item="delData"
          @close="showModal = false"
          @update="getCartData()"
        ></delmodel>
      </div>
    </div>
  </section>
</template>

<script>
import checkNum from "@/api/checkNum.js";
import delmodel from "@/components/Delmodel";
export default {
  async asyncData({ store }) {
    return Promise.all([
      store.dispatch('getCartData')
    ])
  },
  data() {
    return {
      delData: {
        product: {
          title: ""
        }
      },
      showModal: false
    };
  },
  components: { delmodel },
  mixins: [checkNum],
  methods: {
    getCartData() {
      this.$store.dispatch('getCartData');
    },
    updateData(item, type) {
      let api = `${process.env.API_PATH}${process.env.UUID}/ec/shopping`;
      switch (type) {
        case "increment":
          item.quantity += 1;
          break;
        case "reduce":
          item.quantity -= 1;
          break;
      }

      const cart = {
        product: item.product.id,
        quantity: item.quantity
      };

      this.$axios.patch(api, cart)
        .then(() => {
        }).catch(() => {
        });
    },
    showDel(item) {
      this.delData = item;
      this.showModal = true;
    }
  },
  computed: {
    cartData() {
      return this.$store.state.cartData;
    }
  }
}
</script>

<style>

</style>
