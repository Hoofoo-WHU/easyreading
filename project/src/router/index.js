import Vue from 'vue'
import Router from 'vue-router'
import modules from '@/modules'

Vue.use(Router)

function getRoutes (el) {
  var component = el.module || el
  if (!component.name) {
    console.error(component.__file + '缺少name', component)
    return
  }
  var name = component.name
  var path = '/' + name
  var children = []
  if (el.children) {
    for (var i = 0; i < el.children.length; i++) {
      children.push(getRoutes(el.children[i]))
    }
  }
  return {
    path,
    name,
    children,
    component
  }
}

var routes = [
  {
    path: '/',
    redirect: { name: 'main' }
  }
]

for (var m in modules) {
  routes.push(getRoutes(modules[m]))
}

export default new Router({
  routes
})
