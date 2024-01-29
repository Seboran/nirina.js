export default abstract class AbstractBuilder {
  protected style: Record<string, string | number> = {}

  static init(): AbstractBuilder {
    throw new Error('You have to implement the method requiredMethod!')
  }

  setCss(property: string, value: string | number): this {
    this.style[property] = value
    return this
  }
}
