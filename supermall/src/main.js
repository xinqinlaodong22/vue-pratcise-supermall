import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from './network/request'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    axios,
}).$mount('#app')