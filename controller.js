function handleChangeValue(val, ctrl) {
  val = parseInt(val) || 0
  model.setValue(val, ctrl)
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
  }
}

function handleCloseBtn(ctrl) {
  model.deleteObj(ctrl)
  handleUpdate()
  renderBottomPaveRevome(ctrl)
}

function handlePlusMinusVal(ctrl, action) {
  if (action === 'plus') {
    model.incrementVal(ctrl)
  } else {
    model.decrementVal(ctrl)
  }
  handleUpdate()
}

function handleDataListAvailaibleCoins() {
  const availaibleCoins = model.getAvailaibleCoins()
  renderDataList(availaibleCoins)
}
