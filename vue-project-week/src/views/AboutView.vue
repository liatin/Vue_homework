<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ userData }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {}
    }
  },
  mounted() {
    console.log(import.meta.env.VITE_TEXT);
    const url = import.meta.env.VITE_PATH;
    this.$http.get(url)
      .then((res) => {
        console.log(res);
        this.userData = res.data.results[0];
        console.log(this.userData);
      }).catch((err) => {
        alert('error');
      });
  },
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
