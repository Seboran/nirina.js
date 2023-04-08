import AdditionNoeud from '../../AdditionNoeud.model'
import AssignationNoeud from '../../AssignationNoeud.model'
import ConditionNode from '../../ConditionNode.model'
import ExpressionNoeud from '../../ExpressionNoeud.model'
import ExpressionsNoeud from '../../ExpressionsNoeud.model'
import FonctionNoeud from '../../FonctionNoeud.model'
import LitteralNoeud from '../../LitteralNoeud.model'
import MultiplicationNoeud from '../../MultiplicationNoeud.model'
import NumberNoeud from '../../NumberNoeud.model'
import SiNoeud from '../../SiNoeud.model'
import SoustractionNoeud from '../../SoustractionNoeud.model'
import SuperieurNoeud from '../../SuperieurNoeud.model'
import VisiteurNoeud from '../VisiteurNoeud'

export default abstract class AbstractVisiteur implements VisiteurNoeud {
  abstract visitFonction(node: FonctionNoeud): FonctionNoeud
  abstract visitExpressions(node: ExpressionsNoeud): ExpressionsNoeud
  abstract visitAssignation(node: AssignationNoeud): AssignationNoeud
  abstract visitNumberValue(node: number): number
  abstract visitString(node: string): string
  abstract visitAddition(node: AdditionNoeud): AdditionNoeud
  abstract visitCondition(node: ConditionNode): ConditionNode
  visitExpression(node: ExpressionNoeud): ExpressionNoeud {
    if (node instanceof AdditionNoeud) {
      return this.visitAddition(node)
    } else if (node instanceof ConditionNode) {
      return this.visitCondition(node)
    } else if (node instanceof LitteralNoeud) {
      return this.visitLitteral(node)
    } else if (node instanceof MultiplicationNoeud) {
      return this.visitMultiplication(node)
    } else if (node instanceof NumberNoeud) {
      return this.visitNumber(node)
    } else if (node instanceof SiNoeud) {
      return this.visitSi(node)
    } else if (node instanceof SoustractionNoeud) {
      return this.visitSoustraction(node)
    } else if (node instanceof SuperieurNoeud) {
      return this.visitSuperieur(node)
    } else if (node instanceof AssignationNoeud) {
      return this.visitAssignation(node)
    } else if (node instanceof FonctionNoeud) {
      return this.visitFonction(node)
    } else {
      throw new Error('Expression inconnue')
    }
  }
  abstract visitLitteral(node: LitteralNoeud): LitteralNoeud
  abstract visitMultiplication(node: MultiplicationNoeud): MultiplicationNoeud
  abstract visitNumber(node: NumberNoeud): NumberNoeud
  abstract visitSi(node: SiNoeud): SiNoeud
  abstract visitSoustraction(node: SoustractionNoeud): SoustractionNoeud
  abstract visitSuperieur(node: SuperieurNoeud): SuperieurNoeud
}
