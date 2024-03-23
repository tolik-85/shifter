function handleChangeValue(val, ctrl) {
  model.setValue(+val, ctrl)
  handleUpdate()
}

function handleSetTotal(val) {
  if (Number.isInteger(+val) && +val > 0) {
    model.setTotal(+val)
    handleUpdate()
  } else {
    ElTotalInput.value = 0
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

function handleNewShifter(ctrl) {
  renderBottomPave(ctrl)
  model.addObj(ctrl)
  model.setValue(0, ctrl)
  model.updatePrice(ctrl)
  handleUpdate()
}

function handleCloseBtn(ctrl) {
  console.log(ctrl);
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

