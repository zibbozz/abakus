/*
	Wenn eine Kugel zählt, besitzt diese die Klasse "active"
*/

let row1 = [],
  row2 = [],
  row3 = [],
  row4 = [],
  row5 = [],
  rows = [];
let value = document.getElementById("value");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function initialize() {
  for (i = 0; i < 10; i++) {
    row1.push(document.getElementById("p1" + i));
    row2.push(document.getElementById("p2" + i));
    row3.push(document.getElementById("p3" + i));
    row4.push(document.getElementById("p4" + i));
    row5.push(document.getElementById("p5" + i));

    row1[i].style.left = (i * 4) + "%";
    row2[i].style.left = (i * 4) + "%";
    row3[i].style.left = (i * 4) + "%";
    row4[i].style.left = (i * 4) + "%";
    row5[i].style.left = (i * 4) + "%";
  }
  rows = [row1, row2, row3, row4, row5];
}

function getAmount() {
  let count = 0;

  for (i = 0; i < 10; i++) {
    if (row1[i].classList.contains("active")) {
      count++;
    }
    if (row2[i].classList.contains("active")) {
      count += 10;
    }
    if (row3[i].classList.contains("active")) {
      count += 100;
    }
    if (row4[i].classList.contains("active")) {
      count += 1000;
    }
    if (row5[i].classList.contains("active")) {
      count += 10000;
    }
  }
  return count;
}

function getRowAmount(index) {
  let amount = 0;
  for (i = 0; i < 10; i++) {
    if (rows[index - 1][i].classList.contains("active")) {
      amount++;
    }
  }
  return amount;
}

function refresh() {
  value.innerHTML = getAmount();
}

async function totalAdd(value) {
	// Wieso replace hier nicht möglich?   #Frage
  if (value[0] == '-' && (getAmount()+parseInt(value))>= 0) {
    for (let i = 1; i < value.length; i++) {
      sub(i, parseInt(value.charAt(value.length-(i))));
			await sleep(350);
    }
  } else if ((value[0] == '+')&&(parseInt(value)+getAmount())<= 111110) {
    for (let i = 0; i < value.length; i++) {
	 		add(i, parseInt(value.charAt(value.length - (i))));
			await sleep(350);
    }
  }else if(parseInt(value)+getAmount() > 111110){
		alert("Darf den gesamten Wert von 111110 nicht überschreiten!");
	}else if(getAmount()+parseInt(value) < 0){
		alert("Darf den gesamten Wert von 0 nicht unterschreiten!");
	}
	else {
    alert("Vorzeichen eingeben!");
  }
}

async function add(row, value) { //Row = angesprochene Reihe, Value = Anzahl der Kugeln die verschoben werden sollen
  if (value > 0 && row > 0) {
    let amount = getRowAmount(row);
    let aktuelleReihe = 10 * row;
    if (amount + value > 10) {
      move(aktuelleReihe);
      await sleep(350);
      value -= (10 - amount);
      move(aktuelleReihe + (10 - value));
    } else {
      move(aktuelleReihe + (10 - (value + amount)));
    }
  }
}

async function sub(row, value) { //Row = angesprochene Reihe, Value = Anzahl der Kugeln die verschoben werden sollen
  if (value > 0 && row > 0) {
    let amount = getRowAmount(row);
    let aktuelleReihe = 10 * row;
    if (amount - value < 0) {
			if(getRowAmount(row)>=1){
      move(aktuelleReihe+9);
			}
      await sleep(350);
			sub(row+1, 1);
      value =  10 - (value-amount);
      add(row, value);
    } else {
      move(aktuelleReihe + (value + (9 - amount)));
    }
  }
}

async function move(index) {
  let element = index % 10;
  let row = Math.floor(index / 10);
  if (row < 5 && element == 0 && getRowAmount(row) < 10) { //Nicht ganz oben UND linkes Element UND aktuelle Reihe nicht voll
      if (getRowAmount(row + 1) < 10) { //nächste Reihe nicht voll
        for (i = element; i < 10; i++) {
          rows[row - 1][i].style.left = (i * 4 + 60) + "%";
          rows[row - 1][i].classList.add("active");
        }
        await sleep(350);
        for (i = 9; i >= 0; i--) {
          rows[row - 1][i].style.left = (i * 4) + "%";
          rows[row - 1][i].classList.remove("active");
        }
        add(row + 1, 1);
      } else { //nächste Reihe voll
        for (i = element; i < 10; i++) {
          rows[row - 1][i].style.left = (i * 4 + 60) + "%";
          rows[row - 1][i].classList.add("active");
        }
      }


  } else if (rows[row - 1][element].classList.contains("active")) { //ist Element rechts
    for (i = element; i >= 0; i--) {
      rows[row - 1][i].style.left = (i * 4) + "%";
      rows[row - 1][i].classList.remove("active");
    }

  } else { //Sonst
    for (i = element; i < 10; i++) {
      rows[row - 1][i].style.left = (i * 4 + 60) + "%";
      rows[row - 1][i].classList.add("active");
    }
  }
  refresh();
}
