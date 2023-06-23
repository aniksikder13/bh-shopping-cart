const cart= document.querySelector('.cart-area')
const addToCart= document.querySelectorAll('.addToCart')

function createDomItem(itemName){
    return document.createElement(itemName)
}

// cart area
function cartArea(product){
    const card= createDomItem('li')
    const img= createDomItem('img')
    const headline= createDomItem('h1')
    const price= createDomItem('p')
    const button= createDomItem('button')  
    const content= createDomItem('div')

    img.src= product.children[0].children[0].currentSrc
    headline.innerText= product.children[1].children[0].innerText
    price.innerText= product.children[1].children[1].innerText
    button.innerText= 'Remove'

    button.addEventListener('click', function(){
        this.closest('li').remove()
    })

    content.append(headline, price, button)
    card.append(img, content)
    cart.append(card)
}

// add to cart
addToCart.forEach(item => {
    item.addEventListener('click', function(){
       cartArea(this.closest('li'))   
    })
})