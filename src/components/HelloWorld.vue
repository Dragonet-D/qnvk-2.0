<template>
  <div class="hello">
    <div>{{value}}</div>
    <button @click="add">add</button>
    <button @click="test">test</button>
    <input type="text" v-model="input">
  </div>
</template>

<script>
import a from './test'
import { reactive, toRefs, watchEffect } from 'vue'
export default {
  name: 'HelloWorld',
  mounted() {
    console.log(a)
  },
  setup() {
    const state = reactive({ value: 1, input: '' })

    const add = () => {
     state.value++
    }

    const test = () => {
      find(a, state.input || '华发集团')
    }

    const find = (list, name) => {
      let walker = function (array, label) {
        let going = false;
        array.forEach(item => {
          if (item['child']) {
            let a = walker(item['child'], label);
            if (a) {
              item.isEnable = false;
              going = true;``
            } else if ((item['name'].includes(label) || item['areaName'].includes(label)) || label === '') {
              item.isEnable = false;
              going = true;
            } else {
              item.isEnable = true;
            }
          } else if ((item['name'].includes(label) || item['areaName'].includes(label)) || label === '') {
            item.isEnable = false;
            going = true;
          } else {
            item.isEnable = true;
          }
        });
        return going;
      }
      walker(list, name);
      console.log(list)
    }

    watchEffect(() => {
      // console.log(state.input)
    })

    return { ...toRefs(state), add, test }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
