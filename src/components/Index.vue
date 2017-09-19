<template>
    <div>
        <p style="text-align:center;padding-top:20px;">
            <inline-loading></inline-loading>
            <span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;加载中</span>
        </p>
    </div>
</template>

<script>
import { InlineLoading  } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
    components: {
        InlineLoading
    },
    data () {
        return {
            msg: 'Hello World!'
        }
    },
    computed: {
       
    },
    mounted(){
        //localStorage.setItem("openid", "ofgtAt-7QRzRwop5Ufm7Y2Iz0A2Y")
        this.getWxOpenid()
    },
    methods:{
        getUrlParams(){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
        getWxOpenid(){
            let openid = localStorage.getItem("openid");
            let code = this.getUrlParams("code");
            if(!openid){
                this.$http(API_URL+"?Ctype=GetOpenid&code="+code)
                    .then(response => {
                        console.log(response)
                        if(response.ok){
                            localStorage.setItem("openid", response.openid);
                            this.$router.replace({name: 'main'})
                        }else{
                            this.$vux.toast.text(response.error, 'default')
                        }
                    })
                    .catch(error => {
                       this.$vux.toast.text('获取用户信息出错', 'default')
                    })
            }else{
                this.$router.replace({name: 'main'})
            }
        }
    }
}


</script>

<style scoped>

</style>
