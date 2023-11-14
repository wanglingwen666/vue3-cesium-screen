/**
 * 防抖
 * @param fn 
 * @param time 
 */
type ArgsType = Element | ResizeObserver;
export const debounce = (fn: (...args: ArgsType[]) => void, delay = 200) => {
  let timer = 0;

  return (...args: ArgsType[]) => {
    if (timer) {
      clearTimeout(timer);
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

  const debounceCallback: (...args: ArgsType[]) => void = debounce(callback);

  const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    const dom = entries[0].target;
    debounceCallback(dom, resizeObserver)
  });

  // 监听元素
  resizeObserver.observe(el);
};