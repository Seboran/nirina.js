import VisiteurNoeud from '../visiteurs/VisiteurNoeud'

type Style = Record<string, string | number>

export default abstract class NoeudModel {
  public name = ''
  public style: Style = {}

  setStyle(style: Style): this {
    this.style = style
    return this
  }

  accept<T>(visitor: VisiteurNoeud<T, NoeudModel>): T {
    return visitor.visit(this)
  }
}
