import type { VisiteurNoeud } from '../../..'
import type NativeModel from '../../../../model/html/native.model'
import { AbstractVisiteurOrchestrateur } from '../../orchestrateur'
import type { NirinaComponent } from './NirinaComponent'

export default class NativeGenerator
  extends AbstractVisiteurOrchestrateur<NirinaComponent>
  implements VisiteurNoeud<NirinaComponent, NativeModel>
{
  visit({
    name,
    children,
    style: css,
    uniqueId,
  }: NativeModel): NirinaComponent {
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
    if (uniqueId) {
      attrs.push(`${uniqueId}`)
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
