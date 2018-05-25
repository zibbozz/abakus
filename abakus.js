let row1 = [], // Array-Stange1
  row2 = [], // Array-Stange2
  row3 = [], // Array-Stange3
  row4 = [], // Array-Stange4
  row5 = [], // Array-Stange5
  rows = []; // Array-Stangen
// Elemente zum Anzeigen der Werte werden als Objekt initialisiert
let value = document.getElementById("value");
let value2 = document.getElementById("value2");
let input = document.getElementById('addField');
let cap = 99999; // Additions Obergrenze

input.addEventListener("keyup", function(event) { // Enter ruft wie selbe Funktion auf, wie bei einem Klick auf den Button
  if (event.keyCode === 13) { // Enter Taste
    totalAdd(document.getElementById('addField').value.replace(/ /g, ''));
  }
});

function sleep(ms) { // Funktion um einen Delay zu erstellen
  // Promise wird verwendet, wenn etwas asynchron ausgeführt werden muss. Es ist ein Platzhalter für Werte, welche
  // während der Erstellung noch nicht bekannt sind
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Alles kommt auf die Anfangsposition
function initialize() {
  for (i = 0; i < 10; i++) {
    // Fügt alle Kugeln den entsprechenden Listen hinzu
    row1.push(document.getElementById("p1" + i));
    row2.push(document.getElementById("p2" + i));
    row3.push(document.getElementById("p3" + i));
    row4.push(document.getElementById("p4" + i));
    row5.push(document.getElementById("p5" + i));

    // Aufeinander folgende Elemente werden um 4% versetzt positioniert
    row1[i].style.left = (i * 4) + "%";
    row2[i].style.left = (i * 4) + "%";
    row3[i].style.left = (i * 4) + "%";
    row4[i].style.left = (i * 4) + "%";
    row5[i].style.left = (i * 4) + "%";
  }
  // Macht aus den einzelnen Zeilen von Kugeln eine 2D Liste
  rows = [row1, row2, row3, row4, row5];
}

// Cap-Setter
function setCap(newCap) {
  if (newCap > 0 && newCap < 111111) { // Alles Andere kann nicht dargestellt werden
    cap = newCap; // Setzt den neuen Cap-Wert
  } else {
    alert("Darf nur einen gesamten Wert von 0 bis 111110 besitzen!");
  }
}

function right(index) {
  // Schiebt die ganze Reihe nach rechts
  // Benötigt da "move(X0)" für einen Automatischen Überlauf sorgen würde
  for (i = 0; i < 10; i++) {
    rows[index - 1][i].style.left = (i * 4 + 60) + "%";
    rows[index - 1][i].classList.add("active");
  }
  return new Promise(resolve => setTimeout(resolve, 350));
}

// Rechnet den aktuellen Wert zusammen
function getAmount() {
  let count = 0;
  for (i = 0; i < 10; i++) {
    // Geht jede Spalte durch und sucht "active" Kugeln
    if (row1[i].classList.contains("active")) {
      // Einerwert
      count++;
    }
    if (row2[i].classList.contains("active")) {
      // Zehnerwert
      count += 10;
    }
    if (row3[i].classList.contains("active")) {
      // Hunderterwert
      count += 100;
    }
    if (row4[i].classList.contains("active")) {
      // Tausenderwert
      count += 1000;
    }
    if (row5[i].classList.contains("active")) {
      // Zehntausenderwert
      count += 10000;
    }
  }
  return count;
}

// Gibt an wieviele Kugeln in der Angegebenen Reihe "active" sind (Nicht der Wert)
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
  // Aktualisiert die Anzeigewerte auf der Website
  value.innerHTML = getAmount();
  value2.innerHTML = getAmount();
}

// async bewirkt, dass der await befehlt innerhalb dieser Funktion vewendet werden kann
async function totalAdd(value) {
  // Addiert die postitive oder negative Zahl zu dem Abakus
  // Wieso replace der " " hier nicht möglich? async??   #Frage
  if (value[0] == '-' && (getAmount() + parseInt(value)) >= 0) {
    // Fall einer negativen Zahl
    for (let i = 1; i < value.length; i++) {
      // Zieht jeder Reihe die entsprechende Anzahl an Kugeln ab (Überlauf rekusiv gelöst)
      if (parseInt(value.charAt(value.length - (i))) > 0) {
        // Wenn die Ziffer größer als 0 ist
        await sub(i, parseInt(value.charAt(value.length - (i))));
      }
      //Wartet auf sub-Rückgabe
    }
  } else if ((value[0] == '+') && (parseInt(value) + getAmount()) <= cap) {
    // Fall einer postitiven Zahl
    for (let i = 1; i < value.length; i++) {
      // Fügt jeder Reihe die entsprechende Anzahl an Kugeln hinzu (Überlauf rekusiv gelöst)
      if (parseInt(value.charAt(value.length - (i))) > 0) {
        // Wenn die Ziffer größer als 0 ist
        await add(i, parseInt(value.charAt(value.length - (i))));
      }
      // Wartet auf die Rückgabe der Funktion "add"
    }
  } else if (parseInt(value) + getAmount() > cap) {
    // Eingegebende Zahl zu groß
    alert("Darf den gesamten Wert von " + cap + " nicht überschreiten!");
  } else if (getAmount() + parseInt(value) < 0) {
    // Eingegebende Zahl zu klein
    alert("Darf den gesamten Wert von 0 nicht unterschreiten!");
  } else {
    // Default
    alert("Vorzeichen eingeben!");
  }
}

// Fügt der entsprechenden Reihe die Anzahl der Kugeln hinzu
async function add(row, value) {
  // Row = angesprochene Reihe, Value = Anzahl der Kugeln die verschoben werden sollen
  if (row == 6 && value == 1 && getRowAmount(5) == 1) {
    // Wenn mehr 1000000 addiert werden und row 5 schon eine Kugel rechts hat
    await right(5);
    if (getRowAmount(4) == 1) // Wenn Reihe 4 schon eine Kugel rechts hat
    {
      await right(4);
      if (getRowAmount(3) == 1) // Wenn Reihe 3 schon eine Kugel rechts hat
      {
        await right(3);
        if (getRowAmount(2) == 1) // Wenn Reihe 2 schon eine Kugel rechts hat
        {
          await right(2);
          await right(1);
        } else {
          right(2);
        }
      } else {
        right(3);
      }
    } else {
      right(4);
    }
  } else if (row == 6 && value == 1) {
    await right(5);
  } // Wenn mehr 1000000 addiert werden
  // Normalfall Addierung:
  if (value > 0 && row > 0 && row <= 5) {
    // Wenn Wert + Reihe gültig ist
    let amount = getRowAmount(row);
    let aktuelleReihe = 10 * row;
    if (amount + value > 10) {
      // Falls Überlauf
      await move(aktuelleReihe); // Reihe nach rechts (Überlauf in Move)
      value -= (10 - amount); // Rest nach Überlauf
      await move(aktuelleReihe + (10 - value)); // Rest addieren
    } else {
      move(aktuelleReihe + (10 - (value + amount))); // Addieren
    }
  }
  return new Promise(resolve => setTimeout(resolve, 350)); // Warten wegen der Animation
}

//
async function sub(row, value) {
  if (row > 1 && value > 0 && getRowAmount(row - 1) == 10) {
    // Falls die Zeile dadrunter voll ist
    await sub(row - 1, 10); // Dort 10 abziehen
    value -= 1; // Hier 1 weniger Abziehen
  }
  if (value > 0 && row > 0 && row <= 5) { // Wenn es was zum abziehen gibt und es in einer gültigen Reihe ist
    // Liest die Reihe und Spalte aus der Variable index. 10er Stellen sind die Reihen, 1er Stellen die Kugeln
    let amount = getRowAmount(row);
    let aktuelleReihe = 10 * row;

    if (amount - value < 0) { // Wenn mehr abgezogen werden müssen als vorhanden
      if (getRowAmount(row) >= 1) { // Wenn mindestens eine Kugel links in der Reihe
        await move(aktuelleReihe + 9); // Alle Elemente nach Links
      }
      await sub(row + 1, 1); // Subtrahiert 1 von der höheren Zeile
      await right(row); // Bekommt dafür 10 Kugeln in der Aktuellen Zeile
      value = value - amount; // Berechnet den Rest der Abgezogen werden muss
      await sub(row, value); // Zieht den Rest ab
    } else {
      await move(aktuelleReihe + (value + (9 - amount))); // Zieht den Wert von der Reihe ab
    }
  }
  return new Promise(resolve => setTimeout(resolve, 350)); // Warten wewgen der Animation
}

// Ist für die Bewegung der Kugeln verantwortlich
async function move(index) {
  // Liest die Reihe und Spalte aus der Variable index. 10er Stellen sind die Reihen, 1er Stellen die Kugeln
  let element = index % 10;
  let row = Math.floor(index / 10);


  if (row < 5 && element == 0 && getRowAmount(row) < 10) { //Nicht ganz oben UND linkes Element UND aktuelle Reihe nicht voll
    if (getRowAmount(row + 1) < 10) { //nächste Reihe nicht voll
      // Setzt alle Elemente ab dem angegebenen Element auf active und ändert ihren left-Wert
      for (i = element; i < 10; i++) {
        rows[row - 1][i].style.left = (i * 4 + 60) + "%";
        rows[row - 1][i].classList.add("active");
      }
      await sleep(350); // Wartet auf die Animation

      // Alle Elemente nach links
      for (i = 9; i >= 0; i--) {
        rows[row - 1][i].style.left = (i * 4) + "%";
        rows[row - 1][i].classList.remove("active");
      }
      add(row + 1, 1);
    } else { //nächste Reihe voll
      // Nach Rechts schieben ab element
      for (i = element; i < 10; i++) {
        rows[row - 1][i].style.left = (i * 4 + 60) + "%";
        rows[row - 1][i].classList.add("active");
      }
    }
  } else if (rows[row - 1][element].classList.contains("active")) { //ist Element rechts
    // Nach links schieben bis element
    for (i = element; i >= 0; i--) {
      rows[row - 1][i].style.left = (i * 4) + "%";
      rows[row - 1][i].classList.remove("active");
    }

  } else { //Sonst
    // Nach Rechts schieben ab element
    for (i = element; i < 10; i++) {
      rows[row - 1][i].style.left = (i * 4 + 60) + "%";
      rows[row - 1][i].classList.add("active");
    }
  }
  refresh();
  return new Promise(resolve => setTimeout(resolve, 350));
}
