import type ForHtml from '../../../../model/html/for.model'
import type VisiteurNoeud from '../../../VisiteurNoeud'
import { AbstractVisiteurOrchestrateur } from '../../orchestrateur'
import type { NirinaComponent } from './NirinaComponent'

/**
 * La première problématique, c'est juste d'implémenter une liste d'éléments
 */
export default class ForHtmlGenerator
  extends AbstractVisiteurOrchestrateur<NirinaComponent>
  implements VisiteurNoeud<NirinaComponent, ForHtml>
{
  static nombreForHtml = 0
  visit({ dynList }: ForHtml): NirinaComponent {
    const ids = dynList.value.state.map((l) => l.uniqueId)
    const nirinaComponents = dynList.value.state.map(super.visit.bind(this))
    const numberUniqueId = ForHtmlGenerator.nombreForHtml++
    const uniqueId = `for-${numberUniqueId}`
    return {
      template: [
        `<div ${uniqueId} style="display: none"></div>`,
        ...nirinaComponents.map((c) => c.template),
      ].join(''),
      script: () => {
        nirinaComponents.forEach((c) => c.script())

        dynList.addListener((nouveauElements) => {
          // Ajouter les nouveaux éléments à la fin de la liste d'éléments
          const lastId = ids[ids.length - 1]
          console.log(nouveauElements)
          // pour l'instant, juste supprimer tous les éléments et regénérer une liste d'ids
          ids.forEach((id) => document.querySelector(`[${id}]`)?.remove())
          nouveauElements
            .map(super.visit.bind(this))
            .toReversed()
            .forEach((d) => {
              document
                .querySelector(`[${uniqueId}]`)
                ?.insertAdjacentHTML('afterend', d.template)
              d.script()
            })
        })
      },
    }
  }
}
