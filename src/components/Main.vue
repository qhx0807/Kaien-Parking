<template>
    <div class="main-wrap">
         <p v-if="isLoading" style="text-align:center;">
            <inline-loading></inline-loading>
            <span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;加载中</span>
        </p>
        <p v-if="carList.length>0" class="title">请选择车牌号去缴费：</p>
        
        <div class="car-item vux-1px-b" v-for="item in carList" :key="item">
            <h4 v-html="parse(item).CarCode"></h4>
            <p>{{ parse(item).parkingtype }}</p>
            <button @click="goPayment(parse(item).parkingtype,parse(item).CarCode)">缴费</button>
        </div>
        <div class="no-bind-car" v-if="carList.length==0 && !isLoading">
            <p><icon type="safe-warn"></icon>您暂未绑定车辆</p>
            <span @click="goBindCar">去绑定车辆&gt;&gt;</span>
        </div>
        <div style="text-align:right;padding-top:10px">
            <span v-if="carList.length>0" class="bind-car-link" @click="goBindCar">去绑定车辆</span>
        </div>
    </div>
</template>

<script>

import { Group, Cell, CellBox,Tabbar, TabbarItem, Icon, Swiper, SwiperItem, Divider, XButton, InlineLoading } from 'vux'
import { mapState, mapActions } from 'vuex'
//{'openid':'ofgtAt-7QRzRwop5Ufm7Y2Iz0A2Y"}
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
        XButton,
        InlineLoading
    },
    data () {
        return {
            openid:'ofgtAt-7QRzRwop5Ufm7Y2Iz0A2Y',
            isLoading:true,
            carList:[],
        }
    },
    computed: {
       
    },
    mounted(){
       this.getCarList()
    },
    methods:{
        goBindCar(){
            if(this.carList.length>=5){
                this.$vux.toast.show({
                    type: 'warn',
                    text: '绑定车牌数量不能超过5个'
                })
                return false
            }
            this.$store.commit('UPDATE_DIRECTION', 'forward');
            this.$router.push({name:'bindcar'});
        },
        goPayment(type, carcode){
            if(type=='免费车'){
                this.$vux.toast.text('免费车不能缴费', 'middle')
                return false
            }
            this.$store.commit('UPDATE_DIRECTION', 'forward');
            if(type=="月票车"){
                this.$router.push({name:'monpayment', params:{car: carcode}});
            }else{
                this.$router.push({name:'payment', params:{car: carcode}});
            }
        },
        getCarList(){
            let openid = localStorage.getItem("openid")
            this.$http.get(API_URL+'?Ctype=GetCarList&Openid='+openid)
                .then(response => {
                    //console.log(response.data)
                    this.carList = JSON.parse(response.data.cars);
                    if(this.carList.length==0){
                        this.$router.push({name:'bindcar'})
                    }
                    this.isLoading = false;
                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false;
                    //this.$vux.toast.text('网络连接出错！', 'middle')
                })
        },
         parse(str){
            return JSON.parse(str)
        }
    }
}


</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';

.main-wrap{
    padding-bottom: 30px;
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
    background-color: #fff;
    position: relative;
    padding-left: 15px;
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
        right: 15px;
        top: 22px;
        border: none;
        outline: none;
        height: 32px;
        line-height: 32px;
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
.bind-car-link{
    text-align: right;
    margin-right: 12px;
    font-size: 14px;
    color: #949494;
    margin-top: 10px;
}
.no-bind-car{
    height: 50px;
    text-align: center;
    padding-top: 50px;
    p{
        line-height: 16px;
        color: #f60;
        margin-bottom: 30px;
        i{
            vertical-align: top;
        }
    }
    span{
        font-size: 14px;
        color: dimgrey;
    }
}
</style>
