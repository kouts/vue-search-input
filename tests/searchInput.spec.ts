import { mount } from '@vue/test-utils'
import SearchInput from '@/SearchInput.vue'
import { fieldType } from '@/SearchInput.types'
import { nextTick } from 'vue'

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

    const div = await wrapper.find('div.search-icon.search')

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

  it('sets the value', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input')

    await input.setValue('test_value')

    expect(input.element.value).toBe('test_value')
  })

  it('emits the updated value', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input')

    await input.setValue('test_value')

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['test_value'])
  })

  it('clears the value when the clear icon is clicked', async () => {
    const wrapper = createWrapper({
      props: {
        modelValue: 'test'
      }
    })

    const clearIcon = await wrapper.find('div.search-icon.clear')

    await clearIcon.trigger('mousedown')

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([''])
  })

  it('esc key clears the value', async () => {
    const wrapper = createWrapper({
      props: {
        modelValue: 'test'
      }
    })

    const input = wrapper.find('input')

    await input.trigger('keydown', {
      key: 'Escape'
    })

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([''])
  })
})
