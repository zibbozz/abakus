/*
	Wenn eine Kugel zählt, besitzt diese die Klasse "active"
*/

let row1 = [], row2 = [], row3 = [], row4 = [], row5 = [], rows = [];
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
	rows = [row1, row2, row3, row4, row5];
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
	for(i = 0; i < 10; i++){
		if(rows[index-1][i].classList.contains("active")){
			amount++;
		}
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
			if(element == 0 && getRowAmount(row)<10){
				if(getRowAmount(row +1)<10){
				for(i = element; i < 10; i++){
					rows[row-1][i].style.left = (i * 4 + 60) + "%";
					rows[row-1][i].classList.add("active");
				}
				setTimeout(function(){
					for(i = 9; i >= 0; i--){
						rows[row-1][i].style.left = (i * 4) + "%";
						rows[row-1][i].classList.remove("active");
					}
					add(row+1, 1);
				}, 350);
			} else{
				for(i = element; i < 10; i++){
					rows[row-1][i].style.left = (i * 4 + 60) + "%";
					rows[row-1][i].classList.add("active");
				}
			}
			} else if(rows[row-1][element].classList.contains("active")){
				for(i = element; i >= 0; i--){
					rows[row-1][i].style.left = (i * 4) + "%";
					rows[row-1][i].classList.remove("active");
				}

			} else {
				for(i = element; i < 10; i++){
					rows[row-1][i].style.left = (i * 4 + 60) + "%";
					rows[row-1][i].classList.add("active");
				}
			}
	refresh();
}
