/* eslint-disable @typescript-eslint/ban-ts-comment */
import { beforeEach, describe, expect, test, jest as vi } from 'bun:test'
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
import type { NoeudModel } from '../../../../model'
import ForHtmlGenerator from './ForHtmlGenerator'
import BoutonBuilder from '../../../../builder/BoutonBuilder'

// Create a new Window instance
const window = new Window()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
global.window = window
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
global.document = window.document
beforeEach(() => {
  BoutonHtmlGenerator.nombreBoutons = 0
  IfHtmlGenerator.nombreIfHtml = 0
  ForHtmlGenerator.nombreForHtml = 0
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
    expect(spy).toHaveBeenCalledTimes(1)
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
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">bouton1</button><button btn-2="">bouton2</button>`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).not.toHaveBeenCalledTimes(1)
    // @ts-ignore
    window.document.body.children[1].click()
    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledTimes(1)

    /**
     * </script><button btn-4>bouton2</button><script>document.querySelector('[btn-4]').addEventListener('click', () => {
            alert("malibu");
          })</script>"
     */
  })
})

describe('Affichage conditionnel', () => {
  test('affiche du texte si et seulement si on clique sur un bouton', () => {
    const condition = new ComputableValue(false)

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
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">cliquez moi dessus!</button><div if-0="" style="display: none"></div>`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte</div>`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">cliquez moi dessus!</button><div if-0="" style="display: none"></div>`,
    )
  })

  test('affiche du texte puis un autre texte', () => {
    const condition = new ComputableValue(false)

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
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte 2</div>`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte</div>`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte 2</div>`,
    )
  })

  test('affiche du texte puis un autre texte', () => {
    const condition = new ComputableValue(true)

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
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte</div>`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte 2</div>`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte</div>`,
    )
  })

  test('afficher deux éléments, puis les faire disparaître', () => {
    const condition = new ComputableValue(true)

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
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">cliquez moi dessus!</button><div if-0="">un autre texte</div><div if-1="">un autre texte 2</div>`,
    )
    // @ts-ignore
    window.document.body.children[0].click()
    expect(window.document.body.innerHTML).toEqual(
      `<button btn-1="">cliquez moi dessus!</button><div if-0="" style="display: none"></div><div if-1="" style="display: none"></div>`,
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
    css['color'] = 'red'
    const nativeModel = new NativeModel('span', [
      new NativeModel('div', [new LeafHtml('salut')], css),
    ])

    expect(nativeModel.accept(new HtmlOrchestrateur()).template).toEqual(
      `<span><div style="color: red">salut</div></span>`,
    )
  })

  test('affiche un texte avec une classe css', () => {
    const texte = new NativeModel('span', [new LeafHtml('salut')])
    texte.setClass('ma-classe')
    render(texte)
    expectHtml(`<span class="ma-classe">salut</span>`)
  })

  test('affiche une image', () => {
    const image = new NativeModel(
      'img',
      [],
      {},
      ['src', '/mon-image.png'],
      ['alt', 'mon texte alternatif'],
    )
    render(image)
    expectHtml(`<img src="/mon-image.png" alt="mon texte alternatif">`)
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
    expect(template).toEqual(
      '<div for-0 style="display: none"></div><div div-1>1</div><div div-2>2</div><div div-3>3</div>',
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

    expect(window.document.body.innerHTML).toEqual(
      '<div for-0="" style="display: none"></div><div div-1="">1</div><div div-2="">2</div>',
    )

    listeDynamique.value.state = [
      Div().addChild(TextBuilder('1')).addId('div-1').build(),
      Div().addChild(TextBuilder('2')).addId('div-2').build(),
      Div().addChild(TextBuilder('3')).addId('div-3').build(),
    ]

    expect(window.document.body.innerHTML).toEqual(
      '<div for-0="" style="display: none"></div><div div-1="">1</div><div div-2="">2</div><div div-3="">3</div>',
    )
  })
  test('affiche 2, puis 3 éléments, mais pas plus', () => {
    const listeDynamique = new ComputedList<NoeudModel>([
      Div().addChild(TextBuilder('1')).addId('div-1').build(),
      Div().addChild(TextBuilder('2')).addId('div-2').build(),
    ])
    const forHtml = new ForHtml(listeDynamique)
    const generateur = new HtmlOrchestrateur()

    const render = forHtml.accept(generateur)
    window.document.body.innerHTML = render.template
    render.script()

    expect(window.document.body.innerHTML).toEqual(
      '<div for-0="" style="display: none"></div><div div-1="">1</div><div div-2="">2</div>',
    )

    listeDynamique.value.state = [
      Div().addChild(TextBuilder('1')).addId('div-1').build(),
      Div().addChild(TextBuilder('2')).addId('div-2').build(),
      Div().addChild(TextBuilder('3')).addId('div-3').build(),
    ]

    expect(window.document.body.innerHTML).toEqual(
      '<div for-0="" style="display: none"></div><div div-1="">1</div><div div-2="">2</div><div div-3="">3</div>',
    )
    listeDynamique.value.state = [
      Div().addChild(TextBuilder('1')).addId('div-1').build(),
      Div().addChild(TextBuilder('2')).addId('div-2').build(),
      Div().addChild(TextBuilder('3')).addId('div-3').build(),
    ]

    expect(window.document.body.innerHTML).toEqual(
      '<div for-0="" style="display: none"></div><div div-1="">1</div><div div-2="">2</div><div div-3="">3</div>',
    )
  })
  test('affiche un bouton dans une liste dynamique, le bouton permet de faire disparaître un élément de la liste dynamique', () => {
    const spy = vi.fn()
    const button = BoutonBuilder().setOnClick(spy).setText('cliquez').build()

    const listeDynamique = new ComputedList<NoeudModel>([
      Div().addChild(TextBuilder('1')).addId('div-1').build(),
      Div().addChild(TextBuilder('2')).addId('div-2').build(),
    ])
    const forHtml = new ForHtml(listeDynamique)
    render(forHtml)

    expectHtml(
      '<div for-0="" style="display: none"></div><div div-1="">1</div><div div-2="">2</div>',
    )

    listeDynamique.value.state = [...listeDynamique.value.state, button]
    expectHtml(
      '<div for-0="" style="display: none"></div><div div-1="">1</div><div div-2="">2</div><button btn-1="">cliquez</button>',
    )
    ;(document.querySelector('[btn-1]') as HTMLButtonElement)?.click()
    expect(spy).toHaveBeenCalled()
  })
})
function expectHtml(expected: string) {
  expect(window.document.body.innerHTML).toEqual(expected)
}

function render(component: NoeudModel) {
  const generateur = new HtmlOrchestrateur()

  const render = component.accept(generateur)
  window.document.body.innerHTML = render.template
  render.script()
}
