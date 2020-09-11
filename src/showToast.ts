export enum TOAST_TYPE {
  INFO = 'info',
  WARNNING = 'warning',
  SUCCESS = 'success',
  LOADING = 'loading',
}
export function compareSemver(a: string, b: string) {
  const pa = a.split('.')
  const pb = b.split('.')
  for (let i = 0; i < 3; i++) {
    const na = Number(pa[i])
    const nb = Number(pb[i])
    if (na > nb) return 1
    if (nb > na) return -1
    if (!isNaN(na) && isNaN(nb)) return 1
    if (isNaN(na) && !isNaN(nb)) return -1
  }
  return 0
}
interface ToastParams {
  type?: TOAST_TYPE
  algin?: string
  message: string
  model?: 'banner' | 'alert'
}
// @ts-ignore
const showToast = (params: ToastParams) => {
  const version = (window['imTokenAgent'] || '').split(':')[1]
  if ((<any>window).imToken.callAPI && version) {
    if (compareSemver(version, '2.6.0') >= 0) {
      (<any>window).imToken.callAPI('native.toast', params)
    } else {
      (<any>window).imToken.callAPI('native.toastInfo', params.message)
    }
  }
}
export { showToast }
