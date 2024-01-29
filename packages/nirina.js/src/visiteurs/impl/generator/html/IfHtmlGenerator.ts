import type IfHtml from '../../../../model/html/if.model'
import type VisiteurNoeud from '../../../VisiteurNoeud'
import { AbstractVisiteurOrchestrateur } from '../../orchestrateur'
import type { NirinaComponent } from './NirinaComponent'

export default class IfHtmlGenerator
  extends AbstractVisiteurOrchestrateur<NirinaComponent>
  implements VisiteurNoeud<NirinaComponent, IfHtml>
{
  static nombreIfHtml = 0
  visit({ condition, enfant, autreEnfant }: IfHtml): NirinaComponent {
    const id = IfHtmlGenerator.nombreIfHtml++
    const uniqueId = `if-${id}`
    enfant.uniqueId = uniqueId
    const nirinaComponent = super.visit(enfant)
    if (autreEnfant) {
      autreEnfant.uniqueId = uniqueId
    }
    const autreEnfantComponent = autreEnfant
      ? super.visit(autreEnfant)
      : undefined
    const emptyIf = `<div ${uniqueId} style="display: none"/>`
    return {
      template: condition.value.state
        ? nirinaComponent.template
        : autreEnfantComponent?.template ?? emptyIf,
      script: () => {
        nirinaComponent.script()
        if (autreEnfantComponent) {
          autreEnfantComponent.script()
        }

        condition.addListener((valeur) => {
          const nIf = document.querySelector(`[${uniqueId}]`)
          if (valeur) {
            nIf!.outerHTML = nirinaComponent.template
          } else {
            nIf!.outerHTML = autreEnfantComponent?.template ?? emptyIf
          }
        })
      },
    }
  }
}
