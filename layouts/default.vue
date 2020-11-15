<template>
  <div>
    <navbar></navbar>
    <transition name="fade">
      <Nuxt />
    </transition>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import navbar from "@/components/Navbar";
import indexFooter from "@/components/Footer";

export default {
  components: {
    navbar,
    indexFooter
  }
}
</script>

<style>
</style>
