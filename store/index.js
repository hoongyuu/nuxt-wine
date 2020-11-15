import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      cartData: [],
      productsData: [],
      productData: {}
    }),
    actions: {
      async getCartData (context) {
        let api = `${process.env.API_PATH}${process.env.UUID}/ec/shopping`;
        let cartData = [];
        await this.$axios.get(api).then(res => {
          cartData = res.data.data;
          // 取得商品資料
          api = `${process.env.API_PATH}${process.env.UUID}/ec/products?paged=100`;
          return this.$axios.get(api);
        })
        .then(res => {
          const tempData = res.data.data;
          tempData.forEach(item => {
            cartData.forEach(cartItem => {
              if (item.id === cartItem.product.id) {
                cartItem.productData = item;
              }
            });
          });
          context.commit("CARTDATA", cartData);
        })
        .catch((err) => {
          console.log(err);
        });
      },
      async getProductsData(context) {
        const api = `${process.env.API_PATH}${process.env.UUID}/ec/products?paged=100`;

        await this.$axios.get(api).then(res => {
          let data = res.data.data;
          data.forEach(item => {
            item.quantity = 1;
            item.stared = false;
          });
          context.commit("PRODUCTSDATA", data);
        });
      },
      async getProductData(context, id) {
        let api = `${process.env.API_PATH}${process.env.UUID}/ec/product/${id}`;

        await this.$axios.get(api).then(res => {
          let data = res.data.data;
          data.stared = false;
          data.quantity = 1;
          context.commit("PRODUCTDATA", data);
        });
      }
    },
    mutations: {
      CARTDATA(state, payload) {
        state.cartData = payload;
      },
      PRODUCTSDATA(state, payload) {
        state.productsData = payload;
      },
      PRODUCTDATA(state, payload) {
        state.productData = payload;
      }
    }
  })
}

export default createStore
