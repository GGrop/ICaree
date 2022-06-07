
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
mostrador();

if(carrito==0){
    let noProducto = document.createElement('h5')
    noProducto.innerText="No hay productos en el carrito!"
    listaCarrito.appendChild(noProducto)
}
else{
    // tengo q poder resetear el carrito
}



function mostrador(){

    let dolarBlue;
    const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
    $.get(URLGET, function (resultado, estado){
        if(estado == "success"){
            let divisas = resultado;
            dolarBlue = parseFloat(divisas[1].casa.venta);

            rowProductos.innerHTML=""                                           //BlANQUEO
            productos.forEach(e =>{

                let divProducto = document.createElement('div')                 // CARD
                    divProducto.className = "card shadow"
                    divProducto.style = "width:18rem;"

                    let imgProducto = document.createElement('img')             //IMG DEL PRODUCTO
                        imgProducto.src =e.img
                        imgProducto.className ="card-img-top"
                    divProducto.appendChild(imgProducto)

                    let cardBody = document.createElement('div')                //BODY DE LA CARD
                        cardBody.className = "card-body"
                    divProducto.appendChild(cardBody)

                    let cardTitle = document.createElement('h5')                //NAME 
                        cardTitle.className = "card-title"                  
                        cardTitle.innerText = e.name                        
                    cardBody.appendChild(cardTitle)

                        let precioProducto = document.createElement('p')       //LI
                            precioProducto.className = "card-text"
                            precioProducto.innerText = `Precio: US$${e.precio}/ ARS ${e.precio*dolarBlue}`    //PRECIO
                        cardBody.appendChild(precioProducto)
                        let pagoProducto = document.createElement('p')         //LI
                            pagoProducto.className = ""
                            pagoProducto.innerText = e.pago                     //PAGO
                        cardBody.appendChild(pagoProducto)

                    let divButton = document.createElement('div')               //DIV DEL BUTTON
                        divButton.className = "card-body"
                        let buttonProducto = document.createElement('button')   //BUTTON
                            buttonProducto.className = "btn btn-outline-danger"
                            buttonProducto.innerText = "Agregar al carrito"
                            buttonProducto.addEventListener("click", ()=>{
                                encontrarProducto(e.name)
                                MuestreoCarrito(carrito)
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Producto Agregado',
                                    showConfirmButton: false,
                                    timer: 0800
                                })
                            })
                        divButton.appendChild(buttonProducto)

                    divProducto.appendChild(divButton)

                rowProductos.appendChild(divProducto)
            })
        }
    })
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
                localStorage.setItem('carrito', JSON.stringify (carrito))
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

//PUSHBAR
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

