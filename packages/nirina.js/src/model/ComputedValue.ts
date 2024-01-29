type listener = (valeur: boolean) => void

export class ComputableValue {
  private listeners: listener[] = []
  public value
  constructor(public initialValue: boolean) {
    this.value = new Proxy(
      { state: initialValue },
      {
        set: (target, prop, newValue) => {
          // @ts-ignore
          target[prop] = newValue
          this.listeners.forEach((f) => f(newValue))
          return true
        },
      },
    )
  }

  addListener(listen: listener) {
    this.listeners.push(listen)
  }
}
