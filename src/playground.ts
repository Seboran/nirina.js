import Button from './builder/BoutonBuilder'
import If from './builder/IfBuilder'
import { Div } from './builder/NativeBuilder'
import Text from './builder/TextBuilder'
import { ComputableValue } from './model/ComputedValue'
import HtmlOrchestrateur from './visiteurs/impl/generator/html/HtmlOrchestrateur'

let condition = new ComputableValue(true)
const onClickBouton = () => {
  condition.value.state = !condition.value.state
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
  .build()
const generateur = new HtmlOrchestrateur()
const nirinaComposant = elements.accept(generateur)
document.querySelector('#app')!.innerHTML = nirinaComposant.template
nirinaComposant.script()
