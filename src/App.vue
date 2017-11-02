<template>
    <div style="height:100%;">
        <router-view class="router-view"></router-view>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
export default {
    components: {

    },
    data () {
        return {
            m:'ss',
        }
    },
    mounted () {
       //this.getWxOpenid()
    },
    methods: {
        
    }
}
</script>

<style lang="less">
body{
    margin:0;
}
.router-view{
    height: 100%;
}
</style>