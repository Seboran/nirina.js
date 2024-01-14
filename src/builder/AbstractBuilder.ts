export default abstract class AbstractBuilder {
  static init(): AbstractBuilder {
    throw new Error('You have to implement the method requiredMethod!')
  }
}
