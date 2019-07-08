import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import '@/assets/css/tailwind.css'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

Array.prototype.clone = function() {
	return this.slice(0)
}

new Vue({
	render: h => h(App)
}).$mount('#app')
