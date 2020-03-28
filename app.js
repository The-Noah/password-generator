const characterAmountRangeElement=document.querySelector("#characterAmountRange"),characterAmountLabelElement=document.querySelector("#characterAmountLabel"),includeUppercaseElement=document.querySelector("#includeUppercase"),includeNumbersElement=document.querySelector("#includeNumbers"),includeSymbolsElement=document.querySelector("#includeSymbols"),passwordElement=document.querySelector("h3"),form=document.querySelector("form"),LOWERCASE_CHAR_CODES=arrayFromLowToHigh(97,122),UPPERCASE_CHAR_CODES=arrayFromLowToHigh(65,90),NUMBER_CHAR_CODES=arrayFromLowToHigh(48,57),SYMBOL_CHAR_CODES=arrayFromLowToHigh(33,47).concat(arrayFromLowToHigh(58,64)).concat(arrayFromLowToHigh(91,96)).concat(arrayFromLowToHigh(123,126)),switchTemplate=document.createElement("template");switchTemplate.innerHTML='\n  <div class="switch__inner-container">\n    <div class="switch__slider"></div>\n  </div>\n';class Switch extends HTMLElement{get checked(){return this.hasAttribute("checked")}set checked(e){e?this.setAttribute("checked","true"):this.removeAttribute("checked")}constructor(){super(),this.onclick=()=>{this.checked=!this.checked},this.appendChild(switchTemplate.content.cloneNode(!0))}}function generatePassword(){const e=characterAmountRangeElement.value,t=includeUppercaseElement.checked,n=includeNumbersElement.checked,c=includeSymbolsElement.checked;let o=LOWERCASE_CHAR_CODES;t&&(o=o.concat(UPPERCASE_CHAR_CODES)),n&&(o=o.concat(NUMBER_CHAR_CODES)),c&&(o=o.concat(SYMBOL_CHAR_CODES));let r="";for(let t=0;t<e;t++){const e=o[Math.floor(Math.random()*o.length)];r+=String.fromCharCode(e)}passwordElement.innerText=r}function arrayFromLowToHigh(e,t){const n=[];for(let c=e;c<=t;c++)n.push(c);return n}function syncLengthText(){characterAmountLabelElement.innerText=`Length: ${characterAmountRangeElement.value}`}function copy(e){const t=e.innerText;copyToClipboard(passwordElement.innerText)?e.innerText="Copied!":e.innerText="Failed to copy",setTimeout(()=>e.innerText=t,2e3)}function copyToClipboard(e){const t=document.createElement("textarea");t.style.position="fixed",t.style.opacity="0",t.value=e,document.body.appendChild(t),t.focus(),t.select();try{document.execCommand("copy")}catch(e){return alert("failed to copy text to clipboard"),document.body.removeChild(t),!1}return document.body.removeChild(t),!0}function getTheme(){const e=localStorage.getItem("theme")||"dark";return document.documentElement.setAttribute("data-theme",e),e}function toggleTheme(){let e=getTheme();e="light"===e?"dark":"light",document.documentElement.setAttribute("data-theme",e),"dark"===e?localStorage.removeItem("theme"):localStorage.setItem("theme",e)}customElements.define("app-switch",Switch),characterAmountRangeElement.addEventListener("input",syncLengthText),form.addEventListener("submit",e=>{e.preventDefault(),generatePassword()}),syncLengthText(),generatePassword(),getTheme();
