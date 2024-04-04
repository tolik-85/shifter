const API_URL = 'https://min-api.cryptocompare.com/data'
const API_KEY =
  'd10a17b6d7e0e81bb47b9604dc5d0fb0602e1ba35da24d1c42c46833b93afd4b'

const api = {
  async loadPriceByCtrl(ctrl) {
    const resp = await fetch(
      `${API_URL}/price?fsym=${ctrl}&tsyms=USD&api_key=${API_KEY}`
    )
    const json = await resp.json()
    return json.USD
  },

  async loadCoinList() {
    const resp = await fetch(`${API_URL}/blockchain/list?api_key=${API_KEY}`)
    const json = await resp.json()
    return Object.keys(json.Data).map(d => d.toLowerCase())
  },
}
