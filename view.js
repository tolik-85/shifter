const elButtonTotal = document.querySelector('#btn_set_total')
const elShifters = document.querySelectorAll('.shifter')
const elButtonNewShifter = document.querySelector('.new-shifter')
const elsClosebtn = document.querySelectorAll('.cl-btn-4')
const elsButtonsPlus = document.querySelectorAll(`button[action="plus"]`)
const elsButtonsMinus = document.querySelectorAll(`button[action="minus"]`)
const elTotalInput = document.querySelector('#total_text')
const elCoins = document.querySelector('.coins')
const shifterInputEls = document.querySelectorAll('.row>input[type=text]')
const elDataList = document.querySelector('#newshifter')
const elInputAddNewShifter = document.querySelector('#newshifter-add')

function renderDataList(availaibleCoins) {
	availaibleCoins.forEach(ctrl => {
		const elOption = generateOption(ctrl)
		elDataList.appendChild(elOption)
	})
}

function generateOption(ctrl) {
	const option = document.createElement('option')
	option.setAttribute('value', ctrl)
	option.innerHTML = `USD to ${ctrl.toUpperCase()}`
	return option
}

shifterInputEls.forEach(el => {
	el.addEventListener('input', shifterInputSetValueHandler)
})

function shifterInputSetValueHandler(e) {
	let inputValue = e.target.value

	if (inputValue > 0) {
		inputValue = 0
	}
	if (!Number.isInteger(inputValue)) {
		inputValue = 0
	}
	if (!typeof +inputValue === 'number') {
		inputValue = 0
	}
}

elsButtonsPlus.forEach(btnPlus => {
	btnPlus.addEventListener('click', onBtnPlusClickHandler)
})
elsButtonsMinus.forEach(btnPlus => {
	btnPlus.addEventListener('click', onClickBtnMinusHandler)
})

function onBtnPlusClickHandler(e) {
	const ctrl = e.target.getAttribute('ctrl')
	handleIncrementVal(ctrl)
	handleUpdate()
}

function onClickBtnMinusHandler(e) {
	const ctrl = e.target.getAttribute('ctrl')

	handleDecrementVal(ctrl)
	handleUpdate()
}

elTotalInput.addEventListener('keyup', function (e) {
	if (e.key === 'Enter') {
		onClickButtonSetTotal()
	}
})
elButtonTotal.addEventListener('click', onClickButtonSetTotal)

function onCloseBtnClickHandler(e) {
	const ctrl = e.target.parentNode.getAttribute('ctrl')
	handleCloseBtn(ctrl)
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

elInputAddNewShifter.addEventListener('keyup', function (e) {
	if (e.key === 'Enter') {
		onClickNewShifterBtn()
	}
})
elButtonNewShifter.addEventListener('click', onClickNewShifterBtn)

function onClickNewShifterBtn() {
	let ctrl = document.querySelector('#newshifter-add').value
	if (Object.keys(model.coins).includes(ctrl)) {
		document.querySelector('#newshifter-add').value = ''
	} else {
		handleNewShifter(ctrl)
		document.querySelector('#newshifter-add').value = ''
	}
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
	let val = e.target.value
	if (Number.isInteger(+val)) {
		handleChangeValue(val, ctrl)
	} else {
		val = 0
		e.target.value = 0
		handleChangeValue(val, ctrl)
	}
}

function onClickButtonSetTotal() {
	const val = document.querySelector('#total_text').value
	handleSetTotal(val)
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

	buttonMinus.addEventListener('click', onClickBtnMinusHandler)
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

function renderBottomPaveRevome(ctrl) {
	const shifter = document.querySelector(`.shifter[ctrl="${ctrl}"]`)
	shifter.remove()
}
