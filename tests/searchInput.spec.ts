import { mount } from '@vue/test-utils'
import SearchInput from '@/SearchInput.vue'
import { fieldType } from '@/SearchInput.types'

const createWrapper = (opts?: Record<string, unknown>) => {
  return mount(SearchInput, opts)
}

describe('SearchInput.vue', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it.each(fieldType)('should render an input with type %s', (typeProp) => {
    const wrapper = createWrapper({
      props: {
        type: typeProp
      }
    })

    const input = wrapper.find(typeProp)

    expect(input).toBeTruthy()
  })
})
