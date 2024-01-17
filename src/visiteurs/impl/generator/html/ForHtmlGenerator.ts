import ForHtml from '../../../../model/html/for.model'
import VisiteurNoeud from '../../../VisiteurNoeud'
import { AbstractVisiteurOrchestrateur } from '../../orchestrateur'
import { NirinaComponent } from './NirinaComponent'

/**
 * La première problématique, c'est juste d'implémenter une liste d'éléments
 */
export default class ForHtmlGenerator
  extends AbstractVisiteurOrchestrateur<NirinaComponent>
  implements VisiteurNoeud<NirinaComponent, ForHtml>
{
  visit({ dynList }: ForHtml): NirinaComponent {
    const ids = dynList.value.state.map(l => l.uniqueId)
    const nirinaComponents = dynList.value.state.map(super.visit.bind(this))
    return {
      template: nirinaComponents.map((c) => c.template).join(''),
      script: () => {
        nirinaComponents.forEach((c) => c.script())
        

        dynList.addListener(l => {
          // Trouver les ids différents, et ajouter ou supprimer ceux qui manquent
        })
      },
    }
  }
}
