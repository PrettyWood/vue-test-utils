import ComponentWithInput from '~resources/components/component-with-input.vue'
import { describeWithShallowAndMount } from '~resources/utils'
import { itDoNotRunIf } from 'conditional-specs'
import { vueVersion } from '~resources/utils'
import Vue from 'vue'

describeWithShallowAndMount('setValue', mountingMethod => {
  it('sets element of input value', () => {
    const wrapper = mountingMethod(ComponentWithInput)
    const input = wrapper.find('input[type="text"]')
    input.setValue('foo')

    expect(input.element.value).to.equal('foo')
  })

  it('sets element of textarea value', () => {
    const wrapper = mountingMethod(ComponentWithInput)
    const textarea = wrapper.find('textarea')
    textarea.setValue('foo')

    expect(textarea.element.value).to.equal('foo')
  })

  it('updates dom with input v-model', async () => {
    const wrapper = mountingMethod(ComponentWithInput)
    const input = wrapper.find('input[type="text"]')
    input.setValue('input text awesome binding')
    await Vue.nextTick()

    expect(wrapper.text()).to.contain('input text awesome binding')
  })

  itDoNotRunIf(
    vueVersion < 2.1,
    'updates dom with input v-model.lazy',
    async () => {
      const wrapper = mountingMethod(ComponentWithInput)
      const input = wrapper.find('input#lazy')
      input.setValue('lazy')
      await Vue.nextTick()

      expect(wrapper.text()).to.contain('lazy')
    }
  )

  it('sets element of select value', () => {
    const wrapper = mountingMethod(ComponentWithInput)
    const select = wrapper.find('select')
    select.setValue('selectB')

    expect(select.element.value).to.equal('selectB')
  })

  it('updates dom with select v-model', async () => {
    const wrapper = mountingMethod(ComponentWithInput)
    const select = wrapper.find('select')
    select.setValue('selectB')
    await Vue.nextTick()

    expect(wrapper.text()).to.contain('selectB')
  })

  it('throws error if element is option', () => {
    const message =
      'wrapper.setValue() cannot be called on an <option> element. Use wrapper.setSelected() instead'
    shouldThrowErrorOnElement('option', message)
  })

  it('throws error if element is radio', () => {
    const message =
      'wrapper.setValue() cannot be called on a <input type="radio" /> element. Use wrapper.setChecked() instead'
    shouldThrowErrorOnElement('input[type="radio"]', message)
  })

  it('throws error if element is checkbox', () => {
    const message =
      'wrapper.setValue() cannot be called on a <input type="checkbox" /> element. Use wrapper.setChecked() instead'
    shouldThrowErrorOnElement('input[type="checkbox"]', message)
  })

  it('throws error if element is not valid', () => {
    const message = 'wrapper.setValue() cannot be called on this element'
    shouldThrowErrorOnElement('#label-el', message)
  })

  function shouldThrowErrorOnElement(selector, message) {
    const wrapper = mountingMethod(ComponentWithInput)
    const input = wrapper.find(selector)

    const fn = () => input.setValue('')
    expect(fn)
      .to.throw()
      .with.property('message', '[vue-test-utils]: ' + message)
  }
})
