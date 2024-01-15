import { VisiteurNoeud } from '../../..'
import NativeModel from '../../../../model/html/native.model'
import { AbstractVisiteurOrchestrateur } from '../../orchestrateur'
import { NirinaComponent } from './NirinaComponent'

export default class NativeGenerator
  extends AbstractVisiteurOrchestrateur<NirinaComponent>
  implements VisiteurNoeud<NirinaComponent, NativeModel>
{
  visit({ name, children, css }: NativeModel): NirinaComponent {
    const nirinaComponents = children.map(super.visit.bind(this))
    const templates = nirinaComponents.map(({ template }) => template).join('')
    const style = Object.entries(css)
      .map(([property, value]) => `${property}: ${value}`)
      .join(';')

    const styleText = style !== '' ? `style="${style}"` : ''
    const attrs = []
    if (styleText) {
      attrs.push(`${styleText}`)
    }
    return {
      script: () => {
        nirinaComponents.forEach(({ script }) => script())
      },
      template: `<${name}${
        attrs.length !== 0 ? ' ' + attrs.join(' ') : ''
      }>${templates}</${name}>`,
    }
  }
}
