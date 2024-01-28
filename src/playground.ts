import type { NoeudModel } from '.'
import Button from './builder/BoutonBuilder'
import For from './builder/ForBuilder'
import If from './builder/IfBuilder'
import { Div } from './builder/NativeBuilder'
import Text from './builder/TextBuilder'
import { ComputedList } from './model/ComputedList'
import { ComputableValue } from './model/ComputedValue'
import HtmlOrchestrateur from './visiteurs/impl/generator/html/HtmlOrchestrateur'

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
        Button()
          .setOnClick(onClickBouton)
          .setText('je fais apparaître quelque chose'),
      ),
  )
  .addChild(For(dynList))
  .build()
const generateur = new HtmlOrchestrateur()
const nirinaComposant = elements.accept(generateur)
document.querySelector('#app')!.innerHTML = nirinaComposant.template
nirinaComposant.script()
