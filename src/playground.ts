import BoutonBuilder from './builder/BoutonBuilder'
import IfBuilder from './builder/IfBuilder'
import NativeBuilder from './builder/NativeBuilder'
import TextBuilder from './builder/TextBuilder'
import { ComputableValue } from './model/ComputedValue'
import HtmlOrchestrateur from './visiteurs/impl/generator/html/HtmlOrchestrateur'

let condition = new ComputableValue(true)
const onClickBouton = () => {
  condition.value.state = !condition.value.state
}

const elements = NativeBuilder('div')
  .setCss('background-color', '#F0F0F0')
  .setCss('display', 'flex')
  .setCss('flex-direction', 'row')
  .setCss('justify-content', 'space-between')
  .addChild(
    IfBuilder(
      condition,
      NativeBuilder('div')
        .setCss('padding', '20px')
        .addChild(TextBuilder('bonjour')),
    ).else(NativeBuilder('div').addChild(TextBuilder('au revoir'))),
  )
  .addChild(NativeBuilder('div').addChild(TextBuilder('world')))
  .addChild(
    NativeBuilder('div')
      .addChild(TextBuilder('ouaip ?'))
      .addChild(
        BoutonBuilder()
          .setOnClick(onClickBouton)
          .setText('je fais apparaître quelque chose'),
      ),
  )
  .build()
const generateur = new HtmlOrchestrateur()
const nirinaComposant = elements.accept(generateur)
document.querySelector('#app')!.innerHTML = nirinaComposant.template
nirinaComposant.script()
