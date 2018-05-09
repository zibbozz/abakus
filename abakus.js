/*
	Wenn eine Kugel zählt, besitzt diese die Klasse "active"
*/

let row1 = [], row2 = [], row3 = [], row4 = [], row5 = [], rows = [];
let row1full = false, row2full = false, row3full = false, row4full = false;
let value = document.getElementById("value");

function initialize(){
	for(i = 0; i < 10; i++){
		row1.push(document.getElementById("p1" + i));
		row2.push(document.getElementById("p2" + i));
		row3.push(document.getElementById("p3" + i));
		row4.push(document.getElementById("p4" + i));
		row5.push(document.getElementById("p5" + i));

		row1[i].style.left = (i*4) + "%";
		row2[i].style.left = (i*4) + "%";
		row3[i].style.left = (i*4) + "%";
		row4[i].style.left = (i*4) + "%";
		row5[i].style.left = (i*4) + "%";
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getAmount(){
	let count = 0;

	for(i = 0; i < 10; i++){
		if(row1[i].classList.contains("active")){
			count++;
		}
		if(row2[i].classList.contains("active")){
			count += 10;
		}
		if(row3[i].classList.contains("active")){
			count += 100;
		}
		if(row4[i].classList.contains("active")){
			count += 1000;
		}
		if(row5[i].classList.contains("active")){
			count += 10000;
		}
	}
	return count;
}

function getRowAmount(index){
	let amount = 0;
	switch(index){
		case 1:
			for(i = 0; i < 10; i++){
				if(row1[i].classList.contains("active")){
					amount++;
				}
			}
		break;
		case 2:
		for(i = 0; i < 10; i++){
			if(row2[i].classList.contains("active")){
				amount++;
			}
		}
		break;
		case 3:
		for(i = 0; i < 10; i++){
			if(row3[i].classList.contains("active")){
				amount++;
			}
		}
		break;
		case 4:
		for(i = 0; i < 10; i++){
			if(row4[i].classList.contains("active")){
				amount++;
			}
		}
		break;
		case 5:
		for(i = 0; i < 10; i++){
			if(row5[i].classList.contains("active")){
				amount++;
			}
		}
		break;
	}
	return amount;
}

function refresh(){
	value.innerHTML = getAmount();
}

function totalAdd(value){
	if(value[0] == '-')
	{
		for (let i = 2; i < value.length+1; i++) {
			//sub(i-1, parseInt(value.charAt(value.length-(i))));
		}
	} else if((value[0] == '+')) {
	for (let i = 1; i < value.length+1; i++) {
		add(i, parseInt(value.charAt(value.length-(i))));
	}
}
else {
	alert("Vorzeichen eingeben!");
}
}

function add(row, value){ //Row = angesprochene Reihe, Value = Anzahl der Kugeln die verschoben werden sollen
	let amount = getRowAmount(row);
	let aktuelleReihe = 10*row;
	if (amount + value > 10) {
			move(aktuelleReihe);
			setTimeout(function(){
				move(aktuelleReihe + (10 - (value + amount)));
			}, 350);
		} else {
			move(aktuelleReihe + (10 - (value + amount)));
		}
	}

	/*function sub(row, value){ //Row = angesprochene Reihe, Value = Anzahl der Kugeln die verschoben werden sollen
		if (value < getAmount()) {
		let amount = getRowAmount(row);
		let aktuelleReihe = 10*row;
		if (amount - value > 0) {
				movesub(aktuelleReihe+9);
				setTimeout(function(){
					movesub(aktuelleReihe - (10 - (value + amount)));
				}, 350);
			} else {
				movesub(aktuelleReihe - (10 - (value + amount)));
			}
		}
		else {
			//Fehler
		}
	}*/

function move(index){
	let element = index % 10;
	let row = Math.floor(index / 10);

	switch(row){
		case 1:
			if(element == 0){
				for(i = element; i < 10; i++){
					row1[i].style.left = (i * 4 + 60) + "%";
					row1[i].classList.add("active");
				}
				setTimeout(function(){
					for(i = 9; i >= 0; i--){
						row1[i].style.left = (i * 4) + "%";
						row1[i].classList.remove("active");
					}
					add(2, 1);
				}, 350);
			} else if(row1[element].classList.contains("active")){
				for(i = element; i >= 0; i--){
					row1[i].style.left = (i * 4) + "%";
					row1[i].classList.remove("active");
				}
			} else {
				for(i = element; i < 10; i++){
					row1[i].style.left = (i * 4 + 60) + "%";
					row1[i].classList.add("active");
				}
			}
		break;
		case 2:
			if(element == 0){
				for(i = element; i < 10; i++){
					row2[i].style.left = (i * 4 + 60) + "%";
					row2[i].classList.add("active");
				}
				setTimeout(function(){
					for(i = 9; i >= 0; i--){
						row2[i].style.left = (i * 4) + "%";
						row2[i].classList.remove("active");
					}
					add(3, 1);
				}, 350);
			} else if(row2[element].classList.contains("active")){
				for(i = element; i >= 0; i--){
					row2[i].style.left = (i * 4) + "%";
					row2[i].classList.remove("active");
				}
			} else {
				for(i = element; i < 10; i++){
					row2[i].style.left = (i * 4 + 60) + "%";
					row2[i].classList.add("active");
				}
			}
		break;
		case 3:
			if(element == 0){
				for(i = element; i < 10; i++){
					row3[i].style.left = (i * 4 + 60) + "%";
					row3[i].classList.add("active");
				}
				setTimeout(function(){
					for(i = 9; i >= 0; i--){
						row3[i].style.left = (i * 4) + "%";
						row3[i].classList.remove("active");
					}
					add(4, 1);
				}, 350);
			} else if(row3[element].classList.contains("active")){
				for(i = element; i >= 0; i--){
					row3[i].style.left = (i * 4) + "%";
					row3[i].classList.remove("active");
				}
			} else {
				for(i = element; i < 10; i++){
					row3[i].style.left = (i * 4 + 60) + "%";
					row3[i].classList.add("active");
				}
			}
		break;
		case 4:
			if(element == 0){
				for(i = element; i < 10; i++){
					row4[i].style.left = (i * 4 + 60) + "%";
					row4[i].classList.add("active");
				}
				setTimeout(function(){
					for(i = 9; i >= 0; i--){
						row4[i].style.left = (i * 4) + "%";
						row4[i].classList.remove("active");
					}
					add(5, 1);
				}, 350);
			} else if(row4[element].classList.contains("active")){
				for(i = element; i >= 0; i--){
					row4[i].style.left = (i * 4) + "%";
					row4[i].classList.remove("active");
				}
			} else {
				for(i = element; i < 10; i++){
					row4[i].style.left = (i * 4 + 60) + "%";
					row4[i].classList.add("active");
				}
			}
		break;
		case 5:
			if(row5[element].classList.contains("active")){
				for(i = element; i >= 0; i--){
					row5[i].style.left = (i * 4) + "%";
					row5[i].classList.remove("active");
				}
			} else {
				for(i = element; i < 10; i++){
					row5[i].style.left = (i * 4 + 60) + "%";
					row5[i].classList.add("active");
				}
			}
		break;
	}

	refresh();
}
