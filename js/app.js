console.log('conectado')
let carrito = {}
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', e => {
    cargaDatosBD()
})
cards.addEventListener('click', e => {
    //console.log('e:', e)
    addCarrito(e)
})

const addCarrito = e => {
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = item => {
    const producto = {
        id: item.querySelector('button').dataset.id,
        title: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[prodcuto.id].cantidad + 1
    }
    carrito[producto.id] = { ...produto }
    console.log('producto', producto)
}

const cargaDatosBD = async () => {
    const res = await fetch('../db/api.json')
    const data = await res.json()
    pintarCards(data)
    //console.log('respuesta', data)
}

const pintaCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}

const pintarCards = (data) => {
    data.forEach(item => {
        console.log(item)
        templateCard.querySelector('h5').textContent = item.title
        templateCard.querySelector('p').textContent = item.precio
        templateCard.querySelector('button').dataset.id = item.id
        templateCard.querySelector('img').setAttribute("src", item.imageUrl)
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

