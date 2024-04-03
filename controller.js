const controller = {
  handleChangeValue(val, ctrl) {
    val = Math.abs(parseInt(val)) || 0
    model.setValue(val, ctrl)
    this.handleUpdate()
  },

  handleInputSetTotalInput(val) {
    val = Math.abs(parseInt(val)) || 0
    view.renderSetTotalInput(val)
  },

  handleButtonSetTotal(val) {
    model.setTotal(+val)
    this.handleUpdate()
  },

  handleUpdate() {
    for (const key of model.getAddedCoins()) {
      view.renderShifter(
        key,
        model.getValByCtrl(key),
        model.getMaxByCtrl(key),
        model.calcCoinsQantity(key)
      )
    }
  },

  async handleNewShifter(ctrl) {
    if (Object.keys(model.coins).includes(ctrl)) {
      document.querySelector('#newshifter-add').value = ''
      view.renderElAddNewNoExchangeRemove()
      view.renderAddNewElCoinInListAdd(ctrl)
    } else {
      let isCorrect = await model.beforeAddObj(ctrl)
      if (isCorrect) {
        view.renderBottomPave(ctrl)
        this.handleUpdate()
        document.querySelector('#newshifter-add').value = ''
        view.renderElAddNewNoExchangeRemove()
        view.renderAddNewElCoinInListRemove()
      } else {
        view.renderAddNewElCoinInListRemove()
        view.renderAddNewElNoExchangeAdd(ctrl)
        document.querySelector('#newshifter-add').value = ''
      }
    }
  },

  handleCloseBtn(ctrl) {
    model.deleteObj(ctrl)
    this.handleUpdate()
    view.renderBottomPaveRevome(ctrl)
  },

  handlePlusMinusVal(ctrl, action) {
    if (action === 'plus') {
      model.incrementVal(ctrl)
    } else {
      model.decrementVal(ctrl)
    }
    this.handleUpdate()
  },

  handleDataListAvailaibleCoins() {
    const availaibleCoins = model.getAvailaibleCoins()
    view.renderDataList(availaibleCoins)
  },
}
