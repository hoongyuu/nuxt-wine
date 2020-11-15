<template>
  <section class="product">
    <div class="container">
      <div class="product-main">
        <div class="product-main-img">
          <img :src="productData.imageUrl" />
        </div>
        <div class="product-main-txt">
          <div
            class="product-main-favorite"
            @click.stop="addStared(productData)"
          >
            <i v-if="productData.stared == true" class="fas fa-bookmark"></i>
            <i v-else class="far fa-bookmark"></i>
          </div>
          <h4 class="item-winery">{{ productData.options.winery }}</h4>
          <h2 class="item-title">{{ productData.title }}</h2>
          <p class="item-info">
            {{ productData.options.year }} | {{ productData.category }} |
            {{ productData.options.capacity }}
          </p>
          <div class="product-main-box">
            <div class="product-main-price">
              <span class="sale-price"
                >$ {{ productData.price | currency }}</span
              >
              <span class="price"
                >$ {{ productData.origin_price | currency }}</span
              >
            </div>
            <div class="product-main-quantity">
              <button
                type="button"
                @click="productData.quantity -= 1"
                :disabled="productData.quantity <= 1"
              >
                <i class="fas fa-minus"></i>
              </button>
              <input
                type="text"
                v-model="productData.quantity"
                @keyup="checkNum(productData)"
              />
              <button type="button" @click="productData.quantity += 1">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="product-main-btn">
            <button
              type="button"
              class="btn product-main-cart"
              @click="addCart(productData)"
            >
              加入購物車
            </button>
            <button
              type="button"
              class="btn product-main-buy"
              @click="addCart(productData, 'buy')"
            >
              立即購買
            </button>
          </div>
        </div>
      </div>
      <div class="product-info">
        <div class="product-info-item">
          <h3>酒款介紹</h3>
          <div class="product-info-txt">
            <div class="product-info-txt-item">
              <span> <i class="fas fa-map-marker-alt"></i> 產地 </span>
              <h4>{{ productData.options.place }}</h4>
            </div>
            <div class="product-info-txt-item">
              <span><i class="fas fa-wine-bottle"></i> 酒廠</span>
              <h4>{{ productData.options.winery }}</h4>
            </div>
            <div class="product-info-txt-item">
              <span><i class="fas fa-wine-glass-alt"></i> 年份</span>
              <h4>{{ productData.options.year }}</h4>
            </div>
            <div class="product-info-txt-item">
              <span><i class="fas fa-leaf"></i> 品種</span>
              <h4>{{ productData.category }}</h4>
            </div>
          </div>
        </div>
        <div class="product-info-item">
          <h3>酒造資訊</h3>
          <p v-html="productData.description"></p>
        </div>
        <div class="product-info-item">
          <h3>酒評分享</h3>
          <p v-html="productData.content"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import addCart from "@/api/addCart.js";
import checkNum from "@/api/checkNum.js";
import stare from "@/api/stare.js";
export default {
  async fetch({ query, store }) {
    this.id = query.id;
    return Promise.all([
      store.dispatch('getProductData', query.id)
    ])
  },
  data() {
    return {
      id: ""
    };
  },
  mixins: [addCart, checkNum, stare],
  mounted() {
    if (process.browser) {
      let stareData = JSON.parse(localStorage.getItem("favoriteWine")) ||[];
      this.stareData = stareData;
    }
    this.addStare();
  },
  methods: {
    addStare() {
      this.stareData.forEach(item => {
        if (item.title === this.productData.title) {
          this.$store.state.productData.stared = true
        }
      });
    }
  },
  computed: {
    productData() {
      return this.$store.state.productData;
    }
  }
}
</script>

<style>

</style>
