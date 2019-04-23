import React, { useState } from 'react'

import { getConfig, mod, p, setConfig, t } from '.'

export const I18nContext = React.createContext()

export const I18nProvider = ({ children, defaultConfig }) => {
  const [config, writeConfig] = useState(defaultConfig || getConfig())

  return (
    <I18nContext.Provider
      value={{
        config,
        setConfig: c =>
          setConfig({
            ...c,
            writeConfig,
            readConfig: () => config,
          }),
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}
export const withI18n = ({ children }) => {
  const i18nConfig = useContext(I18nContext)
  React.Children.map(children, child => {
    return React.cloneElement(child, {
      i18nConfig,
    })
  })
}

export { p, t, mod }
