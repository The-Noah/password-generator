const characterAmountRangeElement = document.querySelector("#characterAmountRange");
const characterAmountLabelElement = document.querySelector("#characterAmountLabel");
const includeUppercaseElement = document.querySelector("#includeUppercase");
const includeNumbersElement = document.querySelector("#includeNumbers");
const includeSymbolsElement = document.querySelector("#includeSymbols");
const passwordElement = document.querySelector("h3");
const form = document.querySelector("form");

const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
);

const switchTemplate = document.createElement("template");
switchTemplate.innerHTML = `
  <div class="switch__inner-container">
    <div class="switch__slider"></div>
  </div>
`;
class Switch extends HTMLElement{
  get checked(){
    return this.hasAttribute("checked");
  }

  set checked(value){
    if(value){
      this.setAttribute("checked", "true");
    }else{
      this.removeAttribute("checked");
    }
  }

  constructor(){
    super();

    this.onclick = () => {
      this.checked = !this.checked;
    };

    this.appendChild(switchTemplate.content.cloneNode(true));
  }
}
customElements.define("app-switch", Switch);

characterAmountRangeElement.addEventListener("input", syncLengthText);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  generatePassword();
});

syncLengthText();
generatePassword();
getTheme();

function generatePassword(){
  const characterAmount = characterAmountRangeElement.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;

  let charCodes = LOWERCASE_CHAR_CODES;
  if(includeUppercase){
    charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  }
  if(includeNumbers){
    charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  }
  if(includeSymbols){
    charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  }

  let password = "";
  for(let i = 0; i < characterAmount; i++){
    const char = charCodes[Math.floor(Math.random() * charCodes.length)];
    password += String.fromCharCode(char);
  }

  passwordElement.innerText = password;
};

function arrayFromLowToHigh(low, high){
  const array = [];

  for(let i = low; i <= high; i++){
    array.push(i);
  }

  return array;
};

function syncLengthText(){
  characterAmountLabelElement.innerText = `Length: ${characterAmountRangeElement.value}`;
}

function copy(element){
  const text = element.innerText;
  if(copyToClipboard(passwordElement.innerText)){
    element.innerText = "Copied!";
  }else{
    element.innerText = "Failed to copy";
  }

  setTimeout(() => element.innerText = text, 2000);
}

function copyToClipboard(text){
  const textarea = document.createElement("textarea");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.value = text;

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try{
    document.execCommand("copy");
  }catch(err){
    alert("failed to copy text to clipboard");
    document.body.removeChild(textarea);

    return false;
  }

  document.body.removeChild(textarea);
  return true;
};

function getTheme(){
  const theme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
}

function toggleTheme(){
  let theme = getTheme();
  theme = theme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  if(theme === "dark"){
    localStorage.removeItem("theme");
  }else{
    localStorage.setItem("theme", theme);
  }
}
