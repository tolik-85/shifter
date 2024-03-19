const API_URL = 'https://min-api.cryptocompare.com/data'
const API_KEY =
  'd10a17b6d7e0e81bb47b9604dc5d0fb0602e1ba35da24d1c42c46833b93afd4b'

async function loadPriceByCtrl(ctrl) {
  const resp = await fetch(
    `${API_URL}/price?fsym=${ctrl}&tsyms=USD&api_key=${API_KEY}`
  )
  const json = await resp.json()
  model.setPrice(`${ctrl}`, json.USD)
}

async function loadCoinList() {
  const resp = await fetch(`${API_URL}/blockchain/list?api_key=${API_KEY}`)
  const json = await resp.json()
  model.setAvailaibleCoins(Object.keys(json.Data))
}
