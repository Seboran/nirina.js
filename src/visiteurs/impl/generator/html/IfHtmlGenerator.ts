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
    const id = IfHtmlGenerator.nombreIfHtml++
    enfant.uniqueId = `if-${id}`
    const nirinaComponent = super.visit(enfant)
    if (autreEnfant) {
      autreEnfant.uniqueId = `if-${id}`
    }
    const autreEnfantComponent = autreEnfant
      ? super.visit(autreEnfant)
      : undefined
    return {
      template: condition.value.state
        ? nirinaComponent.template
        : autreEnfantComponent?.template ?? '',
      script: () => {
        nirinaComponent.script()
        let previousElement: ChildNode | null | undefined
        if (autreEnfantComponent) {
          autreEnfantComponent.script()
        } else {
          previousElement = document.querySelector(`[if-${id}]`)
            ?.previousSibling
        }

        condition.addListener((valeur) => {
          if (valeur) {
            let nIf = document.querySelector(`[if-${id}]`)
            nIf!.outerHTML = nirinaComponent.template
          } else {
            document.querySelector(`[if-${id}]`)!.outerHTML =
              autreEnfantComponent?.template ?? ''
          }
        })
      },
    }
  }
}
