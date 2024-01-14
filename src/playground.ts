import { ComputableValue } from './model/ComputedValue'
import BoutonHtml from './model/html/bouton.model'
import ElementsHtml from './model/html/elements.model'
import IfHtml from './model/html/if.model'
import LeafHtml from './model/html/leaf.model'
import HtmlOrchestrateur from './visiteurs/impl/generator/html/HtmlOrchestrateur'

let condition = new ComputableValue(false)
const onClickBouton = () => {
  condition.value.state = !condition.value.state
}
const bouton1 = new BoutonHtml(onClickBouton, 'je ne regrette rien moi dessus!')
const texte = new LeafHtml('un autre texte')
const texte2 = new LeafHtml('un autre texte2')
const ifHtml = new IfHtml(condition, texte, texte2)
const elements = new ElementsHtml(bouton1, ifHtml)
const generateur = new HtmlOrchestrateur()
const nirinaComposant = elements.accept(generateur)
document.querySelector('#app')!.innerHTML = nirinaComposant.template
nirinaComposant.script()
