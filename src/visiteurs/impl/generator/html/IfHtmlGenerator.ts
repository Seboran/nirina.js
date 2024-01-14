import IfHtml from '../../../../model/html/if.model'
import VisiteurNoeud from '../../../VisiteurNoeud'
import { AbstractVisiteurOrchestrateur } from '../../orchestrateur'
import { NirinaComponent } from './NirinaComponent'

export default class IfHtmlGenerator
  extends AbstractVisiteurOrchestrateur<NirinaComponent>
  implements VisiteurNoeud<NirinaComponent, IfHtml>
{
  static nombreIfHtml = 0
  visit({ condition, enfant, autreEnfant }: IfHtml): NirinaComponent {
    const id = IfHtmlGenerator.nombreIfHtml
    const nirinaComponent = super.visit(enfant)
    const autreEnfantComponent = autreEnfant
      ? super.visit(autreEnfant)
      : undefined
    let elseTemplate: string
    if (autreEnfantComponent) {
      elseTemplate = `<div if-${id}>${autreEnfantComponent.template}</div>`
    } else {
      elseTemplate = `<div if-${id}/>`
    }
    return {
      template: elseTemplate,
      script: () => {
        nirinaComponent.script()
        if (autreEnfantComponent) {
          autreEnfantComponent.script()
        }

        condition.push((valeur) => {
          const nIf = document.querySelector(`[if-${id}]`)
          if (valeur) {
            nIf!.outerHTML = `<div if-${id}>${nirinaComponent.template}</div>`
          } else {
            nIf!.outerHTML = elseTemplate
          }
        })
      },
    }
  }
}
