import type { NoeudModel } from '../model'

export default interface IBuilder<K extends NoeudModel> {
  build(): K
}
