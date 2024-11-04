async function getData(){

    const res = await fetch("https://restcountries.com/v3.1/region/europe")
    const data = await res.json()
    console.log(data);
    return data
}
getData()

async function flagi(){
    const kraje = await getData();
    console.log(kraje);
    for( let i in kraje){
       
        let x = Math.floor((Math.random() * kraje.length)+1)
            
       document.querySelector("img").setAttribute("src", kraje[x].flags.png)

       document.querySelector("name").textContent = kraje[x].name.common
       

    }}
flagi()

function check(){
    const input = querySelector("input")
    if{
        input = 
    }
}

