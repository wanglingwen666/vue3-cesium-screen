/**
 * 防抖
 * @param fn
 * @param time
 */
type ArgsType = Element | ResizeObserver
export const debounce = (fn: (...args: ArgsType[]) => void, delay = 200) => {
  let timer = 0

  return (...args: ArgsType[]) => {
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }

    timer = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
/**
 * 监听DOMresize：需要传入一个Element，和一个resize时的callback。使用时，需要在页面销毁前resizeObserver.unobserve()
 * @param el
 */
export const domResize = (el: Element, callback: (...args: ArgsType[]) => void) => {
  const debounceCallback: (...args: ArgsType[]) => void = debounce(callback)

  const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    const dom = entries[0].target
    debounceCallback(dom, resizeObserver)
  })

  // 监听元素
  resizeObserver.observe(el)
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
