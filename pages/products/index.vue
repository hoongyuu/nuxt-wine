<template>
  <section class="products">
    <div class="products-hero">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/cheetoblog-8edf4.appspot.com/o/%E9%9B%BB%E5%95%86%E7%B6%B2%E7%AB%99%2Fproducts-hero.png?alt=media&token=ad237ae1-a02c-40fd-8732-e41ed6d1ffbc"
        class="products-hero-img"
      />
      <img
        src="https://firebasestorage.googleapis.com/v0/b/cheetoblog-8edf4.appspot.com/o/%E9%9B%BB%E5%95%86%E7%B6%B2%E7%AB%99%2Fproducts-hero-mobile.png?alt=media&token=c1af88eb-e381-4001-b1db-be254ffd20b2"
        class="products-hero-img--mobile"
      />
      <div class="products-hero-txt">
        <h2>Cheeto's Wine</h2>
        <h3>
          過人品味
          <span>匠心獨到</span>
        </h3>
      </div>
    </div>
    <h2 class="products-title" v-if="wineStyle">
      {{ wineStyle }}
    </h2>
    <h2 class="products-title" v-else>
      所有酒類
    </h2>
    <div class="products-header">
      <div class="container">
        <button
          class="products-header-hamburger"
          @click="mobile.category = !mobile.category"
        >
          分類
          <i class="fas fa-caret-down"></i>
        </button>
        <ul
          class="products-header-category"
          :class="{ active: mobile.category, style: mobile.style }"
        >
          <li>
            <a
              href="#"
              @click.prevent="
                wineStyle = '所有酒款';
                mobile.category = false;
              "
              >所有酒款</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="
                wineStyle = '熱門酒款';
                mobile.category = false;
              "
              >熱門酒款</a
            >
          </li>
          <li>
            <span @click="mobile.style = !mobile.style">
              酒款分類
              <i class="fas fa-caret-down"></i>
            </span>
            <ul>
              <li>
                <a
                  href="#"
                  @click.prevent="
                    wineStyle = '香檳氣泡酒';
                    mobile.category = false;
                  "
                >
                  氣泡酒
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="
                    wineStyle = '葡萄酒';
                    mobile.category = false;
                  "
                >
                  葡萄酒
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="
                    wineStyle = '威士忌';
                    mobile.category = false;
                  "
                >
                  威士忌
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="
                    wineStyle = '其他酒類';
                    mobile.category = false;
                  "
                >
                  其他酒類
                </a>
              </li>
            </ul>
          </li>
          <li class="products-header-category-sort">
            <span>
              依價格排序
            </span>
            <ul>
              <li>
                <a
                  href="#"
                  @click.prevent="
                    sortData = 'highToLow';
                    mobile.style = false;
                  "
                >
                  價格：高到低
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="
                    sortData = 'lowToHigh';
                    mobile.style = false;
                  "
                >
                  價格：低到高
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="products-main">
      <div class="container">
        <div
          class="products-main-item"
          v-for="item in filterProduct"
          :key="item.id"
          @click="goDetail(item)"
        >
          <div class="products-main-favorite" @click.stop="addStared(item)">
            <i v-if="item.stared == true" class="fas fa-bookmark"></i>
            <i v-else class="far fa-bookmark"></i>
          </div>
          <img :src="item.imageUrl" />
          <div class="products-main-txt">
            <h2>
              <a href="#" @click.prevent="goDetail(item)">{{ item.title }}</a>
            </h2>
            <div class="products-main-price">
              <span class="price"> ${{ item.origin_price | currency }} </span>
              <span class="sale-price">SALE ${{ item.price | currency }}</span>
            </div>
            <div class="products-main-info">
              <span>{{ item.options.capacity }}</span>
              <input
                type="text"
                v-model="item.quantity"
                @keyup="checkNum(item)"
                @click.stop=""
              />
            </div>
            <div class="products-main-btn">
              <a href="#" class="btn-init" @click.prevent.stop="addCart(item)">
                <div class="spinner" v-if="spannerStatus === item.id">
                  <div class="double-bounce1"></div>
                  <div class="double-bounce2"></div>
                </div>
                加入購物車
              </a>
            </div>
          </div>
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
  async asyncData({ store }) {
    return Promise.all([
      store.dispatch('getProductsData')
    ])
  },
  data () {
    return {
      wineStyle: "",
      sortData: "",
      mobile: {
        category: false,
        style: false
      },
      pages: {},
      spannerStatus: ""
    };
  },
  mixins: [addCart, checkNum, stare],
  mounted () {
    if (this.$route.query.wineStyle) {
      this.wineStyle = this.$route.query.wineStyle;
    }
    if (process.browser) {
      let stareData = JSON.parse(localStorage.getItem("favoriteWine")) ||[];
      this.stareData = stareData;
    }
    this.addStare()
  },
  methods: {
    getProductsData () {
      this.$store.dispatch('getProductsData');
    },
    goDetail(item) {
      this.$router.push({ path: `products/${item.id}`, query: { id: item.id } });
    },
    addStare() {
      if (process.browser) {
        this.productsData.forEach(item => {
          this.stareData.forEach(stare => {
            if (item.title === stare.title) {
              item.stared = true;
            }
          })
        })
      } else {
        return
      }
    }
  },
  computed: {
    productsData() {
      return this.$store.state.productsData;
    },
    filterProduct() {
      let filterData = [];
      switch (this.wineStyle) {
        case "其他酒類":
          this.productsData.forEach(item => {
            if (
              item.category === "清酒" ||
              item.category === "梅酒" ||
              item.category === "礦泉水"
            ) {
              filterData.push(item);
            }
          });
          break;
        case "香檳氣泡酒":
        case "威士忌":
        case "葡萄酒":
          this.productsData.forEach(item => {
            if (item.category === this.wineStyle) {
              filterData.push(item);
            }
          });
          break;
        case "熱門酒款":
          this.productsData.forEach(item => {
            if (item.options.popular === true) {
              filterData.push(item);
            }
          });
          break;
        default:
          filterData = this.productsData;
          break;
      }
      //價格排序
       filterData.sort((a, b) => {
         if (this.sortData === "highToLow") {
           return b.price - a.price;
         } else {
          return a.price - b.price;
         }
      });
      return filterData;
    }
  }
}
</script>

<style>
.spinner {
  width: 20px;
  height: 20px;
  position: relative;
}
.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}
.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}
@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
