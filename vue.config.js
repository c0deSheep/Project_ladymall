//手动生成文件，配置别名，引用时可以代替前缀
module.exports = {
    configureWebpack : {
        resolve:{
          alias:{
            //脚手架3中已自动配置@为src，所以src中的内容直接@/xxx即可
            'assets':'@/assets',
            'common':'@/common',
            'components':'@/components',
            'network':'@/network',
            'views':'@/views',
          }
        }
    }
}


//不需要配置router和store快捷别名，因为全局可以通过this.$router/this.$store来调用