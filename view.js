document.addEventListener('DOMContentLoaded', onLoaded)

function onLoaded() {
  renderButtonTotal()
  renderSetTotalInput('')
  renderAddNewShifter()
}

function onInputSetTotalInput() {
  const elTotalInput = document.querySelector('#total_text')
  handleInputSetTotalInput(elTotalInput.value)
}

function renderButtonTotal() {
  const elButtonTotal = document.querySelector('#btn_set_total')
  elButtonTotal.addEventListener('click', onClickButtonSetTotal)
}

function renderSetTotalInput(val) {
  const elTotalInput = document.querySelector('#total_text')
  elTotalInput.value = val
  elTotalInput.addEventListener('input', onInputSetTotalInput)
  elTotalInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      onClickButtonSetTotal()
    }
  })
}

function onButtonMinusPlus(e) {
  const ctrl = e.target.getAttribute('ctrl')
  const action = e.target.getAttribute('action')
  handlePlusMinusVal(ctrl, action)
}

function onInputShifterInput(e) {
  const ctrl = e.target.getAttribute('ctrl')
  const val = e.target.value
  handleChangeValue(val, ctrl)
}

function onCloseBtnClick(e) {
  const ctrl = e.target.parentNode.getAttribute('ctrl')
  handleCloseBtn(ctrl)
}

function onClickNewShifterBtn() {
  let ctrl = document.querySelector('#newshifter-add').value
  handleNewShifter(ctrl)
}

function onClickButtonSetTotal() {
  const val = document.querySelector('#total_text').value
  handleButtonSetTotal(val)
}

function renderShifter(ctrl, value, maximum, qty) {
  const elShifter = document.querySelector(`.shifter[ctrl='${ctrl}']`)
  const elsProgress = elShifter.querySelectorAll('progress')
  const elCoinsQty = elShifter.querySelector(`span[ctrl='${ctrl}']`)
  const elInputText = elShifter.querySelector('input[type=text]')
  const elRange = elShifter.querySelector('input[type=range]')
  const buttonPlus = elShifter.querySelector(
    `button[ctrl='${ctrl}'][action="plus"]`
  )
  const buttonMinus = elShifter.querySelector(
    `button[ctrl='${ctrl}'][action="minus"]`
  )
  const closeBtn = elShifter.querySelector(`.cl-btn-4`)

  elInputText.addEventListener('input', onInputShifterInput)
  elRange.addEventListener('input', onInputShifterInput)
  buttonPlus.addEventListener('click', onButtonMinusPlus)
  buttonMinus.addEventListener('click', onButtonMinusPlus)
  closeBtn.addEventListener('click', onCloseBtnClick)

  elsProgress.forEach(el => {
    el.value = value
    el.max = maximum
  })
  elInputText.value = value
  elRange.max = maximum
  elRange.value = value
  elCoinsQty.innerHTML = qty.toFixed(5)
}

function renderBottomPave(ctrl) {
  const parentCont = document.querySelector('.bottom')
  const beforeEl = document.querySelector('.addnew')
  const newShifter = generateShifter(ctrl)
  parentCont.insertBefore(newShifter, beforeEl)
}

function renderBottomPaveRevome(ctrl) {
  const shifter = document.querySelector(`.shifter[ctrl="${ctrl}"]`)
  shifter.remove()
}

function renderDataList(availaibleCoins) {
  const elDataList = document.querySelector('#newshifter')
  availaibleCoins.forEach(ctrl => {
    const elOption = generateOption(ctrl)
    elDataList.appendChild(elOption)
  })
}

function renderAddNewShifter() {
  const elInputAddNewShifter = document.querySelector('#newshifter-add')
  const elButtonNewShifter = document.querySelector('.new-shifter')

  elInputAddNewShifter.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      onClickNewShifterBtn()
    }
  })
  elButtonNewShifter.addEventListener('click', onClickNewShifterBtn)
}

function generateOption(ctrl) {
  const option = document.createElement('option')
  option.setAttribute('value', ctrl)
  option.innerHTML = `USD to ${ctrl.toUpperCase()}`
  return option
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

  return elShifter
}
