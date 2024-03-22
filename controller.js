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

function getPriceHandler() {
  priceHandler('btc')
  priceHandler('eth')
  priceHandler('xrp')
  priceHandler('doge')
}

async function priceHandler(ctrl) {
  await model.updatePrice(ctrl)
}

async function loadAllCoins() {
  await model.updateAllCoins()
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
  priceHandler(ctrl)
  handleUpdate()
}

function handleCloseBtn(ctrl) {
  model.deleteObj(ctrl)
  handleUpdate()
  renderBottomPaveRevome(ctrl)

  const elSelect = document.querySelector("select")
  const option = generateOption(ctrl)
  option.addEventListener("click", onOptionClickHandler)
  elSelect.prepend(option)
}

function handleIncrementVal(ctrl) {
  model.incrementVal(ctrl)
  handleUpdate()
}

function handleDecrementVal(ctrl) {
  model.decrementVal(ctrl)
  handleUpdate()
}
