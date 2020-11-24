const button = document.getElementById('button');
const input = document.getElementById('input');
const main = document.getElementById('main');


const generateImei = () => {
    do {
        randomNumber = Math.floor(Math.random() * 1000000000000000) + 1
    }
    while (!isImeiValid(String(randomNumber))){
        return randomNumber
    }
}
const isImeiValid = imei => {
    const doubledEvenImeiNumbers = imei.split("").map((item, index) => {
      if (index % 2 === 1) {
        return item * 2;
      }
      return Number(item);
    });

    const lastDigit = doubledEvenImeiNumbers.pop();
    const sumImeiNumbers = doubledEvenImeiNumbers.join("").split("").reduce((pv, cv) => Number(pv) + Number(cv), 0);

    const ceilImei = Math.ceil(sumImeiNumbers / 10) * 10;

    return Number(ceilImei) - Number(sumImeiNumbers) === Number(lastDigit);
}

const copyToClipBoard = input => {
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}

const showPopup = (message, element) => {
    const popup = `
        <div class="popup">
            ${message}
        </div>
    `;
    
    element.innerHTML = popup;
    setTimeout(() => element.innerHTML = '', 3100)
    
}

button.onclick = () => {
    const createdImei = generateImei()
    input.value = createdImei
    if(document.getElementById('checkbox').checked){
        copyToClipBoard(input);
        showPopup('Imei is Copied', document.getElementById('popup-container'));
    }
    
}