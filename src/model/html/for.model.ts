import type { ComputedList } from '../ComputedList'
import NoeudModel from '../Noeud.model'

export default class ForHtml extends NoeudModel {
  public name: string = 'for'
  constructor(public dynList: ComputedList<NoeudModel>) {
    super()
  }
}
