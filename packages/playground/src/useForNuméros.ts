import type { NoeudModel } from 'nirina.js'
import { ComputedList, Div, For, Text } from 'nirina.js'

export function useForNuméros() {
  const listeNumérosElements = new ComputedList<NoeudModel>([])

  const ForNuméros = For(listeNumérosElements)
  const miseAJourElements = (nombre: number): void => {
    listeNumérosElements.value.state = [
      ...listeNumérosElements.value.state,
      Div()
        .addChild(Text(`This is the ${nombre}th element`))
        .addId(`dyn-clicks-${nombre}`)
        .build(),
    ]
  }
  return { miseAJourElements, ForNuméros }
}
