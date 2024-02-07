import type { NoeudModel } from 'nirina.js'
import { Bouton, ComputedList, Div, For, Text } from 'nirina.js'

let counterValue = 0
const reactiveValue = new ComputedList<NoeudModel>([
  Div()
    .addId('counter-0')
    .addChild(Text(`Counter is ${counterValue}`))
    .build(),
])

export const CounterBouton = (click: (nombre: number) => void) =>
  Div()
    .addChild(
      Bouton()
        .setText('Incrémenter')
        .setOnClick(() => {
          const counter = ++counterValue
          click(counter)
          reactiveValue.value.state = [
            Div()
              .addId(`counter-${counter}`)
              .addChild(Text(`Counter is ${counter}`))
              .build(),
          ]
        }),
    )
    .addChild(For(reactiveValue))
