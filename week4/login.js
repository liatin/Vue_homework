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
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;
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

// eyJhbGciOiJSUzI1NiIsImtpZCI6ImxrMDJBdyJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNzA1NjU3NDE5LCJ1c2VyX2lkIjoia1pDeEVqM2JFaVNrUG5FQXJ4RE1RRklnNzB2MiIsInN1YiI6ImtaQ3hFajNiRWlTa1BuRUFyeERNUUZJZzcwdjIiLCJpYXQiOjE3MDU2NTc0MTksImV4cCI6MTcwNjA4OTQxOSwiZW1haWwiOiJsaWFyYTA0MDRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImxpYXJhMDQwNEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.jPZNM5DHNV59dfLGEVWGMYieLXigk8rsucfVsx-zlRJ757u9HxvcgH8LP05aXnJHiZ3CYBLsrI5Xeiio7WvdSqnB7ted9bHFOY8nw9CDaEzd46WtxGPDAQd4E-pOrXmyfRuKSq679S3yHn6YPEmdavwWc2gFNbq-YOa5Vpu7MXOexRrCiVs7BqzJwHO6Hfaz_ssE-zjdik9m23NybLf51CRFCswmkm6GGw1g04jzZVgSFS6cQOfbfmOvJ8jBbzNhMFnWuguRnHLhzOZ1gM0wpfi74N07Ph-PqfqmZ_C7LD8PitJLzK2VaNF-OPlvdN2rReRZI3oTvd57uRj6dpmtYQ