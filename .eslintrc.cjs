/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env:{
    node:true
  },
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides:[
    {
      files:['src/views/**/*.vue'],
      rules:{
        'vue/multi-word-component-names':0
        //关闭eslint multiword
        
           },
      
    }
    // ,{
    //   files:['*.js'],
    //   rules:{
    //     "no-unused-vars": "off"
    //      //不在提示unused错误
  
    //   }
    // }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
