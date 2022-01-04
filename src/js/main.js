let $increaseTextBtn
let $decreaseTextBtn
let $contrastYellowOnBlackBtn
let $linksUnderlineBtn
let $resetBtn
let $htmlElement
let $bodyElement

const main = () => {
	documentDOMObiects()
	listenerDOMObiects()
}

const documentDOMObiects = () => {
    $increaseTextBtn = document.querySelector('.accessabiliti-panel__increase-text')
    $decreaseTextBtn = document.querySelector('.accessabiliti-panel__decrease-text')
    $contrastYellowOnBlackBtn = document.querySelector('.accessabiliti-panel__contrast-yonb')
    $linksUnderlineBtn = document.querySelector('.accessabiliti-panel__links-underline')
    $resetBtn = document.querySelector('.accessabiliti-panel__reset')
    $htmlElement = document.querySelector('html')
    $bodyElement = document.querySelector('body')
}

const listenerDOMObiects = () => {
    $increaseTextBtn.addEventListener('click', increaseText)
    $decreaseTextBtn.addEventListener('click', decreaseText)
    $contrastYellowOnBlackBtn.addEventListener('click', contrastYellowOnBlack)
    $linksUnderlineBtn.addEventListener('click', linksUnderline)
    $resetBtn.addEventListener('click', resetAccessability)
}

const currentFontSize = () => {
    const currentSize = getComputedStyle($htmlElement).fontSize
    return parseInt( currentSize.replace( "px", "" ))
}

const increaseText = () => {
    let newFontSize = currentFontSize()
    newFontSize+=3
    if(newFontSize <= 19){
        $htmlElement.style.fontSize = newFontSize + "px"
    }
}

const decreaseText = () => {
    let newFontSize = currentFontSize()
    newFontSize-=3
    if(newFontSize >= 10){
        $htmlElement.style.fontSize = newFontSize + "px"
    }
}

const contrastYellowOnBlack = () => {
    $bodyElement.classList.toggle('yellowonblack')
}

const linksUnderline = () => {
    $bodyElement.classList.toggle('links-underline')
}

const resetAccessability = () => {
    $htmlElement.style.fontSize = 10 + "px"
    if($bodyElement.classList.contains('yellowonblack')) {
        $bodyElement.classList.remove('yellowonblack')
    }
    if($bodyElement.classList.contains('links-underline')) {
        $bodyElement.classList.remove('links-underline')
    }
}

document.addEventListener('DOMContentLoaded', main)