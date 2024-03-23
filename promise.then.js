

async function methodName () {
  let result = await afn()
  console.log(result)
  console.log(typeof result)
}

async function afn () {
  const n = await Promise.resolve(33)
  const m = await Promise.resolve(9)
  return n + m
}

function fn () {
  Promise.resolve()
  .then(() => {
    return 33
  })
  .then((n) => {
    return {m: 9, n}
  })
  .then((o) => {
    console.log('m: ', o.n + o.m)
  })
}

fn ()

// let result = await afn()
// console.log(result)




