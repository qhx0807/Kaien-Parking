<template>
    <div style="height:100%;">
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <drawer
            width="220px;"
            :show.sync="drawerVisibility"
            :show-mode="showModeValue"
            :placement="showPlacementValue"
            :drawer-style="{'background-color':'#fff', width: '220px'}">

            <!-- drawer content -->
            <div slot="drawer">
                <div class="avatar">
                    <blur :blur-amount='10' :height='150'  :url="avatarUrl">
                        <p class="center"><img :src="avatarUrl"></p>
                    </blur>
                </div>
                <group title="菜单" style="margin-top:20px;">
                    <!-- <cell title="首页" link="/" @click.native="goMenu"></cell> -->
                    <cell title="缴费" link="/main" @click.native="goMenu">
                        <div class="badge-value" slot="title">
                            <span class="vertical-middle">缴费</span>
                            <!-- <badge text="1"></badge> -->
                        </div>
                    </cell>
                    <cell title="绑定车辆" link="/carlist" @click.native="goMenu">
                        <img slot="default" src="../assets/car.png" class="cell-icon">
                    </cell>
                </group>
                <group title="卡券" style="margin-top:20px;">
                    <cell title="获得优惠券" link="/getticket" value="" @click.native="goMenu"></cell>
                    <!-- <cell title="我的卡券" link="/myticket" @click.native="goMenu">
                        <div class="badge-value" slot="title">
                            <span class="vertical-middle">我的卡券</span>
                            <badge text="2"></badge>
                        </div>
                    </cell> -->
                </group>
                
            </div>

      <!-- main content -->
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="0px">
      <!-- :title="title" -->
        <x-header slot="header"
            :style="styleObj"
            :left-options="leftOptions"
            :right-options="rightOptions"
            
            :transition="headerTransition"
            @on-click-back="handerBack">
            <span v-if="$route.path === '/main'" slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
                <x-icon type="navicon" size="35" style="fill:#949494;position:relative;top:-8px;left:-3px;"></x-icon>
            </span>
            <span v-if="$route.path === '/main'" slot="right" @click="addCarInfo">
                <x-icon type="plus" size="24" style="fill:#949494;position:relative;top:-1px;right:-3px;font-weiht:normal"></x-icon>
            </span>
        </x-header>
        
        <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
        <transition
            :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
            <router-view class="router-view"></router-view>
        </transition>
        
      </view-box>
    </drawer>
  </div>
</template>

<script>
import { Radio, Blur, Group, Cell, CellBox, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
    directives: {
        TransferDom
    },
    components: {
        Radio,
        Group,
        Cell,
        CellBox,
        Badge,
        Drawer,
        ButtonTab,
        ButtonTabItem,
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem,
        Loading,
        Actionsheet,
        Blur
    },
    data () {
        return {
            showMenu: false,
            drawerVisibility: false,
            showMode: 'push',
            showModeValue: 'push',
            showPlacement: 'left',
            showPlacementValue: 'left',
            avatarUrl:'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
            styleObj:{
            width:'100%',
            position:'absolute',
            left:0,
            top:0,
            zIndex:999,
            backgroundColor:'#F2F3F6',
            },
        }
    },
    mounted () {
    //    this.getWxOpenid()
    },
    beforeDestroy () {
        this.box && this.box.removeEventListener('scroll', this.handler, false)
    },
    watch: {
      "$route":function(to, from) {
        if(to.name==='bindcar'){
          this.styleObj.backgroundColor="rgba(0,0,0,.5)"
        }else{
          this.styleObj.backgroundColor="#F2F3F6"
        }
      }
    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading,
            direction: state => state.direction,
        }),
        leftOptions () {
            return {
                showBack: this.$route.path !== '/',
                preventGoBack: true,
            }
        },
        rightOptions () {
            return {
                showMore: false
            }
        },
        headerTransition () {
            return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
        },
        title () {
            if (this.$route.path === '/') return '首页'
            if (this.$route.path === '/payment') return '缴费'
            if (this.$route.path === '/bindcar') return '绑定车辆'
            if (this.$route.path === '/getticket' || this.$route.path === '/myticket') return '优惠券'
            return ''
        }
    },
    methods: {
        onShowModeChange (val) {
            /** hide drawer before changing showMode **/
            this.drawerVisibility = false
            setTimeout(one => {
                this.showModeValue = val
            }, 100)
        },
        onPlacementChange (val) {
            /** hide drawer before changing position **/
            this.drawerVisibility = false
            setTimeout(one => {
                this.showPlacementValue = val
            }, 100)
        },
        onClickMore () {
            this.showMenu = true
        },
        addCarInfo (){
            this.$store.commit('UPDATE_DIRECTION', 'forward');
            this.$router.push({name:'carlist'})
        },
        handerBack(){
            this.$store.commit('UPDATE_DIRECTION', 'reverse');
            this.$router.push({name:'main'});
        },
        goMenu(){
            this.$store.commit('UPDATE_DIRECTION', 'forward');
            this.drawerVisibility = false;

        },
        getUrlParams(){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
body {
  background-color: #F2F3F6;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.demo-icon-22 {
  font-family: 'vux-demo';
  font-size: 22px;
  color: #888;
}
.weui-tabbar.vux-demo-tabbar {
  /** backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);**/
}
.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
  color: #F70968;
}
.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.demo-icon-22:before {
  content: attr(icon);
}
.vux-demo-tabbar-component {
  background-color: #F70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0!important;
}
.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
@font-face {
  font-family: 'vux-demo';  /* project id 70323 */
  src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
  src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
}
.demo-icon {
  font-family: 'vux-demo';
  font-size: 20px;
  color: #04BE02;
}
.demo-icon-big {
  font-size: 28px;
}
.demo-icon:before {
  content: attr(icon);
}
.router-view {
  width: 100%;
  top: 46px;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.menu-title {
  color: #888;
}
.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
.badge-value {
  display: inline-block!important;
}
.vertical-middle {
  vertical-align: middle;
}
.cell-icon{
    width: 25px;
    height: 25px;
    vertical-align: middle;
}
</style>