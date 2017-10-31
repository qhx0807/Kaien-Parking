<template>
    <div>
        <div class="car-list" v-for="item in carList" :key="item.CarCode">
            <h4 v-html="parse(item).CarCode"></h4>
            （<span class="car-type" v-html="parse(item).parkingtype"></span>）
            <icon class="fl-r" @click.native="delItem(parse(item).CarCode)" type="clear"></icon>
        </div>
        <div class="add">
            <button @click="goBindCar">+ 添加绑定</button>
        </div>

        <div v-transfer-dom>
            <confirm
                v-model="confirmShow"
                :close-on-confirm="false"
                title="提示"
                @on-confirm="onConfirm">
                <p style="text-align:center;"><b>{{carnum}}</b>&nbsp;是否移除此车牌号？</p>
            </confirm>
        </div>
    </div>
</template>

<script>
import {  Icon, XButton, Confirm, TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
name: 'carlist',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            carList:[],
            confirmShow:false,
            carnum:'',
        }
    },
    directives: {
        TransferDom
    },
    components:{
        Icon,
        XButton,
        Confirm
    },
    computed: {
       
    },
    mounted(){
        this.getCarList();
    },
    methods:{
        test(){
            this.$store.commit('UPDATE_LOADING', true);
        },
        goBindCar(){
             if(this.carList.length>=5){
                this.$vux.toast.show({
                    type: 'warn',
                    text: '绑定车牌数量不能超过5个'
                })
                return false
            }
            this.$store.commit('UPDATE_DIRECTION', 'forward');
            this.$router.push({ name:'bindcar' });
        },
        getCarList(){
            let openid = localStorage.getItem("openid")
            this.$http.get(API_URL+'?Ctype=GetCarList&Openid='+openid)
                .then(response => {
                    //console.log(response)
                    this.carList = JSON.parse(response.data.cars);
                   // console.log(this.carList)
                    this.isLoading = false;
                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false;
                    //this.$vux.toast.text('网络连接出错！', 'middle')
                })
        },
        delItem(e){
            this.confirmShow = true;
            this.carnum = e;
            
        },
        onConfirm () {
            this.$vux.loading.show({
                transition: '',
                text: '加载中...'
            })
            let openid = localStorage.getItem("openid");
            this.$http.get(API_URL+'?Ctype=DelCarNum&Openid='+openid+'&carcode='+this.carnum)
                .then(response => {
                    console.log(response.data)
                    this.$vux.loading.hide()
                    this.confirmShow = false;
                    if(response.data.error){
                        this.$vux.toast.text(response.data.error, 'middle');
                        return false;
                    }else{
                        this.getCarList();
                        this.$vux.toast.text('移除成功！', 'middle')
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.$vux.loading.hide()
                    this.confirmShow = false
                    this.$vux.toast.text('网络连接出错！', 'middle')
                })
        },
        parse(str){
            return JSON.parse(str)
        }
    }
}
</script>
<style lang="less" scoped>
.car-list{
    height: 52px;
    width: 100%;
    background-color: #fff;
    line-height: 52px;
    position: relative;
    top: 0;
    margin-bottom: 10px;
    h4{
        padding-left: 20px;
        font-size: 17px;
        font-weight: normal;
        display: inline;
    }
    .car-type{
        font-size: 14px;
    }
    .fl-r{
        position: absolute;
        top: 20px;
        right: 14px;
    }
}
.add{
    padding: 0 8px;
    padding-top: 30px;
    padding-bottom: 30px;
    button{
        width: 100%;
        height: 42px;
        border: none;
        outline: none;
        background-color: deepskyblue;
        color: white;
        font-size: 14px;
    }
}
</style>
