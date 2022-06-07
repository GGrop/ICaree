function obtenerCotizacionDolar(){
    let dolarBlue;
    const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
    $.get(URLGET, function (resultado, estado){
    if(estado == "success"){
        let divisas = resultado;
        dolarBlue = parseFloat(divisas[1].casa.venta);
        }
    })
}
