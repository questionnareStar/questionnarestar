import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import Vue from 'vue'

extend('required', {
  ...required,
  message: '必答题，请作答'
})

extend('mark', value => {
  if (value > 0) {
    return true;
  }
  return '必答题，请作答';
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)