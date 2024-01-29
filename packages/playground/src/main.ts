import './style.css'
import { Div, mount, Element, Text } from 'nirina.js'
import { CounterBouton } from './CounterBouton'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const app = Div()
  .addChild(Element('a').addChild(Text('Logo de vitejs')))
  .addChild(Element('a').addChild(Text('Logo de typescript')))
  .addChild(Element('h1').addChild(Text('Vite + TypeScript')))
  .addChild(Div().addChild(CounterBouton))
  .addChild(
    Element('p').addChild(
      Text('Click on the Vite and TypeScript logos to learn more'),
    ),
  )

mount('#app', app.build())
