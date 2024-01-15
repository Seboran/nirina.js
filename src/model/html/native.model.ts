import NoeudModel from '../Noeud.model'

export default class NativeModel extends NoeudModel {
  public attrs: [string, string][]
  constructor(
    public name: string,
    public children: NoeudModel[],
    public style: Record<string, string | number> = {},
    ...attrs: [string, string][]
  ) {
    super()
    this.attrs = attrs
  }
}
