import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'; 

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      axios.post(`${this.apiUrl}/admin/signin`, this.user ) // promise方法裡會用then來進行串接
        .then((response) => {
          console.log("Login success");
          // console.log(response);
          // 取出token
          const { token, expired } = response.data;
          console.log(token, expired);
          // 儲存token: 在六角提供的MDN網站找，expired需轉型
          document.cookie = `hextoken=${token}; expires=${new Date(expired)}; path=/`;
          window.location = 'products.html';
        })
        .catch((err) => {
          console.log("Login error");
          // console.log(err);
          alert(err.data.message);
          // 改dir讓error訊息可以展開
        });
      // #2 end
    },
  },
}).mount("#app");
