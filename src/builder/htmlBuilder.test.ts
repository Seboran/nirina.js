import { beforeEach, describe, expect, test } from 'vitest'
import ElementsHtml from '../model/html/elements.model'
import IfHtml from '../model/html/if.model'
import LeafHtml from '../model/html/leaf.model'
import HtmlOrchestrateur from '../visiteurs/impl/generator/html/HtmlOrchestrateur'

import { Window } from 'happy-dom'
import { ComputableValue } from '../model/ComputedValue'
import BoutonBuilder from './BoutonBuilder'

// Create a new Window instance
const window = new Window()

// @ts-ignore
global.window = window
// @ts-ignore
global.document = window.document
beforeEach(() => {
  window.document.body.innerHTML = ''
})

describe('html builder', () => {
  test('construire un site avec un texte', () => {
    const afficher = new ComputableValue(false)
    const onClickBouton = () => {
      afficher.value.state = !afficher.value.state
    }
    const bouton1 = BoutonBuilder.init()
      .setOnClick(onClickBouton)
      .setText('je ne regrette rien moi dessus!')
      .build()
    const texte = new LeafHtml('un autre texte')
    const texte2 = new LeafHtml('un autre texte2')
    const ifHtml = new IfHtml(afficher, texte, texte2)
    const elements = new ElementsHtml(bouton1, ifHtml)
    const generateur = new HtmlOrchestrateur()
    const nirinaComposant = elements.accept(generateur)

    window.document.body.innerHTML = nirinaComposant.template
    nirinaComposant.script()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">je ne regrette rien moi dessus!</button><div if-0="">un autre texte2</div>"`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">je ne regrette rien moi dessus!</button><div if-0="">un autre texte</div>"`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">je ne regrette rien moi dessus!</button><div if-0="">un autre texte2</div>"`,
    )
  })
})
