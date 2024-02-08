// 產品資料格式
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

import pagination from './pagination.js';
import productModal from './productModal.js';
import delProductModal from './delProductModal.js';


const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'ting-hex',
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [], // 多圖
      },
      pagination: {},
      productModal: null,
      delProductModal: null,
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
    getData(page = 1){ // 參數預設值
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`)
      .then((response) => {
          console.log(response);
          this.products = response.data.products;
          this.pagination = response.data.pagination;

        })
      .catch((err) => { 
        alert(err.response.data.message);
      })
    },
    // 開啟互動式窗Ｍodal
    openModal(status, item){
      if ( status === 'new' ){
        // console.log('new');
        this.tempProduct = {};
        this.isNew = true;
        // this.productModal.show();
        this.$refs.pModal.openModal();
      } else if ( status === 'edit' ){
        // console.log('edit'); 
        this.tempProduct = { ...item };
        this.isNew = false;
        // this.productModal.show();
        this.$refs.pModal.openModal();
      } else if ( status === 'delete' ){
        this.tempProduct = { ...item };
        // this.delProductModal.show();
        this.$refs.dModal.openModal();
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
          // this.productModal.hide();
          this.$refs.pModal.closeModal();
          this.getData(); //取得所有產品的函式  

        }).catch((err) => {
          alert(err.response.data.message);
        })
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
    delProduct(){
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      axios.delete(url)
        .then((response) => {
          alert(response.data.message);
          this.$refs.dModal.hideModal();
          this.getData(); //更新後重新取得資料

        }).catch((err) => {
          alert(err.response.data.message);
        })
    },

  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    // console.log(token); //確認token

    this.checkAdmin();
  },
  components: {
    pagination,
    productModal,
    delProductModal,
  },
});

app.mount('#app');