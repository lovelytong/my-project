import Vue from 'vue'
import Router from 'vue-router'
import organization from '@/components/organization'
import character from '@/components/character'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/organization'
    },
    {
      path: '/organization',
      name: 'organization',
      component: organization
    }, {
      path: '/character',
      name: 'character',
      component: character
    },
  ]
})
