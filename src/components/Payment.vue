<template>
    <div class="pay">
        <div class="pay-head">
            <img src="../assets/car1.png" alt="">
            <h4>渝A82313</h4>
        </div>
        <div class="pay-body">
            <group>
                <cell title="1">
                    <div slot="title" class="li-title">开始时间</div>
                    <div slot="default" class="li-con">2017-09-09 12:12:20</div>
                </cell>
                <cell  title="1">
                    <div slot="title" class="li-title">结束时间</div>
                    <div slot="default" class="li-con">2017-09-09 20:02:09</div>
                </cell>
                <cell title="1">
                    <div slot="title" class="li-title">缴费金额</div>
                    <div slot="default" class="li-con money">&yen; 21.00</div>
                </cell>
            </group>
        </div>
        <div class="pay-yh">
            <group title="使用优惠券">
                <popup-picker :title="title1" :data="list1" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="选择优惠券">
                <template slot="title" scope="props">
                  <span :class="props.labelClass" :style="props.labelStyle" style="height:30px;">
                  <img style="vertical-align:middle;" src="../assets/hot1.gif" alt="">
                    <span style="vertical-align:middle;font-size:15px;color:#f60">优惠券</span>
                  </span>
                </template>
              </popup-picker>
            </group>
        </div>
        <div class="pay-btn">
            <button>缴费：11.00元</button>
            <p>使用说明</p>
        </div>
    </div>
</template>

<script>
import { Group, Cell, Tabbar, TabbarItem, Icon, Swiper, SwiperItem, Divider, PopupPicker } from 'vux'
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
        PopupPicker
    },
    data () {
        return {
            msg: 'Hello World!',
            title1: '优惠券',
            list1: [['10元优惠券', '5元优惠券']],
            value1: ['10元优惠券'],

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
        onChange (val) {
          console.log('val change', val)
        },
         onShow () {
          console.log('on show')
        },
        onHide (type) {
          console.log('on hide', type)
        },
    }
}
</script>

<style lang="less" scoped>

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
.pay{
    width: 100%;
    .pay-head{
        height: 73px;
        background-color: #ffffff;
        text-align: center;
        img{
            float: left;
            height: 73px;
            width: 180px;
        }
        h4{
            font-size: 28px;
            font-weight: 500;
            height: 70px;
            line-height: 70px;
            display: inline-block;
        }
    }
    .pay-body{
        .weui-cell{
            padding: 15px 15px!important;
        }
        margin-top: 10px;
        .li-title{
            font-size: 14px;
            color: #7B7B7B;
        }
        .li-con{
            font-size: 14px;
            color: #FF490B;
            &.money{
                color: #FF490B;
            }
        }
    }
    .pay-yh{
        margin-top: 16px;
        p{
            font-size: 14px;
            color: #7B7B7B;
            padding-left: 12px;
        }
    }
    .pay-btn{
        padding: 0 15px;
        margin-top: 35px;
        button{
            border: none;
            outline: none;
            height: 48px;
            width: 100%;
            color: #fff;
            background-color: deepskyblue;
            font-size: 16px;
        }
        p{
            text-align: center;
            color: #7B7B7B;
            font-size: 13px;
            margin-top: 15px;

        }
    }

}
</style>
