<template>
    <div class="ts">
        <div class="tickets">
            <p class="type">卡券类型</p>
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/3" v-for="(item, index) in ticketsData" :key="item.val">
                    <div class="flex-demo" :class="{active:selectedTicket==index}" @click="selectTicket(index, item.cardname)">
                        <!-- <img src="../assets/h3.png" alt=""> -->
                        <h4 class="tic-name">{{item.name}}</h4>
                        <p class="mon">&yen; {{item.val}}</p>
                    </div>
                </flexbox-item>
                
            </flexbox>
            
            
        </div>
        <div class="tickets-foot">
            <p class="tips">温馨提示：购买优惠券可用于抵用停车费</p>
            <button @click="buyTicket">优惠价：{{payfee}}元</button>
            <p class="foot-tip">
                <a href="">购买记录</a>
                <span> |</span>
                <a href="">常见问题</a>
            </p>
        </div>
    </div>
</template>

<script>
import { Checker, CheckerItem, Group, Cell, Tabbar, TabbarItem, Icon, Swiper, SwiperItem, Divider, Flexbox, FlexboxItem } from 'vux'
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
        Checker,
        CheckerItem,
        Flexbox,
        FlexboxItem
    },
    data () {
        return {
            msg: 'Hello World!',
            demo5: 1,
            ticketsData:[
                {
                    name:'3元券',
                    val:'3.00',
                    cardname:'3元停车卷',
                },
                {
                    name:'5元券',
                    val:'5.00',
                    cardname:'5元停车卷',
                },
                {
                    name:'10元券',
                    val:'10.00',
                    cardname:'10元停车卷',
                },
            ],
            selectedTicket:-1,
            payfee:'？',
            cardname:'',
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
        selectTicket(index, cardname){
            this.selectedTicket = index;
            this.cardname = cardname;
            switch (index){
                case 0:
                    this.payfee = 3;
                    break;
                case 1:
                    this.payfee = 5;
                    break;
                case 2:
                    this.payfee = 10;
                    break;
                default:
                    this.payfee = "？";
            }
        },
        buyTicket(){
            if(this.cardname==""){
                this.$vux.alert.show({
                    title: '提示',
                    content: '请选择一种卡券！',
                })
                return false;
            }
            this.$store.commit('UPDATE_LOADING', true);
            let openid = localStorage.getItem("openid");
            this.$http.get(API_URL+'?Ctype=BuyCard&Openid='+openid+'&cardname='+this.cardname)
                .then(response => {
                    this.$store.commit('UPDATE_LOADING', false);
                    console.log(response)
                    if(response.data.payurl){
                        window.location.href = response.data.payurl;
                    }else{
                        this.$vux.toast.show({
                            type: 'warn',
                            text: 'error'
                        })
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
@import '~vux/src/styles/1px.less';
.tickets{
    padding-top: 30px;
    background-color: #fff;
    padding-bottom: 40px;
    height: 400px;
    .type{
        font-size: 16px;
        color: black;
        padding-left: 12px;
        margin-bottom: 1px;
    }
    .zw{
        height: 20px;
        width: 100%;
        background-color: #fff;
    }

}
.tickets-foot{
    height: 130px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
   // margin-top: 120px;
    background-color: #F2F3F6;
    padding: 12px 18px;
    .tips{
        font-size: 14px;
        color: #f60;
        text-align: center;
    }
    button{
        width: 100%;
        border: none;
        outline: none;
        height: 44px;
        background-color: #FF5466;
        color: white;
        font-size: 16px;
        margin-top: 8px;
    }
    .foot-tip{
        margin-top: 12px;
        text-align: center;
        a{
            color: skyblue;
            font-size: 14px;
        }
        span{
            color: gray;
            font-size: 14px;
        }
    }
}
.flex-demo{
    margin: 6px;
    background-color: white;
    height: 55px;
    position: relative;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #eee;
    color:deepskyblue;
    img{
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 9;
        height: 30px;
        
    }
    .tic-name{
        font-weight: normal;
        font-size: 16px;
        color: deepskyblue;
        margin-top: 6px;
        // line-height: 55px;
    }
    .num-name{
        font-weight: normal;
        font-size: 16px;
        color: deepskyblue;
        line-height: 55px;
    }
    &.active{
        background-color: deepskyblue;
        color: #fff;
        border:1px solid deepskyblue;
        .tic-name{
            color: #fff;
        }
    }
    .num{
        display: inline-block;
        font-size: 12px;
        position: absolute;
        right: 6px;
        top: 4px;
    }
    .mon{
        font-size: 13px;
    }
}
</style>
