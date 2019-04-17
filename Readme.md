@janek26/i18n
===
![Picture of a simple usecase](https://raw.githubusercontent.com/janek26/i18n/master/images/carbon.png "Simple usecase")
That's it. The rest is optional. 

This way you can use i18n today and implement the details another time!

# Getting started with i18n

```js
import { t, p, mod, setConfig } from '.'

// (optional) Init resources
setConfig({
  lng: ['de', 'en'],  // sorted by priority (fallback)
  resources: {
    // async resources needs to be a function returning a promise
    // the function will just be called when the resource is needed (in lng)
    en: () => returnsPromiseWhichResolvesToTheSameFormatAsBelow(),
    // sync resource
    de: {
      translation: {
        'Hello ${1}!': 'Moin ${1}!',
      },
      modifier: {
        int: int => int * 10,
      },
      plural: {
        '${1} tree': c => (c === 1 ? `ein Baum` : `${c} Bäume`),
      },
    },
  },
  // Could be used to extract (unknown) keys
  onKey: ({ key, type, lng }) => {}, 
})

t`Hello ${'Username'}!`
// => Moin Username!
p`${1} tree`
// => 1 Baum
p`${5} tree`
// => 5 Bäume
mod(int)(5)
// => 50
```

# API
The module exports 5 properties: `t, p, mod, setConfig, getConfig`
## Methods
### `setConfig(config: ConfigObject): Promise<void>`
The functions `t, p & mod` will use the new config after the returned Promise resolves.
You don't need to set the whole config as `setConfig` will copy missing keys from the old or default config. You can also add new resources without commiting all old ones again.

In practice this means you can simply do:
```js
// call setConfig to set resources and default language

//User wants to change UI language
await setConfig({ lng: 'de' })
```
to set a new language. If the resource for `de` is a function returning a promise it will call the function now and resolve as soon as the resource does.

To add resources after the first init just do:
```js
await setConfig({
  resources: {
    'nl': <ResourceObject>
  }
})
```
It will keep all initinal resources and add the new one. 

If the new one has the same key as an old one it will override it. This process **will not** keep your old translation, plural and modifier keys!

### `` t`<String>`: String ``
t will calculate a key based on the provided string. All variables should be used using the `${}` syntax.

Using this key it will lookup in the resource maps prioritized by the provided `config.lng` array. If some key in one resource map matches it will use the provided value by this key and insert the values to it.

To find the used key use `onKey` in `config`.

Example usage:
```js
  t`Hallo` // => Hallo (if not defined in used resources)
```

### `` p`<String>`: String ``
p will also calculate a key based on the provided string. Only one variable is accepted using `${}` syntax. This variable should be `count: Int`. You can use this variable in your resource plural function to determine if it is plural or not.

Example usage:
```js
setConfig({
  lng: ['en'],
  resources: {
    en: {
      plural: {
        <PluralKey>: (count: Int) => (count*10).toString()
      }
    }
  }
})

p`${5} drinks` // => '50', if PluralKey is matched
```

### `mod(<ModifierKey>): Function(...args): String`
You can apply any modifier function from a resource to any value(s). Define which modifier to use from the resource using the ModifierKey. `mod` will return another function then.

You can provide as many arguments to the returned function as you want to. Your modifier defined in your resource then can handle the arguments.

Example usage: 
```js
setConfig({
  lng: ['en'],
  resources: {
    en: {
      modifier: {
        <ModifierKey>: (arg1, arg2) => (arg1 * arg2).toString()
      }
    }
  }
})

// mod(<ModifierKey>)(arg1, arg2)
mod(<ModifierKey>)(7, 5) // => 35
```

### `getConfig(): ConfigObject`
that's it.
## Objects
### `ConfigObject`
A ConfigObject has a shape like this:
```js
{
  lng: Array<ResourceId>,
  resources: {
    <ResourceId>: <ResourceObject>,
  },
  onKey: ({
    key: TranslationKey|PluralKey|ModifierKey, 
    type: 'translation'|'plural'|'modifier'|'unknown_translation'|'unknown_plural'|'unknown_modifier', 
    lng: ResourceId
  }) => void
}
```

### `ResourceObject`
A ResourceObject contains the `translation, plural & modifier` key for a ResourceId. It looks like this:
```js
{
  translation: {
    <TranslationKey>: <TranslationTemplate>
  },
  plural: {
    <PluralKey>: (count: Int) => String
  },
  modifier: {
    <ModifierKey>: (...args) => String
  }
}
```