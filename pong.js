//variaveis bolinha
let xBolinha = 300
let yBolinha = 200
let diametro = 17; 

//variaveis raquete 1
let xRaquete = 5
let yRaquete = 150
let larguraRaquete = 10
let comprimentoRaquete = 90;

//variaveis raquete 2
let xRaquete2 = 585
let yRaquete2 = 150;
let chanceDeErrar = 0;

//velocidade bolinha
let veloXBolinha = 6
let veloYBolinha = 6;

//radio da bolinha
let raio = diametro / 2;

//colisão retangulo-circulo github
let colidiu = false

//placar
let meuspontos = 0;
let pontosoponente = 0;

//sons do jogo
let Raquetada;
let Ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3")
  Ponto = loadSound("ponto.mp3")
  Raquetada = loadSound("raquetada.mp3")
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaBorda();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaquete2,yRaquete2);
  moverRaquete1();
  moverRaquete2(); 
  colisaoraquetebiblioteca(xRaquete,yRaquete);
  colisaoraquetebiblioteca(xRaquete2,yRaquete2);
  incluiPlacar();
  marcaponto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += veloXBolinha; //movimento horizontal bolinha
  yBolinha += veloYBolinha; //movimento vertical bolinha
}

function verificaBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio < 0){
    veloXBolinha *= -1
  }
  if (yBolinha + raio> height ||
     yBolinha - raio< 0){
    veloYBolinha *= -1
  }
}

function mostraRaquete(x,y){
  rect(x, y, larguraRaquete, comprimentoRaquete);
}

function moverRaquete1(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function moverRaquete2(){
  velocidadeYoponente = yBolinha - yRaquete2 - larguraRaquete / 2 - 30;
  yRaquete2 += velocidadeYoponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar(){
  if(pontosoponente >= meuspontos){
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
}

function colisaoraquetebiblioteca(x,y){
 colidiu = collideRectCircle(x, y, larguraRaquete, comprimentoRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    veloXBolinha *= -1
    Raquetada.play();
  }
}

function incluiPlacar(){
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(130, 10, 40, 20);
  fill(255);
  text(meuspontos, 150, 26);
  fill(color(255, 140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosoponente, 450, 26);
}

function marcaponto(){
  if (xBolinha > 590){
    meuspontos += 1;
    Ponto.play();
  }
  if (xBolinha < 10){
    pontosoponente += 1;
    Ponto.play();
  }
}