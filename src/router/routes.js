
const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/projeto',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/projeto/ProjetoList.vue') },
      { path: 'add', component: () => import('pages/projeto/ProjetoForm.vue') },
      { path: ':projeto_id/edit', component: () => import('pages/projeto/ProjetoForm.vue') },
      { path: ':projeto_id/view', component: () => import('pages/projeto/ProjetoView.vue') },
      { path: ':projeto_id/view/recursos/add', component: () => import('pages/recurso/RecursoForm.vue') },
      { path: ':projeto_id/view/recursos/:recurso_id/edit', component: () => import('pages/recurso/RecursoForm.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/timeline',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TimeLine.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/criar-conta',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CriarConta.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
