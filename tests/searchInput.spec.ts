import { mount } from '@vue/test-utils'
import SearchInput from '@/SearchInput.vue'
import { fieldType } from '@/SearchInput.types'
import { nextTick } from 'vue'

const createWrapper = (opts?: Record<string, unknown>) => {
  return mount(SearchInput, opts)
}

const createWrapperContainer = (componentArgs?: Record<string, unknown>) => {
  const args = componentArgs || {}
  const wrapperContainer = {
    components: {
      SearchInput
    },
    data() {
      return {
        searchText: '',
        args
      }
    },
    template: `
      <div>
        <select>
          <option></option>
        </select>
        <SearchInput v-model="searchText" v-bind="args" />
      </div>
    `
  }

  return mount(wrapperContainer, {
    attachTo: document.body,
    global: {
      stubs: {
        transition: false
      }
    }
  })
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

  it('focuses the input when the "/" key is pressed', async () => {
    const wrapper = createWrapperContainer()

    const event = new KeyboardEvent('keydown', { key: '/' })
    document.dispatchEvent(event)

    const input = wrapper.find('input[data-search-input="true"]')

    expect(input.element).toBe(document.activeElement)
  })

  it('removes the keydown event listener when unmounted', async () => {
    const removeSpy = jest.spyOn(document, 'removeEventListener').mockImplementation()
    const wrapper = createWrapper()

    wrapper.unmount()
    expect(removeSpy).toHaveBeenCalled()
  })

  it('removes the keydown event listener when shortcutIcon prop turns false', async () => {
    const removeSpy = jest.spyOn(document, 'removeEventListener').mockImplementation()
    const wrapper = createWrapper()

    wrapper.setProps({
      shortcutIcon: false
    })

    expect(removeSpy).toHaveBeenCalled()
  })

  it('selects the input text when focused with the "/" key', async () => {
    const wrapper = createWrapper({
      props: {
        modelValue: 'test'
      }
    })

    const event = new KeyboardEvent('keydown', { key: '/' })
    document.dispatchEvent(event)

    const input = await wrapper.find('input[data-search-input="true"]')

    const inputEl = input.element as HTMLInputElement

    expect(inputEl.selectionStart).toBe(0)
    expect(inputEl.selectionEnd).toBe(4)
  })

  it('focuses the input text when the "/" key is pressed', async () => {
    const wrapper = createWrapper({
      attachTo: document.body,
      props: {
        modelValue: 'test'
      }
    })

    const event = new KeyboardEvent('keydown', { key: '/' })
    document.dispatchEvent(event)

    const input = await wrapper.find('input')

    expect(input.element).toBe(document.activeElement)
  })
})
