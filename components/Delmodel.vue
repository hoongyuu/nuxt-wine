<template>
  <transition name="fade">
    <div class="modal" @click.self="$emit('close')">
      <div class="modal-del">
        <div class="modal-del-header">
          刪除商品
        </div>
        <div class="modal-del-body">
          是否確認刪除
          <span>{{ item.title }}</span>
          商品(刪除後將無法復原)
        </div>
        <div class="modal-del-footer">
          <button
            type="button"
            @click="
              $emit('close');
              delCart();
            "
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {item: Object},
  methods: {
    delCart() {
      let api = `${process.env.API_PATH}${process.env.UUID}/ec/shopping/${this.item.id}`;

      this.$axios.delete(api).then(() => {
        this.$emit("update");
      });
    }
  },
}
</script>

<style>

</style>
