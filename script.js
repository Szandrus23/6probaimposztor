const words = [
  { word: "Nap", hint: "Égi tűzgömb" },
  { word: "Pizza", hint: "Olasz étel" },
  { word: "Macska", hint: "Doromboló háziállat" },
  { word: "Hóember", hint: "Téli figura" },
  { word: "Cipő", hint: "A lábadon van" },
  { word: "Telefon", hint: "Hívásra használod" },
  { word: "Fagylalt", hint: "Nyáron hideg édesség" },
  { word: "Autó", hint: "Négykerekű jármű" },
  { word: "Könyv", hint: "Olvasnivaló" },
  { word: "Bicikli", hint: "Kétkerekű jármű" }
];

let players = [];
let currentIndex = 0;
let realWord = "";
let hintWord = "";
let impostorIndex = -1;

function setupPlayers() {
  const count = parseInt(document.getElementById("playerCount").value);
  if (isNaN(count) || count < 3 || count > 10) {
    alert("3 és 10 játékos között válassz!");
    return;
  }

  const container = document.getElementById("nameInputs");
  container.innerHTML = "";
  players = [];

  for (let i = 0; i < count; i++) {
    const input = document.createElement("input");
    input.placeholder = `Játékos ${i + 1} neve`;
    input.id = `player-${i}`;
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
  }

  document.getElementById("player-setup").classList.add("hidden");
  document.getElementById("name-setup").classList.remove("hidden");
}

function startGame() {
  const count = document.getElementById("nameInputs").children.length / 2;
  players = [];
  for (let i = 0; i < count; i++) {
    const name = document.getElementById(`player-${i}`).value.trim();
    if (!name) {
      alert("Minden játékosnak adj nevet!");
      return;
    }
    players.push(name);
  }

  const random = words[Math.floor(Math.random() * words.length)];
  realWord = random.word;
  hintWord = random.hint;
  impostorIndex = Math.floor(Math.random() * players.length);
  currentIndex = 0;

  document.getElementById("name-setup").classList.add("hidden");
  document.getElementById("gameplay").classList.remove("hidden");

  showWord();
}

function showWord() {
  document.getElementById("currentPlayerName").innerText = `Most ${players[currentIndex]} nézi:`;

  if (currentIndex === impostorIndex) {
    document.getElementById("wordToShow").innerText = `Te vagy az imposztor! Segítség: ${hintWord}`;
  } else {
    document.getElementById("wordToShow").innerText = `Titkos szó: ${realWord}`;
  }
}

function nextPlayer() {
  currentIndex++;
  if (currentIndex >= players.length) {
    document.getElementById("gameplay").classList.add("hidden");
    document.getElementById("reveal").classList.remove("hidden");

    const list = document.getElementById("revealList");
    list.innerHTML = "";
    players.forEach((player, i) => {
      const li = document.createElement("li");
      li.innerText = `${player} - ${i === impostorIndex ? "IMPOSZTOR" : "Tudta a szót"}`;
      list.appendChild(li);
    });
  } else {
    showWord();
  }
}

function restartGame() {
  document.getElementById("reveal").classList.add("hidden");
  document.getElementById("player-setup").classList.remove("hidden");
}
