import { showToast, TOAST_TYPE } from './showToast'

type OptionsProps = {
  toast: {
    type?: TOAST_TYPE
    message: string
    align?: string
    model?: 'banner' | 'alert'
  }
  handler?: Function
}

function handleError(options: OptionsProps, error: any) {
  if (options.toast) {
    showToast({
      ...options.toast,
    })
  }
  options.handler && options.handler(error)
}

function wrapHandleError(originalMethod: Function, options: OptionsProps) {
  return function (this: Function, ...args: any[]) {
    try {
      const result = originalMethod.apply(this, args)

      // if method is asynchronous
      if (result instanceof Promise) {
        return result.catch((error: any) => {
          return handleError(options, error)
        })
      }
      return result
    } catch (error) {
      return handleError(options, error)
    }
  }
}

function decorate(options: OptionsProps): any {
  return function (target: any, propertyName: string, descriptor?: any) {
    // bound instance methods
    if (!descriptor) {
      Object.defineProperty(target, propertyName, {
        configurable: true,
        enumerable: false,
        get() {
          return undefined
        },
        set(oridinalMethod) {
          Object.defineProperty(this, propertyName, {
            enumerable: false,
            writable: true,
            configurable: true,
            value: wrapHandleError(oridinalMethod, options).bind(this),
          })
        },
      })
      return
    }

    if (descriptor.initializer) {
      return {
        enumerable: false,
        configurable: true,
        writable: true,
        initializer() {
          return wrapHandleError(descriptor.initializer!.call(this), options)
        },
      }
    }

    if (descriptor.value) {
      const oridinalMethod = descriptor.value
      return {
        value: wrapHandleError(oridinalMethod, options),
        enumerable: false,
        configurable: true,
      }
    }

    return descriptor
  }
}

function catchError(options: OptionsProps) {
  return decorate(options)
}

export { catchError, TOAST_TYPE }
