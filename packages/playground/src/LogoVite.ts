import { Element } from 'nirina.js'

export const LogoVite = Element('a')
  .addAttrs([
    ['href', 'https://vitejs.dev'],
    ['target', '_blank'],
  ])
  .addChild(
    Element('img')
      .addAttrs([
        ['src', '/vite.svg'],
        ['alt', 'Vite logo'],
      ])
      .addClass('logo'),
  )
