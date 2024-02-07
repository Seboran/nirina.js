import { Element } from 'nirina.js'
import typescriptLogo from './typescript.svg'

export const LogoTypescript = Element('a')
  .addAttrs([
    ['href', 'https://www.typescriptlang.org/'],
    ['target', '_blank'],
  ])
  .addChild(
    Element('img')
      .addAttrs([
        ['src', typescriptLogo],
        ['alt', 'Typescript logo'],
      ])
      .addClass('logo'),
  )
