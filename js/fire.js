/* Váriáveis */
const firePixelArray = [];      //Contém os pixeis do fogo
const fireWidth = 10;            //Largura do Fogo
const fireHeight = 10;           //Altura do Fogo
const fireCanvas = document.getElementById("fireCanvas");   //Div onde o fogo é inserido

/* Funções */

//Função de inicilização
function start(){
    createFireDataStructure();
    renderfire();
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
    
}

//Renderização do fogo
function renderfire(){
    //Cria a tabela que tera os pixels com o fogo
    var table = '<table border=1 cellpading=0 cellspacing=0>';

    //Passa por cada pixel existente
    for(y = 0; y < fireHeight; y++){
        table += '<tr>';
        for(x = 0; x < fireWidth; x++){
            //Índice do pixel
            pixelIndex = x + (fireWidth * y);
            //Intensidade do Fogo
            fireIntensity = firePixelArray[pixelIndex];

            table += '<td>';
            table += `<div class="pixel-index">${pixelIndex}</div>`;
            table += fireIntensity;
            table += '</td>';
        }
        table += '</tr>';
    }

    table += '</table>';

    //Coloca o fogo no canvas
    fireCanvas.innerHTML = table;
}

start();