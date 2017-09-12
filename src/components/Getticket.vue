<template>
    <div class="tickets">
        <p class="type">卡券类型</p>
        <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3">
                <div class="flex-demo active">
                    <img src="../assets/h.png" alt="">
                    <h4 class="tic-name">一元卷</h4>
                    <p class="mon">&yen; 1.00</p>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
                <div class="flex-demo">
                    <img src="../assets/h.png" alt="">
                     <h4 class="tic-name">一元卷</h4>
                     <p class="mon">&yen; 1.00</p>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
                <div class="flex-demo">
                    <img src="../assets/h.png" alt="">
                     <h4 class="tic-name">一元卷</h4>
                     <p class="mon">&yen; 1.00</p>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
                <div class="flex-demo">
                    <img src="../assets/h.png" alt="">
                     <h4 class="tic-name">一元卷</h4>
                     <p class="mon">&yen; 1.00</p>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
                <div class="flex-demo">
                    <img src="../assets/h.png" alt="">
                     <h4 class="tic-name">一元卷</h4>
                     <p class="mon">&yen; 1.00</p>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
                <div class="flex-demo">
                    <img src="../assets/h.png" alt="">
                     <h4 class="tic-name">一元卷</h4>
                     <p class="mon">&yen; 1.00</p>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
                <div class="flex-demo">
                    <img src="../assets/h.png" alt="">
                     <h4 class="tic-name">一元卷</h4>
                     <p class="mon">&yen; 1.00</p>
                </div>
            </flexbox-item>
        </flexbox>
        <p class="type" style="margin-top:10px;">卡券数量</p>
        <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3">
                <div class="flex-demo">
                    <h4 class="num-name">一张</h4>
                    <span class="num">x1</span>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
                <div class="flex-demo">
                    <h4 class="num-name">五张</h4>
                    <span class="num">x5</span>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
                <div class="flex-demo">
                    <h4 class="num-name">十张</h4>
                    <span class="num">x10</span>
                </div>
            </flexbox-item>
        </flexbox>
        <div class="tickets-foot">
            <p class="tips">温馨提示：购买优惠券可用于抵用停车费</p>
            <button>优惠价：？元</button>
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
                    name:'一元券',
                    val:'1',
                },
                {
                    name:'三元券',
                    val:'3',
                },
                {
                    name:'五元券',
                    val:'5',
                },
                {
                    name:'二小时卷',
                    val:'2h',
                },
                {
                    name:'四小时卷',
                    val:'4h',
                },
                {
                    name:'全免费卷',
                    val:'h',
                },
            ],
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

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
.tickets{
    padding-top: 14px;
    background-color: #fff;
    padding-bottom: 20px;
    .type{
        font-size: 16px;
        color: black;
        padding-left: 12px;
        margin-bottom: 1px;
    }
    .tickets-foot{
        height: 130px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
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
            margin-top: 10px;
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
}
.flex-demo{
    margin: 6px;
    background-color: white;
    height: 55px;
    position: relative;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #ddd;
    color:deepskyblue;
    img{
        position: absolute;
        top: -1px;
        left: -1px;
        z-index: 9;

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
