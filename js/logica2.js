


const rowProductos = document.getElementById("rowProductos")
const listaCarrito = document.getElementById("listaCarrito")
let carrito = JSON.parse(localStorage.getItem('carrito')) || []

if(carrito != []){	
    for(const producto of carrito){
    MuestreoCarrito(producto);
    }
}

class producto{

    contructor(id, color, precio, stock, img){
        this.id = id;
        this.color = color;
        this.precio = precio;
        this.stock = stock;
        this.img = img;
    }
}

if(carrito==0){
    let noProducto = document.createElement('h5')
    noProducto.innerText="No hay productos en el carrito!"
    listaCarrito.appendChild(noProducto)
}

function encontrarProducto (producto){
    let productoValidado = productos.find(e => e.name == producto)
    let ProductoExistente = carrito.find(e => e.name == producto)
    if(ProductoExistente)
    {
        carrito = carrito.map(e => {
            if(e.name == producto)
            {
                e.cantidadCompra +=1
            }
            return e
        })
    }
    else
    {
        productoValidado.cantidadCompra = 1
        carrito.push(productoValidado)
        localStorage.setItem('carrito', JSON.stringify (carrito))
        return productoValidado
    }
}

function MuestreoCarrito (){
    let dolarBlue;
    const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
    $.get(URLGET, function (resultado, estado){
        if(estado == "success"){
            let divisas = resultado;
            dolarBlue = parseFloat(divisas[1].casa.venta);

            listaCarrito.innerHTML= ""
            let subTotalSuma=0;
            carrito.forEach(compra =>{
            let productoAgregado = document.createElement('li')
                let divProducto = document.createElement('div')
                    divProducto.className ="card flexCarrito"
                    let divImg = document.createElement('div')
                        divImg.className="flexCentrado"
                        let img = document.createElement('img')
                            img.src = compra.img
                            img.className ="icon22"
                        divImg.appendChild(img)
                    divProducto.appendChild(divImg)

                    let divTexto = document.createElement('div')
                        divTexto.className ="card-body"
                        let nombreProducto = document.createElement('h4')
                            nombreProducto.innerHTML = compra.name  
                        divTexto.appendChild(nombreProducto)

                        let precioProducto = document.createElement('p')
                            precioProducto.innerHTML = `Precio: US$${compra.precio}/ ARS ${compra.precio*dolarBlue}`
                        divTexto.appendChild(precioProducto)

                        let cantidadProducto = document.createElement('p')
                        cantidadProducto.innerHTML = `Cantidad: ${compra.cantidadCompra}`
                        divTexto.appendChild(cantidadProducto)

                    divProducto.appendChild(divTexto)

                productoAgregado.appendChild(divProducto)

            listaCarrito.appendChild(productoAgregado)

            subTotalSuma = subTotalSuma + compra.precio * compra.cantidadCompra
            })
            let subTotalUsd = document.createElement('p')
            subTotalUsd.className ="card mytext"
            subTotalUsd.innerText ="SubTotal US$: $" + subTotalSuma

            listaCarrito.appendChild(subTotalUsd)

            let subTotalArs = document.createElement('p')
            subTotalArs.className ="card mytext"
            subTotalArs.innerText ="SubTotal ARS: $" + subTotalSuma*dolarBlue

            listaCarrito.appendChild(subTotalArs)


            let resetButton = document.createElement('button')
                resetButton.className = "btn btn-danger"
                resetButton.innerText = "Vaciar Carrito"
            let comprarButton = document.createElement('button')
                comprarButton.className = "btn btn-danger"
                comprarButton.innerText = "Comprar"
                resetButton.addEventListener("click", ()=>{
                    carrito=[];
                    localStorage.setItem('carrito', JSON.stringify (carrito))
                    listaCarrito.innerHTML= ""
                    let noProducto = document.createElement('h5')
                        noProducto.innerText="No hay productos en el carrito!"
                    listaCarrito.appendChild(noProducto)
                })
            listaCarrito.appendChild(resetButton)
            listaCarrito.appendChild(comprarButton)
        }
    })
}


