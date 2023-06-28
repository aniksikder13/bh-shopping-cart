// Products Array
const products= [
    {
        id: "prod_01",
        name: "Modern Camera", 
        price: 50,
        image: "/images/camera.jpg"
    },
    {
        id: "prod_02",
        name: "White Monitor", 
        price: 90,
        image: "/images/white-monitor.jpg"
    },
    {
        id: "prod_03",
        name: "Polarid Camera", 
        price: 70,
        image: "/images/polarid-camera.jpg"
    },
    {
        id: "prod_04",
        name: "Smart Watch", 
        price: 150,
        image: "/images/smart-watch.jpeg"
    }
]

// Select element function
function selectElement(el){
    return document.querySelector(el)
}

//Create element function
function createDomItem(item){
    return document.createElement(item)
}

// Fetching cart data
function getLocalData(){
    let cart
    const getCart= JSON.parse(localStorage.getItem('bohubrihi-assignment-cart-example'))
    getCart === null ? cart=[] : cart= getCart
    return cart
}

// Add to cart function
function addToCart(product){
    const newProduct= {
        ...product,
        qty: 1,
        totalPrice: product.price
    }
    const cart= getLocalData()
    const exist= cart.filter(item => item.id === product.id)
    if(exist.length > 0){
        alert('This Product is already exist in cart')
        return
    }
    cart.push(newProduct)
    localStorage.setItem('bohubrihi-assignment-cart-example', JSON.stringify(cart))
    location.reload() 
}

// Create product DOM element function
function createProductItem(product){
    const card= createDomItem('li')
    const img= createDomItem('img')
    const headline= createDomItem('h1')
    const price= createDomItem('p')
    const button= createDomItem('button')  
    const content= createDomItem('div')

    img.src= product.image
    img.alt= product.name
    headline.innerText= product.name
    price.innerText= `Price: $${product.price}`
    button.innerText= 'Add to Cart'

    button.addEventListener('click', () => addToCart(product))

    content.append(headline, price, button)
    card.append(img, content)
    selectElement('.products-area').append(card)
}

// Clear all carts
(function(){
    const clearAllCart= createDomItem('button')
    clearAllCart.innerText= 'Clear Cart'

    clearAllCart.addEventListener('click', function(){     
        localStorage.setItem('bohubrihi-assignment-cart-example', JSON.stringify([]))
        location.reload() 
    })
    selectElement('.reamove-All').append(clearAllCart)
}())

// Create Cart DOM element function
function createCartItem(cart){
    const card= createDomItem('li')
    const img= createDomItem('img')
    const headline= createDomItem('h1')
    const price= createDomItem('p')
    const removeBtn= createDomItem('button') 
    const decQty= createDomItem('button')  
    const incQty= createDomItem('button')  
    const qtyNum= createDomItem('input') 
    const content= createDomItem('div')
    const qty= createDomItem('div')
    const controler= createDomItem('div')
    

    img.src= cart.image
    img.alt= cart.name
    headline.innerText= cart.name
    price.innerText= `Price: $${cart.totalPrice}`
    removeBtn.innerText= 'Remove'
    removeBtn.classList.add('remove')
    controler.classList.add('controler')
    controler.style.marginTop='5px'
    qtyNum.value= cart.qty
    qtyNum.type='number'
    qtyNum.innerText= cart.qty
    decQty.innerText= '-'
    incQty.innerText= '+'

    // Remove single Cart function
    removeBtn.addEventListener('click', function(){
        const carts= getLocalData()
        const newCarts= carts.filter(item => item.id !== cart.id)
        localStorage.setItem('bohubrihi-assignment-cart-example', JSON.stringify(newCarts))
        location.reload() 
    })

    // Controling qty number
    let quantity= cart.qty
    function quantityContoller(inc){
        inc ? quantity++ : quantity--
        let carts= getLocalData()
        if(quantity < 1){
            const newCarts= carts.filter(item => item.id !== cart.id)
            localStorage.setItem('bohubrihi-assignment-cart-example', JSON.stringify(newCarts))
            location.reload()            
            return
        }
        const targetCart= carts.find(item =>  item.id === cart.id)
        const newCarts= carts.filter(item => item.id !== cart.id)
        const qtyAdding= {
          ...targetCart,
          totalPrice: cart.price*quantity,
          qty: quantity
        }

        newCarts.push(qtyAdding)
        
        localStorage.setItem('bohubrihi-assignment-cart-example', JSON.stringify(newCarts))
        location.reload() 
    }

    incQty.addEventListener('click', ()=> quantityContoller(true))
    decQty.addEventListener('click', ()=> quantityContoller())

    qty.append(decQty, qtyNum, incQty)
    controler.append(qty, removeBtn)
    content.append(headline, price, controler)
    card.append(img, content)
    selectElement('.cart-area').append(card)
}

//Total prices & discount
(function(){
    const container= createDomItem('div')
    const totalPrice= createDomItem('h4')
    const discount= createDomItem('input')
    const discountHint= createDomItem('p')
    const discountBtn= createDomItem('button')
    const form= createDomItem('form')

    const cart= getLocalData()
    let total=0
    cart.map((item) => total+=item.totalPrice)

    container.classList.add('totalCart')
    discount.placeholder= 'Type your discount coupon'
    discount.type='text'
    discountHint.innerText= 'Want 10% discount? Type "DIS10"'
    totalPrice.innerText= `Total Price: $${total}`
    discountBtn.innerText= 'Apply Coupon'

    form.addEventListener('submit', function(e){
        e.preventDefault()
        if(e.target[0].value === 'DIS10'){
            temp= total - (0.1*total)
            totalPrice.innerText= `Total Price: $${Math.ceil(temp)}`
        } else {
            alert('This coupon is not valid')
        }
    })

    form.append(discount, discountHint, discountBtn)
    container.append(totalPrice, form)
    cart.length > 0 && selectElement('.cart').appendChild(container)
}())

// On load Products DOM 
document.addEventListener('DOMContentLoaded', function(){
    const noCart= createDomItem('h3')
    noCart.style.color= 'red'
    noCart.style.marginTop= '10px'
    const cart= getLocalData()
    cart.length > 0 ? cart.map(cart => createCartItem(cart)) : noCart.innerText='There is no item yet'
    products.map(product => createProductItem(product))
    selectElement('.reamove-All').appendChild(noCart)
})