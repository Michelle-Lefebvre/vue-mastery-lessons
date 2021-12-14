var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        details: ["80% cotton", "2% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                variantQuantity: 100,
                variantSale: true
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                variantQuantity: 6,
                variantSale: false
            }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        cart: 0,
        onSale: true
    },
    methods: {
        addToCart: function() {
            this.cart += 1
        },
        updateProduct: function(index) {
            this.selectedVariant = index
        },
        removeFromCart() {
            this.cart--
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {

            return this.variants[this.selectedVariant].variantQuantity

        },
        sale() {
            if(this.variants[this.selectedVariant].variantSale === true) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
            return this.brand + ' ' + this.product + ' are not on sale!'
        }
    }
})