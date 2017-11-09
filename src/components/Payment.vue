<template>
    <div class="pay">
        <div class="pay-head">
            <img src="../assets/car1.png" alt="">
            <h4>{{payData.carcode}}</h4>
        </div>
        <div class="pay-body">
            <group>
                <cell title="1">
                    <div slot="title" class="li-title">开始时间</div>
                    <div slot="default" class="li-con">{{payData.parkingtime}}</div>
                </cell>
                <cell  title="1">
                    <div slot="title" class="li-title">停车时间</div>
                    <div slot="default" class="li-con">{{payData.parkinglength}}</div>
                </cell>
                <cell title="1">
                    <div slot="title" class="li-title">费用总计</div>
                    <div slot="default" class="li-con money" v-if="payData.total_fee">&yen; {{payData.total_fee}}</div>
                </cell>
            </group>
        </div>
        <div class="pay-yh" v-if="payData.isusecard!=0">
            <group title="使用优惠券">
                <!-- <popup-picker :title="title1" :data="list1" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="选择优惠券">
                <template slot="title" scope="props">
                  <span :class="props.labelClass" :style="props.labelStyle" style="height:30px;">
                  <img style="vertical-align:middle;" src="../assets/hot1.gif" alt="">
                    <span style="vertical-align:middle;font-size:15px;color:#f60">优惠券</span>
                  </span>
                </template>
              </popup-picker> -->
              <cell title="1">
                    <div slot="title" class="li-title" style=" font-size: 14px; color: #7B7B7B;"><img style="vertical-align:middle;" src="../assets/hot1.gif" alt="">优惠金额</div>
                    <div slot="default" class="li-con" style="font-size:14px;color:#ff490b">-{{payData.coupon_fee}}元</div>
                </cell>
            </group>
        </div>
        <div class="pay-btn">
            <button :disabled="isDisabled" @click="pay">缴费：{{payData.cash_fee ? payData.cash_fee : '? '}}元</button>
            <!-- <p>使用说明</p> -->
        </div>
    </div>
</template>

<script>
import { Group, Cell, Icon, Divider, PopupPicker } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
    components: {
        Group,
        Cell,
        Icon,
        Divider,
        PopupPicker
    },
    data () {
        return {
            msg: 'Hello World!',
            title1: '优惠券',
            list1: [['10元优惠券', '5元优惠券']],
            value1: ['10元优惠券'],
            payData:{
                carcode:'',
                parkingtime:'',
                parkinglength:'',
                total_fee:'',
                isusecard:'',
                coupon_fee:'',
                cash_fee:'',
            },
            isDisabled:false,
            btnText:'缴费：？元',
        }
    },
    computed: {
       
    },
    mounted(){
       this.getCarParking();
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
        getCarParking(){
            this.$store.commit('UPDATE_LOADING', true);
            let carcode = this.$route.params.car;
            this.payData.carcode = carcode;
            let openid = localStorage.getItem("openid");
            this.$http.get(API_URL+'?Ctype=QueryParking&Openid='+openid+'&Carcode='+carcode)
                .then(response => {
                    console.log(response)
                    this.$store.commit('UPDATE_LOADING', false);
                    if(response.data.total_fee && response.data.total_fee>0){
                        this.payData = response.data;
                        this.btnText = "缴费："+response.data.total_fee+"元";
                    }else if(response.data.total_fee && response.data.total_fee==0){
                        this.payData.total_fee = 0;
                        this.btnText = "确认出场";
                    }else{
                        this.btnText = "缴费：？元";
                        this.$vux.alert.show({
                            title: '提示',
                            content: '未找到此车辆的停车信息',
                            onHide () {
                                window.history.go(-1);
                            }
                        })
                    }
                })
                .catch(error => {
                    this.$store.commit('UPDATE_LOADING', false);
                })
        },
        pay(){
            if(this.isDisabled || this.payData.total_fee==0){
                return false;
            }
            this.$store.commit('UPDATE_LOADING', true);
            let carcode = this.$route.params.car;
            let carnum = encodeURI(carcode);
            let openid = localStorage.getItem("openid");
            this.$http.get(API_URL+'?Ctype=TmpParkingPay&Openid='+openid+'&Carcode='+carnum)
                .then(response => {
                    this.$store.commit('UPDATE_LOADING', false);
                    console.log(response)
                    if(response.data.purl){
                        window.location.href = response.data.purl;
                    }else if(response.data.ok){
                        window.location.href = "http://dzxt.kaien.cn/result/tmp_success.html";
                    }
                })
                .catch(error => {
                    this.$store.commit('UPDATE_LOADING', false);
                })
        }
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
            &[disabled]{
                background-color: #817E7E;
            }
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
