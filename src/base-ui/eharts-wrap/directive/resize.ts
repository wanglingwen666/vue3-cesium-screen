import { throttle } from '@/utils/index'
import type { DirectiveBinding } from 'vue'
// 自定义指令
//必须以 vNameOfDirective 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用。
export const vResize = {
  mounted(_el: Element, binding: DirectiveBinding) {
    const { value, arg, modifiers } = binding
    const num = arg && !isNaN(+arg) ? +arg : 30
    const handler = modifiers.throttle ? throttle(value, num) : value
    window.addEventListener('resize', handler, false)
  },

  unmounted(_el: Element, binding: DirectiveBinding) {
    window.removeEventListener('resize', binding.value, false)
  }
}
