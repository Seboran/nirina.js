import BoutonHtml from './model/html/bouton.model'
import ElementsHtml from './model/html/elements.model'
import IfHtml from './model/html/if.model'
import LeafHtml from './model/html/leaf.model'
import HtmlOrchestrateur from './visiteurs/impl/generator/html/HtmlOrchestrateur'

let condition = { valeur: false }

const fonctionsAAppeler: ((valeur: boolean) => void)[] = []
const proxyCondition = new Proxy(condition, {
  set(target, prop, newValue) {
    // @ts-ignore
    target[prop] = newValue
    fonctionsAAppeler.forEach((f) => f(newValue))
    return true
  },
})
const onClickBouton = () => {
  proxyCondition.valeur = !proxyCondition.valeur
}
const bouton1 = new BoutonHtml(onClickBouton, 'je ne regrette rien moi dessus!')
const texte = new LeafHtml('un autre texte')
const texte2 = new LeafHtml('un autre texte2')
const ifHtml = new IfHtml(fonctionsAAppeler, texte, texte2)
const elements = new ElementsHtml(bouton1, ifHtml)
const generateur = new HtmlOrchestrateur()
const nirinaComposant = elements.accept(generateur)
document.querySelector('#app')!.innerHTML = nirinaComposant.template
nirinaComposant.script()
