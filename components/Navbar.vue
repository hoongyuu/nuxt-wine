<template>
  <header class="header">
    <nav class="header-navbar clearfix">
      <div class="header-mobile">
        <h2>Cheeto's Wine</h2>
        <div class="header-mobile-btn">
          <nuxt-link
            to="/cart"
            class="header-mobile-cart"
            @click.native="mobileBtn = false"
          >
            <i class="fas fa-shopping-cart"></i>
          </nuxt-link>
          <button
            type="button"
            class="header-mobile-hamburger"
            @click="mobileBtn = !mobileBtn"
          >
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
      <div class="container">
        <ul class="header-navbar-list" :class="{ active: mobileBtn }">
          <li>
            <nuxt-link
              @click.native="mobileBtn = false"
              class="header-navbar-link"
              to="/"
              :class="{ active: $route.name === 'Index' }"
            >
              回首頁
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              @click.native="mobileBtn = false"
              class="header-navbar-link"
              to="/products"
              :class="{ active: $route.name === 'Products' }"
            >
              商品列表
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              @click.native="mobileBtn = false"
              class="header-navbar-link"
              to="/intro"
              :class="{ active: $route.name === 'Intro' }"
            >
              酒廠介紹
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              @click.native="mobileBtn = false"
              class="header-navbar-link"
              to="/coupon"
              :class="{ active: $route.name === 'Coupon' }"
            >
              優惠活動
            </nuxt-link>
          </li>
          <li class="header-navbar-mobile">
            <nuxt-link
              @click.native="mobileBtn = false"
              class="header-navbar-link"
              to="/favorite"
              :class="{ active: $route.name === 'Favorite' }"
            >
              我的收藏
            </nuxt-link>
          </li>
          <li>
            <a href="https://github.com/hoongyuu" class="header-navbar-link">
              關於作者
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="header-main">
      <div class="container">
        <ul class="header-main-social">
          <li>
            <nuxt-link to="">
              <i class="fab fa-facebook-f"></i>
            </nuxt-link>
          </li>
          <li>
            <a href="https://github.com/hoongyuu">
              <i class="fab fa-github"></i>
            </a>
          </li>
          <li>
            <nuxt-link to>
              <i class="fab fa-instagram"></i>
            </nuxt-link>
          </li>
        </ul>
        <div class="header-main-logo">
          <nuxt-link to="/">
            <h1>Cheeto's Wine</h1>
          </nuxt-link>
        </div>
        <div class="header-main-btn">
          <nuxt-link to="/favorite" class="header-main-favorite">
            <i class="far fa-bookmark"></i> 收藏
          </nuxt-link>
          <nuxt-link
            to="/cart"
            class="header-main-cart"
            v-if="cartData"
          >
            <i class="fas fa-shopping-cart"></i> 購物車( {{ cartData.length }} )
          </nuxt-link>
          <nuxt-link to="/cart" class="header-main-cart" v-else>
            <i class="fas fa-shopping-cart"></i> 購物車
          </nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      mobileBtn: false
    };
  },
  created() {
    this.$store.dispatch('getCartData');
  },
  mounted() {
    $(window).scroll(() => {
      const scrollTop = $(".header").offset().top;
      if (scrollTop > 100) {
        $(".header-navbar-list").addClass("scroll");
        $(".header-main").addClass("scroll");
      }
      if (scrollTop === 0) {
        $(".header-navbar-list").removeClass("scroll");
        $(".header-main").removeClass("scroll");
      }
    });
  },
  computed: {
    cartData() {
      return this.$store.state.cartData;
    }
  }

}
// VUE_APP_APIPATH=https://course-ec-api.hexschool.io/api/
// VUE_APP_UUID=6b69171f-d486-488a-beaf-ee85eb21fa24
</script>

<style>

</style>

