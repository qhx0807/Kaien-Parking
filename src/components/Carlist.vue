<template>
    <div>
        <div class="car-list" v-for="item in carList" :key="item.carcode">
            <h4 v-html="item.carcode"></h4>
            <icon class="fl-r" @click.native="delItem(item.carcode)" type="clear"></icon>
        </div>
        <div class="add">
            <button @click="goBindCar">+ 添加绑定</button>
        </div>
    </div>
</template>

<script>
import {  Icon, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
name: 'carlist',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            carList:[],
        }
    },
    components:{
        Icon,
        XButton
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
            this.$store.commit('UPDATE_DIRECTION', 'forward');
            this.$router.push({ name:'bindcar' });
        },
        getCarList(){
            let openid = localStorage.getItem("openid")
            this.$http.get(API_URL+'?Ctype=GetCarList&Openid='+openid)
                .then(response => {
                    //console.log(response.data)
                    this.carList = response.data.cars;
                    this.isLoading = false;
                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false;
                    //this.$vux.toast.text('网络连接出错！', 'middle')
                })
        },
        delItem(e){
            alert(e)
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
