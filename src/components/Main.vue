<template>
    <div>
        <!-- <swiper loop height="100px" dots-class="custom-bottom" dots-position="center">
            <swiper-item class="black"><h2 class="title fadeInUp animated">1</h2></swiper-item>
            <swiper-item class="black"><h2 class="title fadeInUp animated">2</h2></swiper-item>
        </swiper> -->
        <p class="title">请选择车牌号去缴费：</p>
        <div class="car-item vux-1px-b">
            <h4>渝A781212</h4>
            <p>未找到在场车辆信息</p>
            <button @click="goPayment">缴费</button>
        </div>
        <div class="car-item vux-1px-b">
            <h4>渝A781212</h4>
            <p>未找到在场车辆信息</p>
            <button @click="goPayment">缴费</button>
        </div>
        <div class="car-item vux-1px-b">
            <h4>渝A781212</h4>
            <p>未找到在场车辆信息</p>
            <button disabled>缴费</button>
        </div>
        <p class="subtit" @click="goBindCar">去绑定车辆
            <!-- <router-link :to="{name:'bindcar'}">去绑定车辆</router-link> -->
        </p>
    </div>
</template>

<script>

import { Group, Cell, CellBox,Tabbar, TabbarItem, Icon, Swiper, SwiperItem, Divider, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
    name:'main',
    components: {
        Group,
        Cell,
        CellBox,
        Tabbar,
        TabbarItem,
        Icon,
        Swiper,
        SwiperItem,
        Divider,
        XButton
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
        },
        goBindCar(){
            this.$store.commit('UPDATE_DIRECTION', 'forward');
            this.$router.push({name:'bindcar'});
        },
        goPayment(){
            this.$store.commit('UPDATE_DIRECTION', 'forward');
            this.$router.push({name:'payment'});
        }
    }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';

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
.title{
    padding: 8px;
    height: 20px;
    color: #949494;
    line-height: 20px;
    text-align: left;
    font-size: 14px;
    padding-left: 12px;
}
.car-item{
    height: 66px;
    width: 100%;
    background-color: #fff;
    position: relative;
    padding-left: 12px;
    padding-top: 12px;
    h4{
        font-size: 17px;
        font-weight: normal;
    }
    p{
        font-size: 14px;
        color: #949494;
    }
    button{
        position: absolute;
        right: 24px;
        top: 22px;
        border: none;
        outline: none;
        height: 32px;
        width: 60px;
        line-height: 32px;
        color: white;
        border-radius: 4px;
        background-color: skyblue;
        letter-spacing: 1px;
        &[disabled]{
            background-color: #ddd;
        }
    }

}
.subtit{
    font-size: 14px;
    color: #949494;
    text-align: right;
    margin-top: 10px;
    padding-right: 12px;
}
</style>
