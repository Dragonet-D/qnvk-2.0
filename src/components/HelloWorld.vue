<template>
  <div class="hello">
    <div>{{value}}</div>
    <button @click="add">add</button>
    <button @click="test">test</button>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'HelloWorld',
  setup() {
    const state = reactive({ value: 1 })
    const a = reactive([1, 2, 3])

    const add = () => {
     state.value++
    }

    const test = () => {
      a[0] = 5
      console.log(a)
    }

    return { ...toRefs(state), add, test }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
