type ThrottleFn = (...args: any[]) => void
interface ThrottleReturn {
  (...args: Parameters<ThrottleFn>): void
  cancel: () => void
}
export function throttle<T extends ThrottleFn>(fn: T, interval = 100): ThrottleReturn {
  let timer: ReturnType<typeof setTimeout> | null = null

  const throttledFunction = function (...args: Parameters<T>) {
    if (!timer) {
      // @ts-ignore
      fn.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, interval)
    }
  }

  throttledFunction.cancel = function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return throttledFunction as ThrottleReturn
}

/**
 *  实现对象深拷贝
 * @param originValue
 * @param map
 * @returns
 */
export function deepCopy(originValue: any, map = new WeakMap()) {
  if (originValue === null || typeof originValue !== 'object' || typeof originValue === 'function') {
    return originValue
  }

  // 判断Map类型
  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  // 判断Set类型
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }

  // 判断Symbol类型
  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description)
  }

  // 判断Date类型
  if (originValue instanceof Date) {
    return new Date(originValue)
  }

  // 判断是否是正则
  if (originValue instanceof RegExp) {
    return new RegExp(originValue)
  }

  if (map.has(originValue)) {
    return map.get(originValue)
  }

  // 判断是传入数据是数组还是对象
  const newObj: any = Array.isArray(originValue) ? [] : {}
  map.set(originValue, newObj)
  for (const key in originValue) {
    newObj[key] = deepCopy(originValue[key], map)
  }

  // 对Symbol进行特殊处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for (const sKey of symbolKeys) {
    newObj[sKey] = deepCopy(originValue[sKey], map)
  }

  return newObj
}
