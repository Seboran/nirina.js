type listener<T> = (valeur: T) => void

export class ComputedList<T> {
  private l: listener<T[]>[] = []
  public value
  constructor(public initialList: T[]) {
    this.value = new Proxy(
      { state: initialList },
      {
        set: (target, prop, newValue) => {
          // @ts-ignore
          target[prop] = newValue
          this.l.forEach((f) => f(newValue))
          return true
        },
      },
    )
  }

  addListener(listen: listener<T[]>) {
    this.l.push(listen)
  }
}
