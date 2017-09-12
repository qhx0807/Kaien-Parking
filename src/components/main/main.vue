<template>
    <div>
        <swiper loop height="100px" dots-class="custom-bottom" dots-position="center">
            <swiper-item class="black"><h2 class="title fadeInUp animated">1</h2></swiper-item>
            <swiper-item class="black"><h2 class="title fadeInUp animated">2</h2></swiper-item>
        </swiper>
        <divider>1</divider>
        <button @click="test">test</button>
    </div>
</template>

<script>
import { Group, Cell, Tabbar, TabbarItem, Icon, Swiper, SwiperItem, Divider } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
    components: {
        Group,
        Cell,
        Tabbar,
        TabbarItem,
        Icon,
        Swiper, 
        SwiperItem,
        Divider,
    },
    data () {
        return {
            msg: 'Hello World!'
        }
    },
    computed: {
       
    },
    mounted(){

    },
    methods:{
        test(){
            this.$store.commit('UPDATE_LOADING', true);
            
        }
    }
}
</script>

<style scoped>

.black {
    
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
</style>
