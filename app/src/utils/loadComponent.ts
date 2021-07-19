declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>
// eslint-disable-next-line camelcase
declare const __webpack_share_scopes__: { default: unknown }

/**
 * webpack 官网 demo
 * @param scope 
 * @param module 
 * @returns 
 */
async function loadComponent (scope: any, module: any): Promise<unknown> {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  // eslint-disable-next-line camelcase
  await __webpack_init_sharing__('default')
  const container: any = window[scope] // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  // eslint-disable-next-line camelcase
  await container.init(__webpack_share_scopes__.default)
  const factory = await (window[scope] as any).get(module)
  const Module = factory()
  return Module
}

/**
 * 加载 remoteEntry 方法
 * @param url 
 * @param scope 
 * @returns 
 */
function loadRemoteEntryScript (url: string, scope: any): Promise<unknown> {
  const element = document.createElement('script')
  return new Promise((resolve, reject) => {
    if (!url) {
      return reject(new Error(`remoteEntry url is undefined: ${url}`))
    }
    element.src = url
    element.type = 'text/javascript'
    element.async = true

    element.onload = () => {
      resolve(scope)
    }

    element.onerror = () => {
      reject(new Error(`Dynamic Script Error: ${url}`))
    }

    document.head.appendChild(element)
  }).finally(() => {
    console.log(`Dynamic Script Removed: ${url}`)
    document.head.removeChild(element)
  })
}

export {
  loadComponent,
  loadRemoteEntryScript
}