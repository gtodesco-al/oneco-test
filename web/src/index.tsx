import './index.css'
import ReactDOM from 'react-dom'
import rgbColors from './utils/colors'
import './i18n'
import Pages from './pages/Pages'

// set all shades within the color group as css custom properties on the :root.
function setCustomProperties(cssProp: string, colorGroup: string) {
  if (cssProp && colorGroup) {
    const shades = rgbColors[colorGroup]
    if (shades) {
      const keys = Object.keys(shades)
      keys.forEach((key) => {
        document.documentElement.style.setProperty(
          `--${cssProp}-${key}`,
          shades[key]
        )
      })
    }
  }
}

// create the css custom props based on a tailwind color group
setCustomProperties('color-primary', 'sky')
setCustomProperties('color-secondary', 'orange')

ReactDOM.render(<Pages />, document.querySelector('body'))
