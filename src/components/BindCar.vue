<template>
    <div style="height:100%;width: 100%;background-color: rgba(0,0,0,.5);">
        <div class="carnum">
            <flexbox :gutter="4">
                <flexbox-item>
                    <div @click="clickInput(1)" :class="{currentInput:curindex==1}" class="flex-demo-num">{{ carnumData[0].val }}</div>
                </flexbox-item>
                <flexbox-item>
                    <div @click="clickInput(2)" :class="{currentInput:curindex==2}" class="flex-demo-num">{{carnumData[1].val}}</div>
                </flexbox-item>
                <flexbox-item>
                    <div @click="clickInput(3)" :class="{currentInput:curindex==3}" class="flex-demo-num">{{carnumData[2].val}}</div>
                </flexbox-item>
                <flexbox-item>
                    <div @click="clickInput(4)" :class="{currentInput:curindex==4}" class="flex-demo-num">{{carnumData[3].val}}</div>
                </flexbox-item>
                <flexbox-item>
                    <div @click="clickInput(5)" :class="{currentInput:curindex==5}" class="flex-demo-num">{{carnumData[4].val}}</div>
                </flexbox-item>
                <flexbox-item>
                    <div @click="clickInput(6)" :class="{currentInput:curindex==6}" class="flex-demo-num">{{carnumData[5].val}}</div>
                </flexbox-item>
                <flexbox-item>
                    <div @click="clickInput(7)" :class="{currentInput:curindex==7}" class="flex-demo-num">{{carnumData[6].val}}</div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="keyboard">
            <div style=" padding: 0px 3px">
                <flexbox  :gutter="3" justify="center">
                    <flexbox-item v-for="item in lineOneData" :span="1.1" :key="item"><div @click="clickKey(item)"
                     :class="{keyClicked:clickedKey==item}" class="flex-demo">{{item}}</div></flexbox-item>
                </flexbox>
                <flexbox style="margin-top: 10px;" justify="center" :gutter="3">
                    <flexbox-item :span="1.1" v-for="item in lineTwoData" :key="item"><div @click="clickKey(item)"
                    :class="{keyClicked:clickedKey==item}" class="flex-demo">{{item}}</div></flexbox-item>
                </flexbox>
                <flexbox style="margin-top: 10px;" :gutter="3" justify="center">
                    <flexbox-item :span="1.1" v-for="item in lineThreeData" :key="item"><div @click="clickKey(item)" 
                    :class="{keyClicked:clickedKey==item}" class="flex-demo">{{item}}</div></flexbox-item>
                </flexbox>
                <flexbox style="margin-top: 10px;" :gutter="3" justify="center">
                    <flexbox-item :span="1.65">
                        <div class="flex-demo" style="font-weight: normal" @click="clearKey">
                            <x-icon type="ios-close-empty" size="27"></x-icon>
                        </div>

                    </flexbox-item>
                    <flexbox-item :span="1.1" v-for="item in lineFourData" :key="item"><div @click="clickKey(item)" 
                    class="flex-demo" :class="{blankKey:item=='',keyClicked:clickedKey==item}">{{item}}</div></flexbox-item>
                    <flexbox-item :span="1.65">
                        <div class="flex-demo" style="font-weight: normal" @click="deleteKey">
                            <x-icon type="ios-arrow-thin-left" size="30"></x-icon>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
            <x-button :show-loading="isLoading" @click.native="confirmNum" class="addcar" :type="btnType" :disabled="isdisabled">确认</x-button>
        </div>
    </div>
</template>

<script>
import { Group, Cell, Tabbar, TabbarItem, Icon, Swiper, SwiperItem, Divider, Flexbox, FlexboxItem,XButton } from 'vux'
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
        Flexbox,
        FlexboxItem,
        XButton,
         
    },
    data () {
        return {
            isdisabled:true,
            isLoading:false,
            curindex:1,
            btnType:'default',
            lineOneData:['渝','京','沪','津','冀','晋','蒙','辽','吉','黑'],
            lineTwoData:['苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤'],
            lineThreeData:['桂','琼','川','贵','云','藏','陕','甘','青'],
            lineFourData:['宁','新','港','澳','台','',''],
            carnumData:[
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
            ],
            clickedKey:'-1',
        }
    },
    watch:{
        "curindex":function (n, o) {
            if(n==1){
                this.lineOneData = ['渝','京','沪','津','冀','晋','蒙','辽','吉','黑'];
                this.lineTwoData = ['苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤'];
                this.lineThreeData = ['桂','琼','川','贵','云','藏','陕','甘','青'];
                this.lineFourData = ['宁','新','港','澳','台','',''];
            }else{
                this.lineOneData = ['1','2','3','4','5','6','7','8','9','0'];
                this.lineTwoData = ['Q','W','E','R','T','Y','U','I','O','P'];
                this.lineThreeData = ['A','S','D','F','G','H','J','K','L'];
                this.lineFourData = ['Z','X','C','V','B','N','M'];
            }
        },
        "carnumData":{
            handler: function (val, oldVal) {
                var g = val.some(function (item) {
                    return item.val == '';
                })
                if(!g){
                    this.isdisabled = false;
                    this.btnType = 'primary';
                }else{
                    this.isdisabled = true;
                    this.btnType = 'default';
                }
            },
            deep: true
        },
        
    },
    computed: {
       
    },
    mounted(){

    },
    methods:{
        
        clickInput(e){
            this.curindex=e;
        },
        clickKey(key){
            if(key=='' || key==null){
                return false;
            }
            this.clickedKey = key;
            if(this.curindex<7){
                this.carnumData[this.curindex-1].val = key;
                this.curindex++;
            }else{
                this.carnumData[this.curindex-1].val = key;
            }
        },
        deleteKey(){
            this.carnumData[this.curindex-1].val='';
        },
        clearKey(){
            this.carnumData=[
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
                { 'val':'' },
            ];
            this.curindex=1;
        },
        confirmNum(){
            this.$store.commit('UPDATE_LOADING', true);
            this.isLoading = true;
            let openid = localStorage.getItem("openid");
            let carnum = '';
            this.carnumData.forEach(function (item) {
                carnum+=item.val;
            })
            this.$http(API_URL+'?Ctype=AddCar&Openid='+openid+'&Carcode='+carnum)
                .then(response => {
                    console.log(response)
                    this.$store.commit('UPDATE_LOADING', false);
                    if(response.data.ok){
                        this.$vux.toast.show({
                         text: '绑定成功!'
                        })
                        this.$router.push({name:'carlist'})
                    }else{
                        this.$vux.toast.text(response.error, 'middle')
                    }
                })
                .catch(error => {
                    //console.log(error)
                    this.$store.commit('UPDATE_LOADING', false);
                    this.$vux.toast.text('网络连接出错！', 'middle')
                })
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
.keyboard{
    padding: 10px 0px 0 0px;
    height: 40vh;
    background-color: #F0F0F0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
.vux-flexbox-item{
    font-weight: 600;
}
.flex-demo {
  text-align: center;
  font-size: 13px;
  background-color: #fff;
  border-radius: 4px;
  background-clip: padding-box;
  border: 1px solid #ddd;
  height: 28px;
  line-height: 28px;
}
.carnum{
    padding: 0 12px;
    
    padding-top: 30vh;
}
.flex-demo-num{
    text-align: center;
    background-color: #fff;
    border-radius: 4px;
    background-clip: padding-box;
    height: 37px;
    line-height: 37px;
}
.addcar{
    border-radius: 0!important;
    margin-top: 18px;
}
.blankKey{
    background-color: #F0F0F0;
}
.currentInput{
    border: 2px solid skyblue;
    color: skyblue;
}
.keyClicked{
    background-color: skyblue;
    color: #fff;
}
.weui-btn_primary{
    background-color: deepskyblue;
}
.weui-btn_loading.weui-btn_primary{
    background-color: deepskyblue;
}
</style>
