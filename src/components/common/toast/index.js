import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
    // 1.创建组件构造器
    const toastConstructor = Vue.extend(Toast)

    // 2.new的方式，根据构造器创建一个组件对象
    const toast = new toastConstructor()

    // 3.将组件对象，手动挂载到某一个Dom元素上，不可以之直接用$el，因为是vue的方法，而此时未渲染到这个toast的html
    toast.$mount(document.createElement('div'))

    // 4.toast.$el对应的就是上面挂载的div
    document.body.appendChild(toast.$el)

    // 5.创建Vue原型对象的方法
    Vue.prototype.$toast = toast
}

export default obj