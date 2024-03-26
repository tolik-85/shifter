function handleChangeValue(val, ctrl) {
	model.setValue(+val, ctrl)
	handleUpdate()
}

function handleSetTotal(val) {
	if (Number.isInteger(+val) && +val > 0) {
		model.setTotal(+val)
		handleUpdate()
	} else {
		elTotalInput.value = 0
	}
}

function handleUpdate() {
	for (const key of model.getAddedCoins()) {
		renderShifter(
			key,
			model.getValByCtrl(key),
			model.getMaxByCtrl(key),
			model.calcCoinsQantity(key)
		)
	}
}

async function handleNewShifter(ctrl) {
	let isCorrect = await model.beforeAddObj(ctrl)
	if (isCorrect) {
		renderBottomPave(ctrl)
		handleUpdate()
	} else {
	}
}

function handleCloseBtn(ctrl) {
	model.deleteObj(ctrl)
	handleUpdate()
	renderBottomPaveRevome(ctrl)
}

function handleIncrementVal(ctrl) {
	model.incrementVal(ctrl)
	handleUpdate()
}

function handleDecrementVal(ctrl) {
	model.decrementVal(ctrl)
	handleUpdate()
}

function handleDataListAvailaibleCoins() {
	const availaibleCoins = model.getAvailaibleCoins()
	renderDataList(availaibleCoins)
}
