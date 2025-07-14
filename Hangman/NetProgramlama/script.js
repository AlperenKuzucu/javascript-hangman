//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

// Oyun Seçenekleri 
let options = {
  meyveler: [
    "ELMA",
    "YABANMERSİNİ",
    "MANDALİNA",
    "ANANAS",
    "ÇİLEK",
    "ARMUT",
    "KİRAZ",
    "VİŞNE",
    "PORTAKAL",
    "AYVA",
    "ERİK",
    "KAVUN",
    "KAYISI",
    "ŞEFTALİ",
    "MUZ",
  ],
  hayvanlar: ["KÖPEK", "KEDİ", "TİMSAH", "PANTER", "ASLAN", "ZEBRA","KAPLUMBAĞA","KUŞ","AT","TAVUK","KEÇİ","BALİNA","KURBAĞA","DEVE","YILAN",],
  ulkeler: [
    "TÜRKİYE",
    "ALMANYA",
    "ARJANTİN",
    "NORVEÇ",
    "İNGİLTERE",
    "AMERİKABİRLEŞİKDEVLETLERİ",
    "ÇİN",
    "RUSYA",
    "ENDONEZYA",
    "JAPONYA",
    "BREZİLYA",
    "HOLLANDA",
    "FRANSA",
    "İTALYA",
    "YUNANİSTAN",
  ],
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Seçenek Butonları
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Lütfen Birini Seçin</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Tüm butonlarını engelle 
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //Tüm seçenekler devre dışı 
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //Tüm harfler devre dışı
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Kelime oluşturma 
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //başlangıçta harfleri gizle, önceki kelimeyi temizle
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //Rastgele kelime seç
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //her harfi kısa çizgi içeren yayılma alanıyla değiştirin
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Her öğeyi aralık olarak göster
  userInputSection.innerHTML = displayItem;
};

//Başlangıç İşlevi (Sayfa yüklendiğinde/kullanıcı yeni oyuna bastığında çağrılır)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Başlangıçta tüm içeriği silin ve harfleri ve yeni oyun düğmesini gizleyin
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

// Türk alfabesi harfleri içeren dizi
const turkishLetters = ['A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H', 'I', 'İ', 'J', 'K', 'L', 'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z'];

// Harf butonlarını oluşturmak için döngü
turkishLetters.forEach(letter => {
  let button = document.createElement("button");
  button.classList.add("letters");
  button.innerHTML = letter; // innerHTML kullanarak HTML öğelerini ekliyoruz
  button.addEventListener("click", () => {
    let charArray = chosenWord.split("");
    let dashes = document.getElementsByClassName("dashes");
    if (charArray.includes(button.innerText)) {
      charArray.forEach((char, index) => {
        if (char === button.innerText) {
          dashes[index].innerText = char;
          winCount += 1;
          if (winCount == charArray.length) {
            resultText.innerHTML = `<h2 class='win-msg'>Kazandınız!!</h2><p>Kelime: <span>${chosenWord}</span></p>`;
            blocker();
          }
        }
      });
    } else {
      count += 1;
      drawMan(count);
      if (count == 6) {
        resultText.innerHTML = `<h2 class='lose-msg'>Kaybettiniz!!</h2><p>Doğru kelime: <span>${chosenWord}</span></p>`;
        blocker();
      }
    }
    button.disabled = true;
  });
  letterContainer.append(button);
});


  displayOptions();
  //canvasCreator'ı çağırın (önceki tuvali temizlemek ve ilk tuvali oluşturmak için)
  let { initialDrawing } = canvasCreator();
  //initalDrawing çerçeveyi çizecek
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //Çizgi çizmek için
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//Adamı çiz
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//Yeni Oyun
newGameButton.addEventListener("click", initializer);
window.onload = initializer;