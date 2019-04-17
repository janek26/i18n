import { getConfig, mod, p, setConfig, t } from '.'

test('t defaults work', () => {
  expect(t`Hello ${'Username'}!`).toBe('Hello Username!')
})

test('p defaults work', () => {
  expect(p`${5} tree`).toBe('5 tree')
})

test('mod defaults work', () => {
  expect(mod('int')(5)).toBe('5')
  expect(mod('int')(5, 25)).toBe('5 25')
})

test('setConfig works', async () => {
  await setConfig({
    lng: ['de'],
    resources: {
      de: {
        translation: {
          'Hello ${1}!': 'Hallo ${1}!',
          'Bye ${1}': 'Tschüss ${1}',
        },
        modifier: {
          int: int => int * 10,
        },
        plural: {
          '${1} tree': c => (c === 1 ? `ein Baum` : `${c} Bäume`),
        },
      },
    },
  })

  expect(getConfig().lng).toEqual(['de'])
})

test('t works', () => {
  expect(t`Hello ${'Username'}!`).toBe('Hallo Username!')
})

test('p works', () => {
  expect(p`${1} tree`).toBe('ein Baum')
  expect(p`${5} tree`).toBe('5 Bäume')
})

test('mod works', () => {
  expect(mod('int')(5)).toBe(50)
  expect(mod('int')(5, 25)).toBe(50) // Just the first argument is used in modifier int
})

const mockEsAsync = () =>
  new Promise(res =>
    setTimeout(
      () =>
        res({
          translation: {
            'Hello ${1}!': 'hola ${1}!',
          },
          modifier: {
            int: int => int * 50,
          },
          plural: {
            '${1} tree': c => (c === 1 ? `el árbol` : `${c} árboles`),
          },
        }),
      1000,
    ),
  )

test('setConfig works (async resource)', async () => {
  await setConfig({
    lng: ['es'],
    resources: {
      es: () => mockEsAsync(),
    },
  })

  expect(getConfig().lng).toEqual(['es'])
})

test('t works', () => {
  expect(t`Hello ${'Username'}!`).toBe('hola Username!')
})

test('p works', () => {
  expect(p`${1} tree`).toBe('el árbol')
  expect(p`${5} tree`).toBe('5 árboles')
})

test('mod works', () => {
  expect(mod('int')(5)).toBe(250)
  expect(mod('int')(5, 25)).toBe(250) // Just the first argument is used in modifier int
})

test('onKey Hook works', async () => {
  const mockFn = jest.fn()
  await setConfig({
    onKey: mockFn,
  })

  t`Hello ${'Username'}!`
  p`${1} tree`
  mod('int')(5)
  t`Bye ${'Username'}!`
  p`${1} house`
  mod('date')(new Date())

  expect(mockFn.mock.calls.length).toBe(6)
  expect(mockFn.mock.calls[0][0]).toEqual({
    key: 'Hello ${1}!',
    type: 'translation',
    lng: 'es',
  })
  expect(mockFn.mock.calls[1][0]).toEqual({
    key: '${1} tree',
    type: 'plural',
    lng: 'es',
  })
  expect(mockFn.mock.calls[2][0]).toEqual({
    key: 'int',
    type: 'mod',
    lng: 'es',
  })
  expect(mockFn.mock.calls[3][0]).toEqual({
    key: 'Bye ${1}!',
    type: 'unknown_translation',
    lng: 'es',
  })
  expect(mockFn.mock.calls[4][0]).toEqual({
    key: '${1} house',
    type: 'unknown_plural',
    lng: 'es',
  })
  expect(mockFn.mock.calls[5][0]).toEqual({
    key: 'date',
    type: 'unknown_mod',
    lng: 'es',
  })
})

test('setConfig to use fallback language', async () => {
  await setConfig({
    lng: ['es', 'de'],
  })

  expect(getConfig().lng).toEqual(['es', 'de'])

  expect(t`Bye ${'user'}`).toBe('Tschüss user')
})
