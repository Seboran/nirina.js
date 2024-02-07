import { Div, Element, Text, mount } from 'nirina.js'
import { CounterBouton } from './CounterBouton'
import './style.css'
import { useForNuméros } from './useForNuméros'
import { LogoTypescript } from './LogoTypescript'
import { LogoVite } from './LogoVite'

const { miseAJourElements, ForNuméros } = useForNuméros()
const app = Div()
  .addChild(LogoVite)
  .addChild(LogoTypescript)
  .addChild(
    Element('h1').addChild(Text('Vite + TypeScript')).addClass('text-rouge'),
  )
  .addChild(CounterBouton(miseAJourElements))
  .addChild(
    Element('p').addChild(
      Text('Click on the Vite and TypeScript logos to learn more'),
    ),
  )
  .addChild(ForNuméros)

mount('#app', app.build())
