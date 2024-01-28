import type { NoeudModel } from '.'
import {
  Bouton,
  ComputableValue,
  ComputedList,
  Div,
  For,
  If,
  Text,
  mount,
} from '.'

const condition = new ComputableValue(true)
const dynList = new ComputedList<NoeudModel>([
  Div().addChild(Text('Premier élément')).addId('div1').build(),
  Div().addChild(Text('Deuxième élément')).addId('div2').build(),
])
const onClickBouton = () => {
  const numberItems = dynList.value.state.length + 1
  condition.value.state = !condition.value.state
  dynList.value.state = [
    ...dynList.value.state,
    Div()
      .addChild(Text(`${numberItems}e élément`))
      .addId(`div${numberItems}`)
      .build(),
  ]
}

const elements = Div()
  .setCss('background-color', '#F0F0F0')
  .setCss('display', 'flex')
  .setCss('flex-direction', 'row')
  .setCss('justify-content', 'space-between')
  .addChild(
    If(
      condition,
      Div().setCss('padding', '20px').addChild(Text('bonjour')),
    ).else(Div().addChild(Text('au revoir'))),
  )
  .addChild(Div().addChild(Text('world')))
  .addChild(
    Div()
      .addChild(Text('ouaip ?'))
      .addChild(
        Bouton()
          .setOnClick(onClickBouton)
          .setText('je fais apparaître quelque chose'),
      ),
  )
  .addChild(For(dynList))
  .build()
mount('#app', elements)
