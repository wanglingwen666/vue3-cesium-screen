import { App } from "vue";
import registerEleIcon from './register-ele-icon'

export function registerGlobalPlugin(app: App) {
  registerEleIcon(app)
}