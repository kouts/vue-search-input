import SearchInput from '@/SearchInput.vue'
import { fieldType } from '@/SearchInput.types'
import { mount } from '@vue/test-utils'

const INPUT_SELECTOR = 'input[data-search-input="true"]'

const createWrapper = (opts?: Record<string, unknown>) => {
  return mount(SearchInput, opts)
}

const createWrapperContainer = () => {
  const wrapperContainer = {
    components: {
      SearchInput
    },
    data() {
      return {
        searchText1: '',
        searchText2: ''
      }
    },
    template: `
      <div>
        <SearchInput v-model="searchText1" />
        <SearchInput v-model="searchText2" />
      </div>
    `
  }

  return mount(wrapperContainer, {
    attachTo: document.body
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

    const i = await wrapper.find('i.search-icon.search')

    expect(i).toBeTruthy()
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

    const button = await wrapper.find('button.search-icon.clear')

    await button.trigger('mousedown')

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([''])
  })

  it('clears the value with the "esc" key', async () => {
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
    const wrapper = createWrapper({
      attachTo: document.body
    })

    const event = new KeyboardEvent('keydown', { key: '/' })

    document.dispatchEvent(event)

    const input = wrapper.find(INPUT_SELECTOR)

    expect(input.element).toBe(document.activeElement)
  })

  it('removes the keydown event listener when unmounted', async () => {
    const removeSpy = jest.spyOn(document, 'removeEventListener').mockImplementation()
    const wrapper = createWrapper()

    wrapper.unmount()
    expect(removeSpy).toHaveBeenCalled()
  })

  it('removes the keydown event listener when shortcutListenerEnabled prop turns false', async () => {
    const removeSpy = jest.spyOn(document, 'removeEventListener').mockImplementation()
    const wrapper = createWrapper()

    wrapper.setProps({
      shortcutListenerEnabled: false
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

    const input = await wrapper.find(INPUT_SELECTOR)

    const inputEl = input.element as HTMLInputElement

    expect(inputEl.selectionStart).toBe(0)
    expect(inputEl.selectionEnd).toBe(4)
  })

  it('focuses the input text when the "/" key is pressed', async () => {
    const wrapper = createWrapperContainer()

    const inputs = await wrapper.findAll(INPUT_SELECTOR)

    Object.defineProperty(inputs[0].element as HTMLInputElement, 'offsetWidth', { value: 10, writable: true })
    Object.defineProperty(inputs[1].element as HTMLInputElement, 'offsetWidth', { value: 10, writable: true })

    const event = new KeyboardEvent('keydown', { key: '/' })

    document.dispatchEvent(event)

    expect(inputs[0].element).toBe(document.activeElement)
  })

  it('should render a shortcut icon when the hideShortcutIconOnBlur prop is false', async () => {
    const wrapper = createWrapper({
      props: {
        hideShortcutIconOnBlur: false
      }
    })

    const i = await wrapper.find('i.search-icon.shortcut')

    expect(i).toBeTruthy()
  })

  it('renders the prepend slot', async () => {
    const wrapper = createWrapper({
      slots: {
        prepend: '<div class="prepend">prepend content</div>'
      }
    })

    const prepend = wrapper.find('.prepend')
    const i = wrapper.find('i.search-icon.search')

    expect(prepend.element.nextElementSibling).toEqual(i.element)
  })

  it('renders the prepend-inner slot', async () => {
    const wrapper = createWrapper({
      slots: {
        'prepend-inner': '<div class="prepend-inner">prepend-inner content</div>'
      }
    })

    const prependInner = wrapper.find('.prepend-inner')
    const i = wrapper.find('i.search-icon.search')

    expect(i.element.nextElementSibling).toEqual(prependInner.element)
  })

  it('renders the append slot', async () => {
    const wrapper = createWrapper({
      slots: {
        append: '<div class="append">append content</div>'
      }
    })

    const append = wrapper.find('.append')
    const i = wrapper.find('i.search-icon.shortcut')

    expect(append.element.nextElementSibling).toEqual(i.element)
  })

  it('renders the append-outer slot', async () => {
    const wrapper = createWrapper({
      slots: {
        'append-outer': '<div class="append-outer">append-outer content</div>'
      }
    })

    const appendOuter = wrapper.find('.append-outer')
    const i = wrapper.find('i.search-icon.shortcut')

    expect(i.element.nextElementSibling).toEqual(appendOuter.element)
  })
})
