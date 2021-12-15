var eventBus = new Vue()

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

Vue.component('product', {
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
            v-for="(variant, index) in variants" :key="variant.variantId"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>
        <hr>
        <div class="containerBtn">
            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">
                Add to cart
            </button>
            <button v-on:click="removeFromCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Remove
                From Cart</button>
        </div>
        <hr>
        <product-details :details="details"></product-details>
        </div>

        <product-tabs :reviews="reviews"></product-tabs>

    </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            details: ["80% cotton", "2% polyester", "Gender-neutral"],
            variants: [{
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
            onSale: true,
            reviews:[]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
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
            if (this.variants[this.selectedVariant].variantSale === true) {
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
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-review', {
    template: `
      <form class="review-form" @submit.prevent="onSubmit">

        <p class="error" v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>

        <p>
          <label for="nae">Name:</label>
          <input id="name" v-model="name">
        </p>

        <p>
          <label for="review">Review:</label>
          <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>

        <p>
          <input type="submit" value="Submit">
        </p>

    </form>
    `,
    data() {
      return {
        name: null,
        review: null,
        rating: null,
        errors: []
      }
    },
    methods: {
      onSubmit() {
        this.errors = []
        if(this.name && this.review && this.rating) {
          let productReview = {
            name: this.name,
            review: this.review,
            rating: this.rating
          }
          eventBus.$emit('review-submitted', productReview)
          this.name = null
          this.review = null
          this.rating = null
        } else {
          if(!this.name) this.errors.push("Name required.")
          if(!this.review) this.errors.push("Review required.")
          if(!this.rating) this.errors.push("Rating required.")
        }
      }
    }
  })

  Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
      <div>
        <span class="tab"
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectedTab = tab" >
            {{ tab }}</span>

            <div v-show="selectedTab === 'Reviews' " class="container-review">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul v-else>
                <li v-for="(review, index) in reviews" :key="index">
                    <p>{{ review.name }}</p>
                    <p>Rating:{{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>

        <product-review
            v-show="selectedTab === 'Make a Review'">
        </product-review>
      </div>

    `,
    data() {
      return {
        tabs: ['Reviews', 'Make a Review'],
        selectedTab: 'Reviews'
      }
    }
  })

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                   this.cart.splice(i, 1);
                }
            }
        }
    }
})