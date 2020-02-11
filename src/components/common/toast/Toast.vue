<template>
  <div class="toast" v-show="isShow">
    <div class="box">{{toastContent}}</div>
    <div class="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Toats",
    // props:{
    //   toastContent:{
    //     type:String,
    //     default:''
    //   },
    //   show: {
    //     type: Boolean,
    //     default: false,
    //   }
    // },
    data () {
      return {
        toastContent:'',
        isShow:false
      }
    },
    methods:{
      show (content,duration = 1000) {
        this.isShow = true;
        this.toastContent = content;

        setTimeout(()=>{
          this.isShow = false;
          this.toastContent = '';
        },duration)
      }
    }
  }
</script>

<style scoped>
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.1);
    position:fixed;
    left: 0;
    top: 0;
    z-index: 99999;
    overflow: hidden;
  }

  .box {
    background-color: rgba(0,0,0,.7);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 100000;
    color:rgba(255,255,255,.9);
    border-radius: 10px;
    /*当高度为百分数时，文字居中的方法*/
    display:flex;
    align-items:center;
    justify-content:center;

    padding: 5px 5px;
    letter-spacing:1px
  }
</style>