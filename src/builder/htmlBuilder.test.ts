import { beforeEach, describe, expect, test } from 'bun:test'
import ElementsHtml from '../model/html/elements.model'
import IfHtml from '../model/html/if.model'
import LeafHtml from '../model/html/leaf.model'
import HtmlOrchestrateur from '../visiteurs/impl/generator/html/HtmlOrchestrateur'

import { Window } from 'happy-dom'
import { ComputableValue } from '../model/ComputedValue'
import BoutonBuilder from './BoutonBuilder'
import LeafBuilder from './LeafBuilder'
import NativeBuilder from './NativeBuilder'
import TextBuilder from './TextBuilder'
import IfBuilder from './IfBuilder'
import NativeModel from '../model/html/native.model'

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
  test('construire un site avec un texte rouge', () => {
    const afficher = new ComputableValue(false)
    const onClickBouton = () => {
      afficher.value.state = !afficher.value.state
    }
    const bouton1 = BoutonBuilder()
      .setOnClick(onClickBouton)
      .setText('je ne regrette rien moi dessus!')
      .setCss('color', 'red')
      .build()
    const texte = new LeafHtml('un autre texte')
    const texte2 = new LeafHtml('un autre texte2')
    const ifHtml = new IfHtml(
      afficher,
      new NativeModel('div', [texte]),
      new NativeModel('div', [texte2]),
    )
    const elements = new ElementsHtml(bouton1, ifHtml)
    const generateur = new HtmlOrchestrateur()
    const nirinaComposant = elements.accept(generateur)

    window.document.body.innerHTML = nirinaComposant.template
    nirinaComposant.script()
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="" style="color: red">je ne regrette rien moi dessus!</button><div if-0="">un autre texte2</div>`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="" style="color: red">je ne regrette rien moi dessus!</button><div if-0="">un autre texte</div>`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="" style="color: red">je ne regrette rien moi dessus!</button><div if-0="">un autre texte2</div>`,
    )
  })
})

describe('native builder', () => {
  test('faire des divs et des spans imbriqués', () => {
    const mesDivsImbriquées = NativeBuilder('div')
      .addChild(
        NativeBuilder('span').addChild(TextBuilder('bonjour').build()).build(),
      )
      .setCss('color', 'green')
      .build()

    const nirinaComposant = mesDivsImbriquées.accept(new HtmlOrchestrateur())

    expect(nirinaComposant.template).toEqual(
      `<div style="color: green"><span>bonjour</span></div>`,
    )
  })
})

describe('gestion des if builder', () => {
  test('faire des ifs et des pas ifs', () => {
    // IfBuilder(\)
  })
})
