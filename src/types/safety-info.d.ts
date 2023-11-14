export interface ISafetyInfo {
  id: number | string
  name: string
  value: string
  unit?: string
}

export interface ISafeInfo {
  title: string
  percent?: number
  isUp?: boolean
  value?: string | number
  unit?: string
  info: ISafetyInfo[]
}
