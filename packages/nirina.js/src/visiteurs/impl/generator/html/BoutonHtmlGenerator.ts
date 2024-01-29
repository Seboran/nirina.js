import type BoutonHtml from '../../../../model/html/bouton.model'
import type VisiteurNoeud from '../../../VisiteurNoeud'
import type { NirinaComponent } from './NirinaComponent'

export default class BoutonHtmlGenerator
  implements VisiteurNoeud<NirinaComponent, BoutonHtml>
{
  static nombreBoutons = 0
  visit(node: BoutonHtml): NirinaComponent {
    const id = ++BoutonHtmlGenerator.nombreBoutons
    const { texte, onClick } = node
    const style: Record<string, string | number> = node.style
    const css = Object.entries(style)
      .map(([property, value]) => `${property}: ${value}`)
      .join(';')

    const styleText = css !== '' ? `style="${css}"` : ''
    const attrs = []
    attrs.push(`btn-${id}`)
    if (styleText) {
      attrs.push(`${styleText}`)
    }

    return {
      template: `<button${
        attrs ? ' ' + attrs.join(' ') : ''
      }>${texte}</button>`,
      script: () => {
        const component = document.querySelector(`[btn-${id}]`)

        if (component == null) {
          return
        }

        component.addEventListener('click', onClick)
      },
    }
  }
}
