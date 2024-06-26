const view = {
  onLoaded() {
    view.renderButtonTotal()
    view.renderSetTotalInput('')
    view.renderAddNewShifter()
  },

  renderButtonTotal() {
    const elButtonTotal = document.querySelector('#btn_set_total')
    elButtonTotal.addEventListener('click', this.onClickButtonSetTotal)
  },

  renderSetTotalInput(val) {
    const elTotalInput = document.querySelector('#total_text')
    elTotalInput.value = val
    elTotalInput.addEventListener('input', this.onInputSetTotalInput)
    elTotalInput.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        view.onClickButtonSetTotal()
      }
    })
  },

  onInputSetTotalInput() {
    const elTotalInput = document.querySelector('#total_text')
    controller.handleInputSetTotalInput(elTotalInput.value)
  },

  onButtonMinusPlus(e) {
    const ctrl = e.target.getAttribute('ctrl')
    const action = e.target.getAttribute('action')
    controller.handlePlusMinusVal(ctrl, action)
  },

  onInputShifterInput(e) {
    const ctrl = e.target.getAttribute('ctrl')
    const val = e.target.value
    controller.handleChangeValue(val, ctrl)
  },

  onCloseBtnClick(e) {
    const ctrl = e.target.parentNode.getAttribute('ctrl')
    controller.handleCloseBtn(ctrl)
  },

  onClickNewShifterBtn() {
    let ctrl = document.querySelector('#newshifter-add').value
    controller.handleNewShifter(ctrl)
  },

  onClickButtonSetTotal() {
    const val = document.querySelector('#total_text').value
    controller.handleButtonSetTotal(val)
    view.renderFieldTextMaxValue()
  },

  renderShifter(ctrl, value, maximum, qty) {
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

    elInputText.addEventListener('input', this.onInputShifterInput)
    elRange.addEventListener('input', this.onInputShifterInput)
    buttonPlus.addEventListener('click', this.onButtonMinusPlus)
    buttonMinus.addEventListener('click', this.onButtonMinusPlus)
    closeBtn.addEventListener('click', this.onCloseBtnClick)

    elsProgress.forEach(el => {
      el.value = value
      el.max = maximum
    })
    elInputText.value = value
    elRange.max = maximum
    elRange.value = value
    elCoinsQty.innerHTML = qty.toFixed(5)
  },

  renderBottomPave(ctrl) {
    const parentCont = document.querySelector('.bottom')
    const beforeEl = document.querySelector('.addnew')
    const newShifter = this.generateShifter(ctrl)
    parentCont.insertBefore(newShifter, beforeEl)
  },

  renderBottomPaveRevome(ctrl) {
    const shifter = document.querySelector(`.shifter[ctrl="${ctrl}"]`)
    shifter.remove()
  },

  renderDataList(availaibleCoins) {
    const elDataList = document.querySelector('#newshifter')
    availaibleCoins.forEach(ctrl => {
      const elOption = this.generateOption(ctrl)
      elDataList.appendChild(elOption)
    })
  },

  renderAddNewShifter() {
    const elInputAddNewShifter = document.querySelector('#newshifter-add')
    const elButtonNewShifter = document.querySelector('.new-shifter')

    elInputAddNewShifter.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        view.onClickNewShifterBtn()
      }
    })
    elButtonNewShifter.addEventListener('click', view.onClickNewShifterBtn)
  },

  generateOption(ctrl) {
    const option = document.createElement('option')
    option.setAttribute('value', ctrl)
    option.innerHTML = `USD to ${ctrl.toUpperCase()}`
    return option
  },

  generateShifter(ctrl) {
    const elShifter = h('div', { class: 'shifter', ctrl: `${ctrl}` }, '', [
      h('div', { class: 'cl-btn-4' }, '', []),
      h(
        'label',
        { for: 'edit' + `${ctrl}` },
        'USD to ' + `${ctrl}`.toUpperCase(),
        []
      ),
      h('progress', { ctrl: `${ctrl}`, max: 0, value: 0 }, '', []),
      h('div', { class: 'row' }, '', [
        h('button', { ctrl: `${ctrl}`, action: 'minus' }, '<', []),
        h(
          'input',
          {
            type: 'text',
            ctrl: `${ctrl}`,
            name: 'edit-' + `${ctrl}`,
            id: 'edit-' + `${ctrl}`,
          },
          '',
          []
        ),
        h('button', { ctrl: `${ctrl}`, action: 'plus' }, '>', []),
      ]),
      h('progress', { ctrl: `${ctrl}`, max: 0, value: 0 }, '', []),
      h(
        'input',
        {
          type: 'range',
          ctrl: `${ctrl}`,
          name: `${ctrl}`,
          min: 0,
          max: 0,
          value: 0,
        },
        '',
        []
      ),
      h('div', { class: 'price' }, '', [
        h('span', { ctrl: `${ctrl}` }, '', []),
      ]),
    ])
    return elShifter
  },

  // generateShifter(ctrl) {
  //   const elShifter = document.createElement('div')
  //   const closeBtn = document.createElement('div')
  //   const label = document.createElement('label')
  //   const progress = document.createElement('progress')
  //   const row = document.createElement('div')
  //   const buttonMinus = document.createElement('button')
  //   const buttonPlus = document.createElement('button')
  //   const inputText = document.createElement('input')
  //   const progress2 = document.createElement('progress')
  //   const inputRange = document.createElement('input')
  //   const price = document.createElement('div')
  //   const span = document.createElement('span')

  //   elShifter.classList.add('shifter')
  //   elShifter.setAttribute('ctrl', ctrl)
  //   closeBtn.classList.add('cl-btn-4')
  //   label.setAttribute('for', `edit-` + ctrl)
  //   label.innerHTML = 'USD to ' + ctrl.toUpperCase()
  //   progress.setAttribute('ctrl', ctrl)
  //   progress.setAttribute('max', 0)
  //   progress.setAttribute('value', 0)
  //   row.classList.add('row')
  //   buttonMinus.setAttribute('ctrl', ctrl)
  //   buttonMinus.setAttribute('action', 'minus')
  //   buttonMinus.innerHTML = '&lt;'
  //   buttonPlus.setAttribute('ctrl', ctrl)
  //   buttonPlus.setAttribute('action', 'plus')
  //   buttonPlus.innerHTML = '&gt;'
  //   inputText.setAttribute('type', 'text')
  //   inputText.setAttribute('ctrl', ctrl)
  //   inputText.setAttribute('name', `edit-` + ctrl)
  //   inputText.setAttribute('id', `edit-` + ctrl)
  //   progress2.setAttribute('ctrl', ctrl)
  //   progress2.setAttribute('max', 0)
  //   progress2.setAttribute('value', 0)
  //   inputRange.setAttribute('type', 'range')
  //   inputRange.setAttribute('ctrl', ctrl)
  //   inputRange.setAttribute('name', ctrl)
  //   inputRange.setAttribute('min', 0)
  //   inputRange.setAttribute('max', 0)
  //   inputRange.setAttribute('value', 0)
  //   price.classList.add('price')
  //   span.setAttribute('ctrl', ctrl)
  //   elShifter.appendChild(closeBtn)
  //   elShifter.appendChild(label)
  //   elShifter.appendChild(progress)
  //   row.appendChild(buttonMinus)
  //   row.appendChild(inputText)
  //   row.appendChild(buttonPlus)
  //   price.appendChild(span)
  //   elShifter.appendChild(row)
  //   elShifter.appendChild(progress2)
  //   elShifter.appendChild(inputRange)
  //   elShifter.appendChild(price)

  //   return elShifter
  // },

  renderFieldTextMaxValue() {
    const elLabel = document.querySelector('.field_text>label')
    elLabel.innerHTML = `USD Max Value set to ${model.total}`
  },

  generateNoExchage(ctrl) {
    const elNoCourse = document.createElement('div')
    const elSpan = document.createElement('span')
    elSpan.innerHTML = `no exchange course for ${ctrl} coin`
    elNoCourse.classList.add('no-course')
    elNoCourse.appendChild(elSpan)
    return elNoCourse
  },

  renderAddNewElNoExchangeAdd(ctrl) {
    const elAddNew = document.querySelector('.addnew')
    const elnoCourse = this.generateNoExchage(ctrl)
    elAddNew.appendChild(elnoCourse)
  },

  renderElAddNewNoExchangeRemove() {
    if (document.querySelector('.no-course')) {
      document.querySelector('.no-course').remove()
    }
  },

  renderElAddNewElCoinInListRemove() {
    if (document.querySelector('.no-course')) {
      document.querySelector('.no-course').remove()
    }
  },

  generateCoinInList(ctrl) {
    const elInList = document.createElement('div')
    const elSpan = document.createElement('span')
    elSpan.innerHTML = `coin ${ctrl} already add to list`
    elInList.classList.add('no-course')
    elInList.appendChild(elSpan)
    return elInList
  },

  renderAddNewElCoinInListAdd(ctrl) {
    const elAddNew = document.querySelector('.addnew')
    const elInList = this.generateCoinInList(ctrl)
    elAddNew.appendChild(elInList)
  },

  renderAddNewElCoinInListRemove() {
    if (document.querySelector('.no-course')) {
      document.querySelector('.no-course').remove()
    }
  },
}

document.addEventListener('DOMContentLoaded', view.onLoaded)
