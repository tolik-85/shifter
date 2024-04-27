function isWhole(val) {
  return val % 1 === 0
}

// HYPERSRCIPT
function h(tagName, attrs, text, childrens, listener) {
  const el = document.createElement(tagName)

  for (const key in attrs) {
    el.setAttribute(key, attrs[key])
  }

  el.textContent = text
  console.log(tagName, childrens)
  childrens?.forEach(children => el.appendChild(children))

  listener && addEventListener('click', listener)
  return el
}

function generateElShifter(ctrl) {
  const elShifter = h('div', { class: 'shifter', ctrl: `${ctrl}` }, '', [
    h('div', { class: 'cl-btn-4' }, '', []),
    h(
      'label',
      { for: 'edit' + `${ctrl}` },
      'USD to ' + `${ctrl}`.toUpperCase(),
      []
    ),
    h('progress', { ctrl: `${ctrl}`, max: 0, value: 0 }, '', []),
    h('div', { class: 'row' }, '', [
      h('button', { ctrl: `${ctrl}`, action: 'minus' }, '&lt;', []),
      h(
        'input',
        {
          type: 'text',
          ctrl: `${ctrl}`,
          name: 'edit-' + `${ctrl}`,
          id: 'edit-' + `${ctrl}`,
        },
        '',
        []
      ),
      h('button', { ctrl: `${ctrl}`, action: 'plus' }, '&gt;', []),
    ]),
    h('progress', { ctrl: `${ctrl}`, max: 0, value: 0 }, '', []),
    h(
      'input',
      {
        type: 'range',
        ctrl: `${ctrl}`,
        name: `${ctrl}`,
        min: 0,
        max: 0,
        value: 0,
      },
      '',
      []
    ),
    h('div', { class: 'price' }, '', [h('span', { ctrl: `${ctrl}` }, '', [])]),
  ])
  return elShifter
}

// const elShifter = h('div', { class: 'shifter', ctrl: `${ctrl}` }, '', [
//   h('div', { class: 'cl-btn-4' }, '', []),
//   h(
//     'label',
//     { for: 'edit' + `${ctrl}` },
//     'USD to ' + `${ctrl}`.toUpperCase(),
//     []
//   ),
//   h('progress', { ctrl: `${ctrl}`, max: 0, value: 0 }, '', []),
//   h('div', { class: 'row' }, '', [
//     h('button', { ctrl: `${ctrl}`, action: 'minus' }, '&lt;', []),
//     h(
//       'input',
//       {
//         type: 'text',
//         ctrl: `${ctrl}`,
//         name: 'edit-' + `${ctrl}`,
//         id: 'edit-' + `${ctrl}`,
//       },
//       '',
//       []
//     ),
//     h('button', { ctrl: `${ctrl}`, action: 'plus' }, '&gt;', []),
//   ]),
//   h('progress', { ctrl: `${ctrl}`, max: 0, value: 0 }, '', []),
//   h(
//     'input',
//     {
//       type: 'range',
//       ctrl: `${ctrl}`,
//       name: `${ctrl}`,
//       min: 0,
//       max: 0,
//       value: 0,
//     },
//     '',
//     []
//   ),
//   h('div', { class: 'price' }, '', [h('span', { ctrl: `${ctrl}` }, '', [])]),
// ])

// const elH1 = h('h1', { class: 'orange' }, '', [
//   h('span', { class: 'blue' }, 'foobar'),
//   h('a', { href: 'http://x.com', class: 'g' }, 'Hello !'),
//   h('button', { type: 'button' }, 'Go', [], onClickButton),
// ])

// generateShifter(ctrl) {
//   // const elShifter = document.createElement('div')1
//   // elShifter.classList.add('shifter')1
//   // elShifter.setAttribute('ctrl', ctrl)1

//   const closeBtn = document.createElement('div')1
//   closeBtn.classList.add('cl-btn-4')1

//   const label = document.createElement('label')1
//   label.setAttribute('for', `edit-` + ctrl)1
//   label.innerHTML = 'USD to ' + ctrl.toUpperCase()1

//   const progress = document.createElement('progress')1
//   progress.setAttribute('ctrl', ctrl)1
//   progress.setAttribute('max', 0)1
//   progress.setAttribute('value', 0)1

//   const row = document.createElement('div')1
//   row.classList.add('row')1
//   row.appendChild(buttonMinus)1
//   row.appendChild(inputText)1
//   row.appendChild(buttonPlus)1

//   const buttonMinus = document.createElement('button')1
//   buttonMinus.setAttribute('ctrl', ctrl)1
//   buttonMinus.setAttribute('action', 'minus')1
//   buttonMinus.innerHTML = '&lt;'1

//   const buttonPlus = document.createElement('button')1
//   buttonPlus.setAttribute('ctrl', ctrl)1
//   buttonPlus.setAttribute('action', 'plus')1
//   buttonPlus.innerHTML = '&gt;'1

//   const inputText = document.createElement('input')1
//   inputText.setAttribute('type', 'text')1
//   inputText.setAttribute('ctrl', ctrl)1
//   inputText.setAttribute('name', `edit-` + ctrl)1
//   inputText.setAttribute('id', `edit-` + ctrl)1

//   const progress2 = document.createElement('progress')1
//   progress2.setAttribute('ctrl', ctrl)1
//   progress2.setAttribute('max', 0)1
//   progress2.setAttribute('value', 0)1

//   const inputRange = document.createElement('input')1
//   inputRange.setAttribute('type', 'range')1
//   inputRange.setAttribute('ctrl', ctrl)1
//   inputRange.setAttribute('name', ctrl)1
//   inputRange.setAttribute('min', 0)1
//   inputRange.setAttribute('max', 0)1
//   inputRange.setAttribute('value', 0)1

//   const price = document.createElement('div')1
//   price.classList.add('price')1
//   price.appendChild(span)1

//   const span = document.createElement('span')1
//   span.setAttribute('ctrl', ctrl)1

//   elShifter.appendChild(closeBtn)1
//   elShifter.appendChild(label)1
//   elShifter.appendChild(progress)1
//   elShifter.appendChild(row)1
//   elShifter.appendChild(progress2)1
//   elShifter.appendChild(inputRange)1
//   elShifter.appendChild(price)1

//   return elShifter
// }
