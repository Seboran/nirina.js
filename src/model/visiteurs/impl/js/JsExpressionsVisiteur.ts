import ExpressionsNoeud from '../../../ExpressionsNoeud.model'
import VisiteurNoeud from '../../VisiteurNoeud'
import AbstractVisiteurOrchestrateur from '../AbstractVisiteurOrchestrateur'

export default class JsExpressionsVisiteur
  extends AbstractVisiteurOrchestrateur<string>
  implements VisiteurNoeud<string, ExpressionsNoeud>
{
  visit(node: ExpressionsNoeud): string {
    return node.expressions.map(super.visit.bind(this)).join('; ') + ';'
  }
}
