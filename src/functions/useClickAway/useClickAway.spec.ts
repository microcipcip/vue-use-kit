import { checkOnMountAndUnmountEvents } from '@src/helpers/test'
import { ref } from '@src/api'
import { useClickAway } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = () => ({
  template: `
    <div id="outside-el">
      <div ref="dropdownRef" id="dropdown-trigger"></div>
      <div id="dropdown" v-if="isDropdownOpen"></div>
    </div>
  `,
  setup() {
    const dropdownRef = ref(null)
    const isDropdownOpen = ref(false)

    useClickAway(dropdownRef, () => {
      isDropdownOpen.value = true
    })

    return { dropdownRef, isDropdownOpen }
  }
})

describe('useClickAway', () => {
  const events = ['mousedown', 'touchstart']

  it('should call addEventListener on mount and unmount', async () => {
    await checkOnMountAndUnmountEvents(document, events, testComponent)
  })
})
