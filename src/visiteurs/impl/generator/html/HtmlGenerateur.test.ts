import { beforeEach, describe, expect, test, vi } from 'vitest'
import BoutonHtml from '../../../../model/html/bouton.model'
import ElementsHtml from '../../../../model/html/elements.model'
import IfHtml from '../../../../model/html/if.model'
import LeafHtml from '../../../../model/html/leaf.model'
import BoutonHtmlGenerator from './BoutonHtmlGenerator'
import HtmlOrchestrateur from './HtmlOrchestrateur'

import { Window } from 'happy-dom'
import { ComputableValue } from '../../../../model/ComputedValue'
import IfHtmlGenerator from './IfHtmlGenerator'
import NativeModel from '../../../../model/html/native.model'
import ForHtml from '../../../../model/html/for.model'
import { ComputedList } from '../../../../model/ComputedList'
import { Div } from '../../../../builder/NativeBuilder'
import TextBuilder from '../../../../builder/TextBuilder'
import { NoeudModel } from '../../../../model'

// Create a new Window instance
const window = new Window()

// @ts-ignore
global.window = window
// @ts-ignore
global.document = window.document
beforeEach(() => {
  BoutonHtmlGenerator.nombreBoutons = 0
  IfHtmlGenerator.nombreIfHtml = 0
  window.document.body.innerHTML = ''
})

describe('Bouton html générateur', () => {
  test('affiche un bouton avec son texte', () => {
    const generateur = new HtmlOrchestrateur()
    const boutonHtml = new BoutonHtml(() => {}, 'yo angelo')
    const render = boutonHtml.accept(generateur)
    expect(render.template).toEqual(`<button btn-1>yo angelo</button>`)
  })
  test('affiche un bouton avec son texte qui affiche du texte quand on clique dessus', () => {
    const generateur = new BoutonHtmlGenerator()
    const spy = vi.fn()
    const boutonHtml = new BoutonHtml(spy, 'yo angelo')
    const render = boutonHtml.accept(generateur)
    window.document.body.innerHTML = render.template
    render.script()
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">yo angelo</button>`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(spy).toHaveBeenCalledOnce()
  })
})

describe('Éléments html générateur', () => {
  test('affiche deux boutons', () => {
    const spy1 = vi.fn()
    const bouton1 = new BoutonHtml(() => {
      spy1()
    }, 'bouton1')
    const spy2 = vi.fn()
    const bouton2 = new BoutonHtml(() => {
      spy2()
    }, 'bouton2')
    const elements = new ElementsHtml(bouton1, bouton2)
    const generateur = new HtmlOrchestrateur()
    const render = elements.accept(generateur)
    window.document.body.innerHTML = render.template
    render.script()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">bouton1</button><button btn-2="">bouton2</button>"`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(spy1).toHaveBeenCalledOnce()
    expect(spy2).not.toHaveBeenCalledOnce()
    // @ts-ignore
    window.document.body.children[1].click()
    expect(spy1).toHaveBeenCalledOnce()
    expect(spy2).toHaveBeenCalledOnce()

    /**
     * </script><button btn-4>bouton2</button><script>document.querySelector('[btn-4]').addEventListener('click', () => {
            alert("malibu");
          })</script>"
     */
  })
})

describe('Affichage conditionnel', () => {
  test('affiche du texte si et seulement si on clique sur un bouton', () => {
    let condition = new ComputableValue(false)

    const onClickBouton = () => {
      condition.value.state = !condition.value.state
    }
    const bouton1 = new BoutonHtml(onClickBouton, 'cliquez moi dessus!')
    const texte = new LeafHtml('un autre texte')
    const ifHtml = new IfHtml(condition, new NativeModel('div', [texte]))
    const generateur = new HtmlOrchestrateur()
    const elements = new ElementsHtml(bouton1, ifHtml)
    const render = elements.accept(generateur)
    window.document.body.innerHTML = render.template
    render.script()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">cliquez moi dessus!</button><div if-0="" style="display: none"></div>"`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte</div>"`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">cliquez moi dessus!</button><div if-0="" style="display: none"></div>"`,
    )
  })

  test('affiche du texte puis un autre texte', () => {
    let condition = new ComputableValue(false)

    const onClickBouton = () => {
      condition.value.state = !condition.value.state
    }
    const bouton1 = new BoutonHtml(onClickBouton, 'cliquez moi dessus!')
    const texte1 = new LeafHtml('un autre texte')
    const texte2 = new LeafHtml('un autre texte 2')
    const ifHtml = new IfHtml(
      condition,
      new NativeModel('div', [texte1]),
      new NativeModel('div', [texte2]),
    )
    const generateur = new HtmlOrchestrateur()
    const elements = new ElementsHtml(bouton1, ifHtml)
    const render = elements.accept(generateur)
    window.document.body.innerHTML = render.template
    render.script()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte 2</div>"`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte</div>"`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte 2</div>"`,
    )
  })

  test('affiche du texte puis un autre texte', () => {
    let condition = new ComputableValue(true)

    const onClickBouton = () => {
      condition.value.state = !condition.value.state
    }
    const bouton1 = new BoutonHtml(onClickBouton, 'cliquez moi dessus!')
    const texte1 = new LeafHtml('un autre texte')
    const texte2 = new LeafHtml('un autre texte 2')
    const ifHtml = new IfHtml(
      condition,
      new NativeModel('div', [texte1]),
      new NativeModel('div', [texte2]),
    )
    const generateur = new HtmlOrchestrateur()
    const elements = new ElementsHtml(bouton1, ifHtml)
    const render = elements.accept(generateur)
    window.document.body.innerHTML = render.template
    render.script()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte</div>"`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte 2</div>"`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte</div>"`,
    )
  })

  test('afficher deux éléments, puis les faire disparaître', () => {
    let condition = new ComputableValue(true)

    const onClickBouton = () => {
      condition.value.state = !condition.value.state
    }
    const bouton1 = new BoutonHtml(onClickBouton, 'cliquez moi dessus!')
    const texte1 = new LeafHtml('un autre texte')
    const texte2 = new LeafHtml('un autre texte 2')
    const ifHtml1 = new IfHtml(condition, new NativeModel('div', [texte1]))
    const ifHtml2 = new IfHtml(condition, new NativeModel('div', [texte2]))
    const generateur = new HtmlOrchestrateur()
    const elements = new ElementsHtml(bouton1, ifHtml1, ifHtml2)
    const render = elements.accept(generateur)
    window.document.body.innerHTML = render.template
    render.script()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte</div><div if-1="">un autre texte 2</div>"`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      `"<button btn-1="">cliquez moi dessus!</button><div if-0="" style="display: none"></div><div if-1="" style="display: none"></div>"`,
    )
  })
})

describe('éléments natifs', () => {
  test('affiche un span avec un texte', () => {
    const span = new NativeModel('span', [new LeafHtml('bonjour')])
    const generateur = new HtmlOrchestrateur()

    const { template } = span.accept(generateur)
    expect(template).toEqual('<span>bonjour</span>')
  })

  test("affiche un texte rouge à l'intérieur de divs un peu fancy", () => {
    const css: Record<string, string | number> = {}
    css.color = 'red'
    const nativeModel = new NativeModel('span', [
      new NativeModel('div', [new LeafHtml('salut')], css),
    ])

    expect(
      nativeModel.accept(new HtmlOrchestrateur()).template,
    ).toMatchInlineSnapshot(
      `"<span><div style="color: red">salut</div></span>"`,
    )
  })
})

describe("liste dynamique d'éléments", () => {
  test('affiche 3 éléments', () => {
    const listeDynamique = new ComputedList<NoeudModel>([
      Div().addChild(TextBuilder('1')).addId('div-1').build(),
      Div().addChild(TextBuilder('2')).addId('div-2').build(),
      Div().addChild(TextBuilder('3')).addId('div-3').build(),
    ])
    const forHtml = new ForHtml(listeDynamique)
    const generateur = new HtmlOrchestrateur()

    const { template } = forHtml.accept(generateur)
    expect(template).toMatchInlineSnapshot(
      '"<div div-1>1</div><div div-2>2</div><div div-3>3</div>"',
    )
  })
  test('affiche 2, puis 3 éléments', () => {
    const listeDynamique = new ComputedList<NoeudModel>([
      Div().addChild(TextBuilder('1')).addId('div-1').build(),
      Div().addChild(TextBuilder('2')).addId('div-2').build(),
    ])
    const forHtml = new ForHtml(listeDynamique)
    const generateur = new HtmlOrchestrateur()

    const render = forHtml.accept(generateur)
    window.document.body.innerHTML = render.template
    render.script()

    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      '"<div div-1="">1</div><div div-2="">2</div>"',
    )

    listeDynamique.value.state = [
      Div().addChild(TextBuilder('1')).build(),
      Div().addChild(TextBuilder('2')).build(),
      Div().addChild(TextBuilder('3')).build(),
    ]

    expect(window.document.body.innerHTML).toMatchInlineSnapshot(
      '"<div div-1="">1</div><div div-2="">2</div><div div-3="">3</div>"',
    )
  })
})
