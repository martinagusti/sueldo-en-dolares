const input = document.querySelector("input")
const button = document.querySelector("button")
const label = document.querySelector("label")
const parrafo = document.getElementById("parrafo")
const lblCalculo = document.getElementById("lblCalculo")



let dolarArray = []
let id;
let variacion;
let porcentaje;
let porcentaje2;



const objDolar = {
    id:"",
    fecha:"",
    sueldo:"",
    dolar:""
}






if(JSON.parse(localStorage.getItem("dolarArray"))){
    console.log("Existe")
    dolarArray = JSON.parse(localStorage.getItem("dolarArray"))
    
}else{
    localStorage.setItem("dolarArray", JSON.stringify(dolarArray))
    
}

if(dolarArray.length > 0){
    id = dolarArray[dolarArray.length -1].id + 1
}else{
    id = 1
}



mostrar()

function traerDolar(){
    fetch(`https://api.bluelytics.com.ar/v2/latest`)
    .then(res => res.json())
    .then((data) => {
        calculo(data);
        

    });
    
}






function calculo(data){

    let date = new Date()

    objDolar.id = id;
    objDolar.fecha = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    objDolar.sueldo = Number((input.value / data.blue.value_sell).toFixed(2))
    objDolar.dolar = data.blue.value_sell
    


    dolarArray.push({...objDolar})
    
    localStorage.setItem("dolarArray", JSON.stringify(dolarArray))

    lblCalculo.textContent = "U$S " + Number((input.value / data.blue.value_sell).toFixed(2))
   
    
    /*
    label.innerText = (`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ---` + " U$S " + (input.value / data.blue.value_sell).toFixed(2) + ` con un dolar a $${data.blue.value_sell}`)*/

    input.value = ""

    variacion = dolarArray[dolarArray.length -1].sueldo - dolarArray[0].sueldo
    
    porcentaje = (((dolarArray[dolarArray.length -1].sueldo) * 100) / dolarArray[0].sueldo) - 100;
    porcentaje2 = (((dolarArray[dolarArray.length -1].sueldo) * 100) / dolarArray[dolarArray.length -1].sueldo) - 100;
    
    
    mostrar();

    id = id + 1;


    if(variacion > 0){
        parrafo.textContent = "Incremento del sueldo de U$S " + Math.abs((variacion.toFixed(2))) +  "   (+" + porcentaje.toFixed(0) + "%)"
    }else if(variacion == 0){
        if(dolarArray.length > 1 ){
            parrafo.textContent = "No hubo variaciones en el sueldo"
        }else{

        }
       
    }else{
        parrafo.textContent = "Disminucion del sueldo de U$s " + Math.abs((variacion.toFixed(2))) + "   (" + porcentaje.toFixed(0) + "%)"
    }

    
    
    

   
}

function mostrar(){

    limpiarHtml()

    const divElementos = document.querySelector(".div-elementos");

    dolarArray.forEach(elemento => {
        
        const {id, fecha, sueldo, dolar} = elemento;

        const parrafo = document.createElement("p")
        parrafo.textContent = `${fecha} - $${sueldo} - Dolar= ${dolar}`;
        parrafo.dataset.id = id;

        const hr = document.createElement("hr");

        divElementos.appendChild(parrafo)
        divElementos.appendChild(hr)
    })

}

function limpiarHtml(){
    const divElementos = document.querySelector(".div-elementos")
    while(divElementos.firstChild){
        divElementos.removeChild(divElementos.firstChild)
    }
}
//.....*.*.*...*.*.*.....*....*..*...*..*...*.*...*.*.*.*.*.*.*.*.*.*..//

const array = ["barcelona", "madrid", "mallorca", "barcelona", "mallorca", "barcelona"];

function conteo(){

    const resultado = {}

   array.forEach(element => {
    resultado[element] = resultado[element] +1 || 1
   });

    console.log(Object.keys(resultado)
    .map(city => ({name: city, times: resultado[city]}))
    .sort((a,b)=>b.times - a.times)
    .slice(0,2)
    .map(city => city.name)
    ) 


   
}

conteo()

