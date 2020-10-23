//variáveis globais

var global;
var global1;
var m=0;s=0,contador=0,para=0;
var tempo=document.getElementById("cronometro");

//função que gera o campo

function campo (linha,coluna,rand){
    para=1;
    document.getElementById("cont1").innerHTML=rand;
    global = linha;
    global1=coluna;
	var tabuleiro=document.getElementById("jogo");
	tabuleiro.innerHTML="";
    for(var i=0;i<linha;i++){
		var linhas=document.createElement("TR");
		tabuleiro.appendChild(linhas);
		for(var j=0;j<coluna;j++){
			var colunas=document.createElement("TD");
			linhas.appendChild(colunas);
			colunas.setAttribute("id", i + "_" + j);
			colunas.value= 0;
            colunas.setAttribute("class","inicial");
		}
	}
	for(var i=0;i<rand;i++){
        var x=Math.floor(Math.random() * linha);
        var y=Math.floor(Math.random()* coluna);
        var bomb = document.getElementById(x+"_"+y);
        if(bomb.value=="bomba"){
        	i--;
		}
		else{
            bomb.value="bomba";
        }
	}
	var p1,p2;
	for(var i=0;i<linha;i++){
		for(var j=0;j<coluna;j++){
			var soma=document.getElementById(i+"_"+j);
			if(soma.value!="bomba"){
                if (i == 0) {
                    p1 = i;
                }
                else {
                    p1=i-1;
                }
                if (j == 0) {
                    p2 = j;
                }
                else {
                    p2=j-1;
                }
                var quant=3;
                var quant1=3;
                if(i==0||i==linha-1){
                    quant=2;
                }
                if(j==0||j==coluna-1){
                    quant1=2;
                }
				for(var x=0;x<quant1;x++){
					for(var y=0;y<quant;y++){
						var olhar=document.getElementById(p1+"_"+p2);
						if(olhar.value=="bomba"){
							soma.value++;
						}
						p1++;
					}
                    if (i == 0) {
                        p1 = i;
                    }
                    else {
                        p1=i-1;
                    }
					p2++;
				}
			}
		}
	}
    for(var i=0;i<linha;i++){
	    for(var j=0;j<coluna;j++){
	        var objeto=document.getElementById(i+"_"+j);
	        objeto.setAttribute("onmousedown","javascript:guia(event,this);");
	        if(objeto.value==0){
	            objeto.value=" ";
            }
        }
    }
    document.getElementsByTagName("INPUT")[0].setAttribute("class", "campo");//
    document.getElementsByTagName("INPUT")[1].setAttribute("class", "campo");//parte que deixa invisivel os inputs para personalizar
    document.getElementsByTagName("INPUT")[2].setAttribute("class", "campo");//
    document.getElementsByTagName("INPUT")[3].setAttribute("class", "campo");//
}

//guia para função certa de acordo com o value e para iniciar o cronometro

function guia(event,parametro){
    objeto=document.getElementById("cont1").innerHTML;
    if(parametro.value!="fim") {
        if (event.which == 1 && parametro.getAttribute("class") != "bandeira") {
            if(para==1) {
                para=0;
                s=0;
                m=0;
                cronometro();
            }
            if (parametro.value == "bomba") {
                perdeu(parametro);
            }
            else if (parametro.value > 0) {
                abrirN(parametro);
            }
            else {
                vazio(parametro);
            }
        }
        if (event.which == 3 && parametro.getAttribute("class") == "inicial" || event.which == 3 && parametro.getAttribute("class") == "bandeira") {
            if (parametro.getAttribute("class") == "bandeira") {
                parametro.setAttribute("class", "inicial");
                document.getElementById("cont1").innerHTML=++objeto;
            } else if(objeto>0){
                parametro.setAttribute("class", "bandeira");
                document.getElementById("cont1").innerHTML=--objeto;
            }
        }
    }
}

//função que deixa visivel os inputs para personalizar

function personalizado() {
    document.getElementsByTagName("INPUT")[0].setAttribute("class", "campoa");
    document.getElementsByTagName("INPUT")[1].setAttribute("class", "campoa");
    document.getElementsByTagName("INPUT")[2].setAttribute("class", "campoa");
    document.getElementsByTagName("INPUT")[3].setAttribute("class", "campoa");
}

//função que define as medidas da tabela no modo personalizado

function personaliza(){
    var objeto=document.getElementById("campin").value;
    var objeto1=document.getElementById("campon").value;
    var objeto2=document.getElementById("campen").value;
    if(objeto>30||objeto1>30){
        alert("A quantidade de colunas ou linhas é superior a 30, digite novamente!");
        personalizado();//chama de novo para pessoa digitar corretamente
    }
    else if(objeto<2||objeto1<2){
        alert("A quantidade de colunas ou linhas é inferior a 2, digite novamente!");
        personalizado();//chama de novo para pessoa digitar corretamente
    }
    else if(objeto2>=objeto*objeto1){
        alert("Quantidade de bomba superior ou igual ao tamanho do campo, digite novamente!");
        personalizado();//chama de novo para pessoa digitar corretamente
    }
    else if(objeto2<1){
        alert("A quantidade de bombas é inferior a 1, digite novamente!");
        personalizado();//chama de novo para pessoa digitar corretamente
    }
    else {
        campo(objeto, objeto1, objeto2);//se não tiver erro, ele faz o campo
    }
}

//cronometro

var cronometro=function () {
    if(para==0) {
        if (s < 10 && m < 10) {
            tempo.innerHTML = "0" + m + ":0" + s;
        }
        else if (m < 10) {
            tempo.innerHTML = "0" + m + ":" + s;
        }
        else if (s < 10) {
            tempo;
            innerHTML = m + ":0" + s;
        }
        else {
            tempo.innerHTML = m + ":" + s;
        }
        contador++;
        if (m < 60 && s<60) {
            if (contador == 60) {
                contador = 0;
                s = 0;
                m++;
            }
            else {
                s++;
            }
            setTimeout(cronometro, 1000);//repete a função a cada segundo
        }
    }
}

//função para celulas comuns com value entre 1 e 8

function abrirN(parametro){
    parametro.innerHTML=parametro.value;
    parametro.setAttribute("class","click");
    venceu(); //verifica se a pessoa ganhou o jogo quando clicou em tal celula
}

//funções para abrir celulas proximas com value " ", até que chegem a uma com value entre 1 e 8

function vazio(parametro) {
    var p1,p2;
    parametro.setAttribute("class","usado");
    for(var i=0;i<global;i++){
        for(var j=0;j<global1;j++){
            var soma=parametro.getAttribute("ID");
            if(soma==i+"_"+j){
                break;
            }
        }
        if(soma==i+"_"+j){
            break;
        }
    }
    if (i == 0) {
        p1 = i;
    }
    else {
        p1=i-1;
    }
    if (j == 0) {
        p2 = j;
    }
    else {
        p2=j-1;
    }
    var quant=3;
    var quant1=3;
    if(i==0||i==global-1){
        quant=2;
    }
    if(j==0||j==global1-1){
        quant1=2;
    }
    for(var x=0;x<quant1;x++){
        for(var y=0;y<quant;y++){
            var olhar=document.getElementById(p1+"_"+p2);
            if(olhar.getAttribute("class")== "inicial"){
                olhar.setAttribute("class","click");
                olhar.innerHTML=olhar.value;
            }
            p1++;
        }
        if (i == 0) {
            p1 = i;
        }
        else {
            p1=i-1;
        }
        p2++;
    }
    venceu();//verifica se a pessoa ganhou o jogo quando clicou em tal celula
    vazio1();//executa a suposta recursividade, porem utilizando while e nao recursividade
}
function vazio1(){
    var a=1,i,j;
    while (a==1) {
        var p1, p2;
        a = 0;
        for (var i = 0; i < global; i++) {
            for (var j = 0; j <global1; j++) {
                var soma = document.getElementById(i + "_" + j);
                if (soma.getAttribute("class") == "click" && soma.value==0) {
                    soma.setAttribute("class", "usado");
                    a = 1;
                    if (i == 0) {
                        p1 = i;
                    }
                    else {
                        p1 = i - 1;
                    }
                    if (j == 0) {
                        p2 = j;
                    }
                    else {
                        p2 = j - 1;
                    }
                    var quant = 3;
                    var quant1 = 3;
                    if (i == 0 || i == global - 1) {
                        quant = 2;
                    }
                    if (j == 0 || j == global1 - 1) {
                        quant1 = 2;
                    }
                    for (var x = 0; x < quant1; x++) {
                        for (var y = 0; y < quant; y++) {
                            var olhar = document.getElementById(p1 + "_" + p2);
                            if(olhar.getAttribute("class")=="inicial"){
                                olhar.setAttribute("class","click");
                                olhar.innerHTML=olhar.value;
                            }
                            p1++;
                        }
                        if (i == 0) {
                            p1 = i;
                        }
                        else {
                            p1 = i - 1;
                        }
                        p2++;
                    }
                }
            }
        }
    }
    venceu();//verifica se a pessoa ganhou o jogo quando clicou em tal celula
}

//função para celula com value bomba, acaba o jogo!

function perdeu(parametro){
    para=1;
    for(var i=0;i<global;i++) {
        for (var j=0;j<global1;j++) {
            objeto=document.getElementById(i+"_"+j);
            if(objeto.getAttribute("class")=="bandeira" && objeto.value!="bomba"){
                objeto.style.backgroundColor="red";
            }
            if(objeto.value=="bomba") {
                if(objeto.getAttribute("class")!="bandeira"){
                    objeto.setAttribute("class", "bomba");
                }
            }
            else if(objeto.getAttribute("class")!="bandeira"){
                objeto.setAttribute("class","click");
                objeto.innerHTML=objeto.value;
            }
            objeto.value="fim";
        }
    }
    parametro.style.backgroundColor="red";
    alert("Você atingiu uma bomba, por isso vc pedeu");
}

//função que vrifica se a pessoa ganhou

function venceu() {
    var i,j;
    for(i=0;i<global;i++){
        for(j=0;j<global1;j++){
            var vence=document.getElementById(i+"_"+j);
            vencer=vence.getAttribute("class");
            if(vencer=="inicial" && vence.value!="bomba"){
                break;
            }
        }
        if(vencer=="inicial" && vence.value!="bomba"){
            break;
        }
    }
    if(i==global && j==global1){
        para=1;
        alert("vc venceu");
        for(var i=0;i<global;i++) {
            for (var j=0;j<global1;j++) {
                var objeto=document.getElementById(i+"_"+j);
                objeto.value="fim";
            }
        }
    }
}