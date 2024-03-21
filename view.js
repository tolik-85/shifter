const elButtonTotal = document.querySelector('#btn_set_total')
const elShifters = document.querySelectorAll('.shifter')
const elButtonNewShifter = document.querySelector('.new-shifter')
const elsClosebtn = document.querySelectorAll('.cl-btn-4')
const ElsButtonsPlus = document.querySelectorAll(`button[action="plus"]`)
const ElsButtonsMinus = document.querySelectorAll(`button[action="minus"]`)
const ElTotalInput = document.querySelector('#total_text')
const ElCoins = document.querySelector('.coins')
const shifterInputEls = document.querySelectorAll('.row>input[type=text]')
const viewAllCoinsBtn = document.querySelector('.viewall')
const elAllCoins = document.querySelector(".allcoins")

viewAllCoinsBtn.addEventListener('click', onViewAllCoinsBtnHandler)


function onOptionClickHandler(e) {
  const ctrl = e.target.getAttribute('ctrl')
  e.target.remove()
  handleNewShifter(ctrl)
}

function onViewAllCoinsBtnHandler(e) {
  // createAllButtns()
  e.target.remove()
  renderSelect()

}

function onCoinBtnclickHandler(e) {
  const ctrl = e.target.getAttribute('ctrl')
  e.target.remove()
  handleNewShifter(ctrl)
}

async function createAllButtns() {
  await loadAllCoins()
  model.getAvailaibleCoins().forEach(el => {
    let ctrl = el
    renderAllCoins(ctrl)
  })
}

async function renderSelect() {
  await loadAllCoins()
  const select = document.createElement("select")
  model.getAvailaibleCoins().forEach(el => {
    let ctrl = el
    const option = generateOption(ctrl)
    option.addEventListener("click", onOptionClickHandler)
    select.appendChild(option)
  })
  elAllCoins.appendChild(select)
}

function generateOption(ctrl) {
  const option = document.createElement("option")
  option.setAttribute('ctrl', ctrl)
  option.innerHTML = `USD to ${ctrl}`
  return option

}

function generateCoinBtn(ctrl) {
  const coinBtn = document.createElement('button')
  coinBtn.classList.add(`coin`)
  coinBtn.setAttribute('ctrl', ctrl)
  coinBtn.innerHTML = `USD to ${ctrl}`
  coinBtn.addEventListener('click', onCoinBtnclickHandler)
  return coinBtn
}

function renderAllCoins(ctrl) {
  const coinBtn = generateCoinBtn(ctrl)
  ElCoins.prepend(coinBtn)
}

shifterInputEls.forEach(el => {
  el.addEventListener('input', shifterInputSetValueHandler)
})

function shifterInputSetValueHandler(e) {
  const shifter = e.target.parentNode.parentNode
  const inputValue = e.target.value

  if (!Number.isInteger(+inputValue)) {
    shifter.style.setProperty('--clr-master', '#ff0000')
    shifter.style.setProperty('--clr-slave', '#f53786')
    shifter.classList.add('shake')
    handleUpdate()
    setTimeout(() => {
      shifter.style.setProperty('--clr-master', '#00c3ff')
      shifter.style.setProperty('--clr-slave', '#3dd2ff')
      shifter.classList.remove('shake')
      handleUpdate()
    }, 1000)
  }
}

function renderShifterIfInputFalse() { }

function renderElTotalInputSetClassIfFalse() {
  ElTotalInput.classList.add('false')
  ElTotalInput.classList.add('shake')

  setTimeout(() => {
    ElTotalInput.classList.remove('shake')
  }, 1000)
}

function renderElTotalInputSetClassIfTrue() {
  ElTotalInput.classList.remove('false')
  ElTotalInput.classList.add('true')
}

ElsButtonsPlus.forEach(btnPlus => {
  btnPlus.addEventListener('click', onBtnPlusClickHandler)
})
ElsButtonsMinus.forEach(btnPlus => {
  btnPlus.addEventListener('click', onBtnMinusClickHandler)
})

function onBtnPlusClickHandler(e) {
  const ctrl = e.target.getAttribute('ctrl')
  const val = e.target.parentNode.querySelector('input[type=text]').value
  handleIncrementVal(ctrl)
  handleUpdate()
}

function onBtnMinusClickHandler(e) {
  const ctrl = e.target.getAttribute('ctrl')
  const val = e.target.parentNode.querySelector('input[type=text]').value

  handleDecrementVal(ctrl)
  handleUpdate()
}
elButtonTotal.addEventListener('click', onClickButtonSetTotal)

function onCloseBtnClickHandler(e) {
  const ctrl = e.target.parentNode.getAttribute('ctrl')
  const shifter = e.target.parentNode
  handleCloseBtn(ctrl, shifter)
}

elsClosebtn.forEach(elCloseBtn => {
  elCloseBtn.addEventListener('click', onCloseBtnClickHandler)
})

elShifters.forEach(elShifter => {
  elShifter
    .querySelector("input[type='range']")
    .addEventListener('input', onChangeInput)
  elShifter
    .querySelector("input[type='text']")
    .addEventListener('input', onChangeInput)
})

elButtonNewShifter.addEventListener('click', onNewShifterBtnClick)

function onNewShifterBtnClick() {
  let ctrl = document.querySelector('.addnew').querySelector('input').value
  handleNewShifter(ctrl)
  document.querySelector('.addnew').querySelector('input').value = ''
}

function renderShifter(ctrl, value, maximum, qty) {


  const elShifter = document.querySelector(`.shifter[ctrl='${ctrl}']`)

  const elInputText = elShifter.querySelector('input[type=text]')
  const elRange = elShifter.querySelector('input[type=range]')
  const elsProgress = elShifter.querySelectorAll('progress')
  const elCoinsQty = elShifter.querySelector(`span[ctrl='${ctrl}']`)
  elsProgress.forEach(el => {
    el.value = value
    el.max = maximum
  })
  elInputText.value = value
  elRange.max = maximum
  elRange.value = value
  elCoinsQty.innerHTML = qty.toFixed(5)
}

function onChangeInput(e) {
  const ctrl = e.target.getAttribute('ctrl')
  const val = e.target.value

  handleChangeValue(val, ctrl)
}

function onClickButtonSetTotal() {
  const val = document.querySelector('#total_text').value
  handleSetTotal(val)
  getPriceHandler()
}

function generateShifter(ctrl) {
  const elShifter = document.createElement('div')
  const closeBtn = document.createElement('div')
  const label = document.createElement('label')
  const progress = document.createElement('progress')
  const row = document.createElement('div')
  const buttonMinus = document.createElement('button')
  const buttonPlus = document.createElement('button')
  const inputText = document.createElement('input')
  const progress2 = document.createElement('progress')
  const inputRange = document.createElement('input')
  const price = document.createElement('div')
  const span = document.createElement('span')

  elShifter.classList.add('shifter')
  elShifter.setAttribute('ctrl', ctrl)
  closeBtn.classList.add('cl-btn-4')
  label.setAttribute('for', `edit-` + ctrl)
  label.innerHTML = 'USD to ' + ctrl.toUpperCase()
  progress.setAttribute('ctrl', ctrl)
  progress.setAttribute('max', 0)
  progress.setAttribute('value', 0)
  row.classList.add('row')
  buttonMinus.setAttribute('ctrl', ctrl)
  buttonMinus.setAttribute('action', 'minus')
  buttonMinus.innerHTML = '&lt;'
  buttonPlus.setAttribute('ctrl', ctrl)
  buttonPlus.setAttribute('action', 'plus')
  buttonPlus.innerHTML = '&gt;'
  inputText.setAttribute('type', 'text')
  inputText.setAttribute('ctrl', ctrl)
  inputText.setAttribute('name', `edit-` + ctrl)
  inputText.setAttribute('id', `edit-` + ctrl)
  progress2.setAttribute('ctrl', ctrl)
  progress2.setAttribute('max', 0)
  progress2.setAttribute('value', 0)
  inputRange.setAttribute('type', 'range')
  inputRange.setAttribute('ctrl', ctrl)
  inputRange.setAttribute('name', ctrl)
  inputRange.setAttribute('min', 0)
  inputRange.setAttribute('max', 0)
  inputRange.setAttribute('value', 0)
  price.classList.add('price')
  span.setAttribute('ctrl', ctrl)
  // span.innerHTML = model.getQtyByCtrl(ctrl)

  elShifter.appendChild(closeBtn)
  elShifter.appendChild(label)
  elShifter.appendChild(progress)
  row.appendChild(buttonMinus)
  row.appendChild(inputText)
  row.appendChild(buttonPlus)
  price.appendChild(span)
  elShifter.appendChild(row)
  elShifter.appendChild(progress2)
  elShifter.appendChild(inputRange)
  elShifter.appendChild(price)

  buttonMinus.addEventListener('click', onBtnMinusClickHandler)
  buttonPlus.addEventListener('click', onBtnPlusClickHandler)
  closeBtn.addEventListener('click', onCloseBtnClickHandler)
  inputText.addEventListener('input', onChangeInput)
  inputText.addEventListener('input', shifterInputSetValueHandler)
  inputRange.addEventListener('input', onChangeInput)

  return elShifter
}

function renderBottomPave(ctrl) {
  const parentCont = document.querySelector('.bottom')
  const beforeEl = document.querySelector('.addnew')
  const newShifter = generateShifter(ctrl)
  parentCont.insertBefore(newShifter, beforeEl)
}
