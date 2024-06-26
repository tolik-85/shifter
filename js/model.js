const model = {
  availaibleCoins: [],

  total: 0,

  coins: {
    btc: {
      val: 0,
      max: 0,
      price: 0,
      qty: 0,
    },
    eth: {
      val: 0,
      max: 0,
      price: 0,
      qty: 0,
    },
    xrp: {
      val: 0,
      max: 0,
      price: 0,
      qty: 0,
    },
    doge: {
      val: 0,
      max: 0,
      price: 0,
      qty: 0,
    },
  },

  async beforeAddObj(ctrl) {
    this.addObj(ctrl)
    await this.updatePrice(ctrl)
    if (this.getPrice(ctrl)) {
      return true
    } else {
      this.deleteObj(ctrl)
    }
  },

  addObj(ctrl) {
    this.coins[ctrl] = { val: 0, max: 0, price: 0, qty: 0 }
    this.calcMax()
    this.setValue(0, ctrl)
  },

  setAvailaibleCoins(availaibleCoins) {
    this.availaibleCoins = availaibleCoins
  },

  getAvailaibleCoins() {
    this.availaibleCoins = this.availaibleCoins
      .toString()
      .toLowerCase()
      .split(',')
    return this.availaibleCoins
  },

  setTotal(total) {
    this.total = total
    for (const ctrl in this.coins) {
      this.setMaxByCtrl(ctrl)
    }
    this.setValueToZeroForAllCoins()
    this.updateAllPrices()
    this.updateAllCoins().then(() => controller.handleDataListAvailaibleCoins())
  },

  setPrice(ctrl, price) {
    this.coins[ctrl].price = price
  },

  setCoins(coins) {
    this.coins = coins
  },

  setValue(val, ctrl) {
    this.coins[ctrl].val = this.checkVal(val, ctrl)
    this.calcMax()
  },

  setValueToZeroForAllCoins() {
    for (const ctrl in this.coins) {
      this.setValue(0, ctrl)
    }
  },

  setMaxByCtrl(ctrl) {
    this.coins[ctrl].max = this.total
  },

  getTotal() {
    return this.total
  },

  getValByCtrl(ctrl) {
    return this.coins[ctrl].val
  },

  getMaxByCtrl(ctrl) {
    return this.coins[ctrl].max
  },

  getQtyByCtrl(ctrl) {
    return this.coins[ctrl].qty
  },

  getAddedCoins() {
    return Object.keys(this.coins)
  },

  getPrice(ctrl) {
    return this.coins[ctrl].price
  },

  calcMax() {
    let sumValues = 0

    for (const key in this.coins) {
      sumValues += this.coins[key].val
    }

    for (const key in this.coins) {
      this.coins[key].max = this.total - sumValues + this.coins[key].val
    }
  },

  checkVal(val, ctrl) {
    if (val < 0) {
      return 0
    }
    if (val > this.coins[ctrl].max) {
      return this.coins[ctrl].max
    }
    return val
  },

  deleteObj(ctrl) {
    delete this.coins[ctrl]
    this.calcMax()
  },

  incrementVal(ctrl) {
    this.setValue(this.getValByCtrl(ctrl) + 1, ctrl)
  },

  decrementVal(ctrl) {
    this.setValue(this.getValByCtrl(ctrl) - 1, ctrl)
  },

  calcCoinsQantity(ctrl) {
    return (this.coins[ctrl].qty =
      this.coins[ctrl].val / this.coins[ctrl].price || 0)
  },

  async updatePrice(ctrl) {
    const price = await api.loadPriceByCtrl(ctrl)
    this.setPrice(ctrl, price)
  },

  async updateAllCoins() {
    const coinList = await api.loadCoinList()
    this.setAvailaibleCoins(coinList)
  },

  updateAllPrices() {
    for (const key in this.coins) {
      this.updatePrice(key)
    }
  },
}

// let result
// result = model.getTotal()
// result
// result = model.coins
// result
// result
// result = model.coins
// result

// model.setTotal(10)
// result = model.getTotal()
// model.setValue(5, 'btc')
// model.coins.btc.price = 3000
// model.coins.btc.val = 20000
// model.coins.btc.qty
// result = model.getCoinsQantity("btc")
// result
// result = model.coins
// result
// model.setValue(1, 'xrp')
// result = model.coins
// result
// model.setValue(3, 'doge')
// result = model.coins
// result
// model.setValue(11, 'eth')
// result = model.coins
// result
// model.setValue(-1, 'eth')
// result = model.coins
// result
// result = model.getValByCtrl('btc')
// result
