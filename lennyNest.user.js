// ==UserScript==
// @name         Lenny Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  lenny be lenny
// @author       argony
// @match        *://www.hejto.pl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hejto.pl
// ==/UserScript==

const lenniesToUse = ["( ͡° ͜ʖ ͡°)", "( ͡° ل͜ ͡°)", "( ‾ʖ̫‾)", "(✿◠‿◠)", "¯\\_( ͡° ͜ʖ ͡°)_/¯", "(⩺_⩹)", "ʕ◉ᴥ◉ʔ", "༼つ ◕_◕ ༽つ", "(⊙＿⊙)", "（πーπ", "¯\\_(ツ)_/¯", "( ͡ʘ ͜ʖ ͡ʘ)"]

let addLennyFn = function () {
                    if (document.querySelector("div form div div button:first-of-type") !== null) {
                        clearInterval(lennyPoller);
                        addLenny();
                    }
                };

let lennyPoller = setInterval(addLennyFn, 50);

let oldHref = document.location.href;

window.onload = function() {
    let bodyList = document.querySelector("body")
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (oldHref != document.location.href) {
                oldHref = document.location.href;
                 lennyPoller = setInterval(addLennyFn, 50);
            }
        });
    });
    let config = {
        childList: true,
        subtree: true
    };
    observer.observe(bodyList, config);
};


function putLenny(formEl) {
                    const textArea = formEl.querySelector("textArea");
                    textArea.value = textArea.value;
                };

function addLenny() {
     const formEl = document.querySelectorAll("div form");
     formEl.forEach((formEl) => {
         const buttonEl = formEl.querySelector("div div button:first-of-type");
         buttonEl.addEventListener('click', function(){
             let poller = setInterval(function () {
                 if (document.querySelector(".emoji-mart-scroll") !== null) {
                     clearInterval(poller);
                     const handlerEl = document.querySelector(".emoji-mart-scroll");
                     handlerEl.insertAdjacentHTML("afterbegin", createLennyMenu());

                     const lennyMenu = document.querySelector(".lennyMenu");
                     for(const lenny of lenniesToUse){
                         let newLi = document.createElement('li');
                         newLi.innerHTML = createLennySymbol(lenny);
                         lennyMenu.appendChild(newLi);
                         document.getElementById(lenny).addEventListener (
                             "click", ButtonClickAction.bind(null, formEl, lenny), false
                         );
                     }
                 }
             }, 50);
         });
     });
}

function createLennyMenu() {
    return `
<section class="emoji-mart-category" aria-label="LENNYFTW">
   <div data-name="Activities" class="emoji-mart-category-label">
      <span aria-hidden="true">Lenny</span>
      <ul class="emoji-mart-category-list lennyMenu" id="lenny-container" style="display: table; list-style: none;">
      </ul>
   </div>
</section>
`};

function createLennySymbol(ar) {
    return `
      <li>
         <button aria-label="${ar}" type="button" id="${ar}">
            <span style="display: inline-block;">
               ${ar}
            </span>
         </button>
      </li>
`};

function ButtonClickAction (formEl, lenny) {
    const textAreaEl = formEl.querySelector("textarea");
    const textValue = textAreaEl.value + " " + lenny;

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
    nativeInputValueSetter.call(textAreaEl, textValue);

    const ev2 = new Event('input', { bubbles: true});
    textAreaEl.dispatchEvent(ev2);
};
