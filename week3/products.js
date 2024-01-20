// 產品資料格式
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'ting-hex',
      products: [],
      isNew: false,
      tempProduct: {

      },
    }
  },
  methods: {
    checkAdmin() {
      axios.post(`${this.apiUrl}/api/user/check`) // No parameters     
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.message);
          window.location = 'login.html';
        });
    },
    getData(){
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
      .then((response) => {
          console.log(response);
          this.products = response.data.products;
        })
      .catch((err) => { 
        // console.log(err);
        alert(err.response.data.message);
      })
    },
    // 開啟互動式窗Ｍodal
    openModal(status, item){
      if ( status === 'new' ){
        // console.log('new');
        this.tempProduct = {};
        this.isNew = true;
        productModal.show();
      } else if ( status === 'edit' ){
        // console.log('edit'); 
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if ( status === 'delete' ){
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
    // 更新data
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      let http = 'put';

      if(this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
        http = 'post';
      }

      axios[http](url, { data: this.tempProduct })
        .then((response) => {
          alert(response.data.message);
          productModal.hide();
          this.getData(); //取得所有產品的函式  

        }).catch((err) => {
          alert(err.response.data.message);
        })
    },
    delProduct(){
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      axios.delete(url)
        .then((response) => {
          alert(response.data.message);
          delProductModal.hide();
          this.getData(); //更新後重新取得資料

        }).catch((err) => {
          alert(err.response.data.message);
        })
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
  },
  mounted() {
    // 建立 Modal 實體
    productModal = new bootstrap.Modal(
      document.getElementById('productModal'), {
      Keyboard: false,
      backdrop: 'static'
    });
    // 移除 Modal
    delProductModal = new bootstrap.Modal(
      document.getElementById('delProductModal'), {
      Keyboard: false,
      backdrop: 'static'
    });

    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    console.log(token);

    this.checkAdmin();
  }
}).mount('#app');