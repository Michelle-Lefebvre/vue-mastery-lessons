Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }

    },
    template: `
    <div>
          <p><u>Materials:</u></p>
          <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>`
})

Vue.component('product',  {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
    <div class="product-image">
      <img :src="image" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>

      <a :href="link" target="_blank">More products like this</a>
      <br>
      <p v-if="inStock >10">In Stock</p>
      <p v-else-if="inStock <=10 && inStock > 0">Almost Sold Out! Just <strong>{{ inStock }}</strong> left.</p>
      <p v-else class="stock-out">Out of Stock</p>
      <p>User is premium: {{ premium }}</p>
      <p>Shipping: {{ shipping }}</p>

      <span v-if="sale" class="color-sale">{{ sale }}</span>

      <div class="color-box"
         v-for="(variant, index) in variants"
         :key="variant.variantId"
         :style="{ backgroundColor: variant.variantColor }"
         @mouseover="updateProduct(index)"
         >
    </div>

      <small>Sizes available:</small>
      <span v-for="size in sizes">
          {{ size }} </span>
        <hr>

        <div class="containerBtn">

            <button v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >Add to Cart</button>

            <button
            v-on:click="removeFromCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >Remove From Cart</button>

            <div class="cart">
                <p><small>Cart:</small> {{cart}}</p>
            </div>
        </div>
        <hr>
        <product-details :details="details"></product-details>

    </div>
  </div>
    `,
    data() {


    return {
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
    }
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return "$2.99"
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})