import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _b17a70e2 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages\\index" */).then(m => m.default || m)
const _f0ea266c = () => import('..\\pages\\about.vue' /* webpackChunkName: "pages\\about" */).then(m => m.default || m)
const _2d06b456 = () => import('..\\pages\\album\\index.vue' /* webpackChunkName: "pages\\album\\index" */).then(m => m.default || m)
const _2b50130e = () => import('..\\pages\\album\\_slug.vue' /* webpackChunkName: "pages\\album\\_slug" */).then(m => m.default || m)



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _b17a70e2,
			name: "index"
		},
		{
			path: "/about",
			component: _f0ea266c,
			name: "about"
		},
		{
			path: "/album",
			component: _2d06b456,
			name: "album"
		},
		{
			path: "/album/:slug",
			component: _2b50130e,
			name: "album-slug"
		}
    ],
    fallback: false
  })
}
