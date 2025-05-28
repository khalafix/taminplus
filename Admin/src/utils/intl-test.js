import { IntlProvider } from 'react-intl'
import { mount, shallow } from 'enzyme'

import fa from '../lang/fa.json'
const defaultLocale = 'fa'
const locale = defaultLocale

// Mount component with Intl
export function mountWithIntl(node) {
  return mount(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      fa
    }
  })
}

// Shallow component with Intl
export function shallowWithIntl(node) {
  return shallow(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      fa
    }
  })
}
