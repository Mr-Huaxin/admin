<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ msg }}</div>
  </div>
</template>

<script>
import { getSeatDataVolume } from '@/api/api'

export default {
  name: 'home',
  data () {
    return {
      msg: 'home'
    }
  },
  mounted () {
    // this.getData()
  },
  methods: {
 /*   getData() {
      // 入参
      let para = {

      }
      getSeatDataVolume(para).then(res => {
        console.log(res);
      })
    }*/
  }
}
</script>

<style scoped>

</style>
