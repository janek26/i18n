const defaultConfig = {
  lng: ['en'],
  resources: {
    en: {
      translation: {},
      plural: {},
      modifier: {},
    },
  },
  onKey: ({ key, type, lng }) => {},
}

let config = { ...defaultConfig }

export const getConfig = () => ({ ...config })
export const setConfig = async (configNew = {}) => {
  let resolvedRecources = {}
  const updatedConfig = {
    ...defaultConfig,
    ...config,
    ...configNew,
  }
  if (configNew.resources) {
    const keys = updatedConfig.lng.filter(key => {
      const val = configNew.resources[key]
      return typeof val === 'function'
    })
    const funcs = keys.map(key => configNew.resources[key]())
    resolvedRecources = await Promise.all(funcs).then(x =>
      x.reduce((acc, val, keyIndex) => ({ ...acc, [keys[keyIndex]]: val }), {}),
    )
  }
  config = {
    ...updatedConfig,
    resources: {
      ...defaultConfig.resources,
      ...config.resources,
      ...configNew.resources,
      ...resolvedRecources,
    },
  }
}

const calcKey = (statics, calledBy) => {
  const key = statics.reduce(
    (acc, val, i) =>
      acc + val + (statics.length - 1 !== i ? `\${${i + 1}}` : ''),
    '',
  )
  const { resources = {}, lng: [lng] = [] } = config
  const { translation = {}, plural = {} } = resources[lng]
  const isTranslation = !!translation[key]
  const isPlural = !!plural[key]
  const type = isTranslation
    ? 'translation'
    : isPlural
      ? 'plural'
      : calledBy === 't'
        ? 'unknown_translation'
        : 'unknown_plural'

  config.onKey({ key, type, lng })
  return key
}
const parseValuesToStatics = (statics, vars) =>
  statics.reduce(
    (acc, val, i) => acc + val + (statics.length - 1 !== i ? `${vars[i]}` : ''),
    '',
  )

const getResourceForKeys = (locals, type) => key =>
  config.resources[
    locals.find(
      locale =>
        !!(
          config.resources[locale] &&
          config.resources[locale][type] &&
          config.resources[locale][type][key]
        ),
    )
  ] || {}

export const t = (statics, ...vars) => {
  const key = calcKey(statics, 't')
  const { lng = [] } = config
  const { translation = {} } = getResourceForKeys(lng, 'translation')(key)

  if (!translation[key]) return parseValuesToStatics(statics, vars)

  const regex = /\$\{\d+\}/g
  const order = translation[key]
    .match(regex)
    .map(x => parseInt(x.substr(0, x.length - 1).substr(2), 10) - 1)

  const locVars = order.map(x => vars[x])
  const locKeys = translation[key].split(regex)

  return parseValuesToStatics(locKeys, locVars)
}

export const p = ([start, end], count) => {
  const key = calcKey([start, end], 'p')
  const { lng = [] } = config
  const { plural = {} } = getResourceForKeys(lng, 'plural')(key)
  if (!plural[key]) return parseValuesToStatics([start, end], [count])
  return plural[key](count)
}

export const mod = modifierKey => (...args) => {
  const { lng = [], resources = {} } = config
  const { modifier = {} } = getResourceForKeys(lng, 'modifier')(modifierKey)

  const primaryLang = lng[0]

  config.onKey({
    key: modifierKey,
    type:
      resources[primaryLang] &&
      resources[primaryLang].modifier &&
      resources[primaryLang].modifier[modifierKey]
        ? 'mod'
        : 'unknown_mod',
    lng: primaryLang,
  })

  if (!modifier || !modifier[modifierKey])
    return args.map(x => x.toString()).join(' ')

  return modifier[modifierKey](...args)
}
