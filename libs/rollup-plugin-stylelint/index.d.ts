import { LinterOptions } from 'stylelint'

interface StylintPluginOptions extends Partial<LinterOptions> {
  include?: Array<string | RegExp> | string | RegExp | null
  exclude?: Array<string | RegExp> | string | RegExp | null
  throwOnError?: boolean
  throwOnWarning?: boolean
}
export declare function stylelint({
  include,
  exclude,
  formatter,
  throwOnError,
  throwOnWarning,
  ...options
}?: StylintPluginOptions): {
  name: string
  transform(code: string, id: string): Promise<void> | undefined
}
export {}
