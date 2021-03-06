import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from "@/components/common/toast/index.js";

import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false
    //添加事件总线
Vue.prototype.$bus = new Vue()
    //安装toast插件
Vue.use(toast)
    //安装fastclick解决移动端300ms延迟问题
FastClick.attach(document.body)
    //图片懒加载
Vue.use(VueLazyLoad, {
    loading: require("./assets/img/common/load.gif"),
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')