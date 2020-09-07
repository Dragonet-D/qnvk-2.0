<template>
  <div class="hello">
    <div>{{value}}</div>
    <button @click="add">add</button>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'HelloWorld',
  setup() {
    const state = reactive({ value: 1 })

    const add = () => {
     state.value++
    }

    return { ...toRefs(state), add }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
