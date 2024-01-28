import type { ComputableValue } from '../ComputedValue'
import NoeudModel from '../Noeud.model'
import { ifName } from './node_constantes'

export default class IfHtml extends NoeudModel {
  public name: string = ifName

  constructor(
    public condition: ComputableValue,
    public enfant: NoeudModel,
    public autreEnfant: NoeudModel | undefined = undefined,
  ) {
    super()
  }
}
