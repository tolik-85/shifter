const elButtonTotal = document.querySelector('#btn_set_total')
const elShifters = document.querySelectorAll('.shifter')
const elButtonNewShifter = document.querySelector('.new-shifter')
const elsClosebtn = document.querySelectorAll('.cl-btn-4')
const elsButtonsPlus = document.querySelectorAll(`button[action="plus"]`)
const elsButtonsMinus = document.querySelectorAll(`button[action="minus"]`)
const elsButtonMinusPlus = document.querySelectorAll('.shifter button')
const elTotalInput = document.querySelector('#total_text')
const elCoins = document.querySelector('.coins')
const shifterInputEls = document.querySelectorAll('.row>input[type=text]')
const elDataList = document.querySelector('#newshifter')
const elInputAddNewShifter = document.querySelector('#newshifter-add')

function onButtonMinusPlus(e) {
	const ctrl = e.target.getAttribute('ctrl')
	const action = e.target.getAttribute('action')
	handlePlusMinusVal(ctrl, action)
}

function onChangeInput(e) {
	const ctrl = e.target.getAttribute('ctrl')
	const val = e.target.value
	handleChangeValue(val, ctrl)
}

function onCloseBtnClick(e) {
	const ctrl = e.target.parentNode.getAttribute('ctrl')
	handleCloseBtn(ctrl)
}

// переделать эту функцию, все проверки в контроллере

function onClickNewShifterBtn() {
	let ctrl = document.querySelector('#newshifter-add').value
	handleNewShifter(ctrl)
	// 	if (Object.keys(model.coins).includes(ctrl)) {
	// 		document.querySelector('#newshifter-add').value = ''
	// 	} else {
	// 		handleNewShifter(ctrl)
	// 		document.querySelector('#newshifter-add').value = ''
	// 	}
}

function onClickButtonSetTotal() {
	const val = document.querySelector('#total_text').value
	handleSetTotal(val)
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
	availaibleCoins.forEach(ctrl => {
		const elOption = generateOption(ctrl)
		elDataList.appendChild(elOption)
	})
}

elsButtonMinusPlus.forEach(elem =>
	elem.addEventListener('click', onButtonMinusPlus)
)

elsClosebtn.forEach(elCloseBtn => {
	elCloseBtn.addEventListener('click', onCloseBtnClick)
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

elTotalInput.addEventListener('keyup', function (e) {
	if (e.key === 'Enter') {
		onClickButtonSetTotal()
	}
})
elButtonTotal.addEventListener('click', onClickButtonSetTotal)

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

	inputText.addEventListener('input', onChangeInput)
	inputRange.addEventListener('input', onChangeInput)
	buttonPlus.addEventListener('click', onButtonMinusPlus)
	buttonMinus.addEventListener('click', onButtonMinusPlus)
	closeBtn.addEventListener('click', onCloseBtnClick)

	return elShifter
}
