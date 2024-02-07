import type VisiteurNoeud from '../visiteurs/VisiteurNoeud'

type Style = Record<string, string | number>

export default abstract class NoeudModel {
  public name = ''
  public style: Style = {}
  public uniqueId: string = ''
  public className = ''

  setStyle(style: Style): this {
    this.style = style
    return this
  }

  setUniqueId(id: string): this {
    this.uniqueId = id
    return this
  }

  setClass(className: string): this {
    this.className = className
    return this
  }

  accept<T>(visitor: VisiteurNoeud<T, NoeudModel>): T {
    return visitor.visit(this)
  }
}
