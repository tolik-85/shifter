function handleChangeValue(val, ctrl) {
  model.setValue(+val, ctrl)
  handleUpdate()
}

function handleSetTotal(val) {
  if (Number.isInteger(+val)) {
    renderElTotalInputSetClassIfTrue()
    model.setTotal(+val)
    handleUpdate()
  } else {
    renderElTotalInputSetClassIfFalse()
  }
}

function getPriceHandler() {
  priceHandler('btc')
  priceHandler('eth')
  priceHandler('xrp')
  priceHandler('doge')
}

async function priceHandler(ctrl) {
  await model.loadPrice(ctrl)
}

async function loadAllCoins() {
  await model.loadAllCoinsAPI()
}

function handleUpdate() {
  // console.log('getAddedCoins() :>> ', model.getAddedCoins())
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
  // console.log(model.coins[ctrl].price);

}

function handleCloseBtn(ctrl, shifter) {
  const elSelect = document.querySelector("select")
  shifter.remove()
  model.deleteObj(ctrl)
  // renderAllCoins(ctrl)
  const option = generateOption(ctrl)
  option.addEventListener("click", onOptionClickHandler)
  elSelect.prepend(option)
  handleUpdate()
}

function handleIncrementVal(ctrl) {
  model.incrementVal(ctrl)
  handleUpdate()
}

function handleDecrementVal(ctrl) {
  model.decrementVal(ctrl)
  handleUpdate()
}
