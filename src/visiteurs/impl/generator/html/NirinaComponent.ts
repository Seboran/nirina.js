export type NirinaComponent = {
  template: string
  script: () => void
  style?: Record<string, Record<string, string | number>>
}
