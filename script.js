var products = [
  //  {id: 1, nome: 'Angular', descrição: 'Framework', preço: 100},
  //  {id: 2, nome: 'Vue', descrição: 'Framework', preço: 100},
  //  {id: 3, nome: 'React', descrição: 'Framework', preço: 100}
]

function findProduct(productId) {
  console.log('TESTE DE EDITAR OU DELETAR 1')
  return products[findProductKey(productId)]
}

function findProductKey(productId) {
  console.log('TESTE DE SALVAR OU CANCELAR E VOLTAR AO HOME PAGE')
  for (var key = 0; key < products.length; key++) {
    if (products[key].id == productId) {
      return key
    }
  }
}

var List = Vue.extend({
  template: '#product-list',
  data: function () {
    console.log('TESTE DE RETORNAR AO HOME PAGE')
    return { products: products, searchKey: '' }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        return product.name.indexOf(this.searchKey) > -1
      })
    }
  }
})

var Product = Vue.extend({
  template: '#product',
  data: function () {
    console.log('TESTE')
    return { product: findProduct(this.$route.params.product_id) }
  }
})

var ProductEdit = Vue.extend({
  template: '#product-edit',
  data: function () {
    console.log('TESTE DE EDITAR PRODUTO')
    return { product: findProduct(this.$route.params.product_id) }
  },
  methods: {
    updateProduct: function () {
      console.log('TESTE DE SALVAR EDIÇÃO')
      let product = this.product
      products[findProductKey(product.id)] = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price
      }
      router.push('/')
    }
  }
})

var ProductDelete = Vue.extend({
  template: '#product-delete',
  data: function () {
    console.log('TESTE DELETAR')
    return { product: findProduct(this.$route.params.product_id) }
  },
  methods: {
    deleteProduct: function () {
      console.log('TESTE CONFIRMAR DELETAR')
      products.splice(findProductKey(this.$route.params.product_id), 1)
      router.push('/')
    }
  }
})

var AddProduct = Vue.extend({
  template: '#add-product',
  data: function () {
    console.log('TESTE DE ADD PRODUTO')
    return { product: { name: '', description: '', price: '' } }
  },
  methods: {
    createProduct: function () {
      console.log('TESTE DE CRIAR PRODUTO')
      let product = this.product
      products.push({
        id: Math.random().toString().split('.')[1],
        name: product.name,
        description: product.description,
        price: product.price
      })
      router.push('/')
    }
  }
})

var router = new VueRouter({
  routes: [
    { path: '/', component: List },
    { path: '/product/:product_id', component: Product, name: 'product' },
    { path: '/add-product', component: AddProduct },
    {
      path: '/product/:product_id/edit',
      component: ProductEdit,
      name: 'product-edit'
    },
    {
      path: '/product/:product_id/delete',
      component: ProductDelete,
      name: 'product-delete'
    }
  ]
})

var App = {}

new Vue({
  router
}).$mount('#app')
