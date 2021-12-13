var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inventory:10,
        onSale: true,
        details: ["80% cotton", "2% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg'
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg'

            }
        ],
        sizes: ["xs", "s", "m", "l", "xl", "xxl"],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart++
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
        removeFromCart() {
            this.cart--
        }
    },
})