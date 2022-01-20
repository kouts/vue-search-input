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

  it('should render a search icon', async () => {
    const wrapper = createWrapper()

    const div = await wrapper.find('div.search-icon search')

    expect(div).toBeTruthy()
  })

  it('should pass class to the input wrapper', async () => {
    const wrapper = createWrapper({
      attrs: {
        class: 'test-class'
      }
    })

    const div = await wrapper.find('div')

    expect(div.classes()).toContain('test-class')
  })

  it('should pass event listeners to the input', async () => {
    const onClick = jest.fn()
    const wrapper = createWrapper({ attrs: { onClick } })

    wrapper.find('input').trigger('click')

    expect(onClick).toHaveBeenCalled()
  })
})
