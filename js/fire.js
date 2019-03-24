/* Váriáveis */
const firePixelArray = [];      //Contém os pixeis do fogo
const fireWidth = 50;            //Largura do Fogo
const fireHeight = 40;           //Altura do Fogo
const fireCanvas = document.getElementById("fireCanvas");   //Div onde o fogo é inserido
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
const debug = false;              //Diz se o sistema iniciará em modo depuração ou não

/* Funções */

//Função de inicilização
function start(){
    createFireDataStructure();
    createFireSource();
    renderfire();

    //Calcula a intensidade
    if(debug){
        seconds = 1000;
    }else{
        seconds = 50;
    }
    setInterval(calculateFirePropagation, seconds);
}

// Criação da estrutura de dados
function createFireDataStructure(){
    //Guarda o número total de pixels
    numberOfPixels = fireWidth * fireHeight;

    //Define cada índice do array dos pixels
    for(var i = 0; i < numberOfPixels; i++){
        firePixelArray[i] = 0;
    }
}

//Determina a intensidade do fogo em cada pixel
function calculateFirePropagation(){
    //Passa por cada pixel do canvas
    for(x = 0; x < fireWidth; x++){ 
        for(y = 0; y < fireHeight; y++){
            //Define o decaimento da chama
            const decay = Math.floor(Math.random() * 3);
            pixelIndex = x + (fireWidth * y);

            //Verifica se o pixel atual não está na última linha
            if(pixelIndex >= (fireHeight * fireWidth - fireWidth)){

            }else{
                newFireIntensity = firePixelArray[pixelIndex+fireWidth] - decay;
                if(newFireIntensity < 0){
                    newFireIntensity = 0;
                }
    
                if(isNaN(newFireIntensity)){
                    console.log("Deu merda");
                    console.log("Decay: "+decay);
                    console.log("PixelIndex: "+pixelIndex);
                    console.log("Intensidade de baixo: "+firePixelArray[pixelIndex+fireWidth]);
                    console.log("Nova Internsidade: "+newFireIntensity);
                }
            
                firePixelArray[pixelIndex - decay] = newFireIntensity;

            }
        } 
    }

    //Renderiza novamente o canvas
    renderfire();
}

//Renderização do fogo
function renderfire(){
    //Cria a tabela que tera os pixels com o fogo
    var table = '<table cellpading=0 cellspacing=0>';

    //Passa por cada pixel existente
    for(y = 0; y < fireHeight; y++){
        table += '<tr>';
        for(x = 0; x < fireWidth; x++){
            //Índice do pixel
            pixelIndex = x + (fireWidth * y);
            //Intensidade do Fogo
            fireIntensity = firePixelArray[pixelIndex];

            if(debug){
                table += '<td>';
                table += `<div class="pixel-index">${pixelIndex}</div>`;
                table += fireIntensity;
                table += '</td>';
            }else{
                //Verifica a cor da td
                color = fireColorsPalette[fireIntensity];
                
                colorText = `rgb(${color.r}, ${color.g}, ${color.b})`;

                table += `<td class='pixel' style='background-color: ${colorText}'>`;
                table += '</td>';
            }
        }
        table += '</tr>';
    }

    table += '</table>';

    //Coloca o fogo no canvas
    fireCanvas.innerHTML = table;
}

//Cria a fonte do fogo
function createFireSource(){
    for(column = 0; column < fireWidth; column++){
        firePixelArray[(fireWidth * (fireHeight - 1) + column)] = 36;
    }
}

start();