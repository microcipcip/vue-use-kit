import { addParameters } from '@storybook/vue'
import { create } from '@storybook/theming'
import pkg from '../package.json'
// Global styling and icons
import './styles.css'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'

const basicTheme = create({
  base: 'light',
  brandTitle: '🛠️ Vue use kit',
  brandUrl: pkg.repository.url,
  brandImage: 'https://raw.githubusercontent.com/microcipcip/vue-use-kit/master/public/branding/logo-storybook.png',
})

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'right',
    theme: basicTheme
  }
})

export function loadStories() {
  const req = require.context('../src', true, /\.story\.ts$/)
  req.keys().forEach(mod => req(mod))
}
