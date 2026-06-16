import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../WoodWoodLanding.vue'
import MenuPage from '../pages/MenuPage.vue'
import HostelPage from '../pages/HostelPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import GalleryPage from '../pages/GalleryPage.vue'
import ContactPage from '../pages/ContactPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/menu', name: 'menu', component: MenuPage },
  { path: '/hostel', name: 'hostel', component: HostelPage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/gallery', name: 'gallery', component: GalleryPage },
  { path: '/contact', name: 'contact', component: ContactPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
