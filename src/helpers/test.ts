import Vue, { ComponentOptions } from 'vue'
import {
  createLocalVue,
  mount as vueMount,
  MountOptions,
  shallowMount as vueShallowMount,
  ShallowMountOptions
} from '@vue/test-utils'
import VueCompositionAPI from '@vue/composition-api'

const localVue = createLocalVue()
localVue.use(VueCompositionAPI)

export const mount = (
  Component: ComponentOptions<Vue>,
  options?: MountOptions<Vue>
) => vueMount(localVue.extend(Component), options)

export const shallowMount = (
  Component: ComponentOptions<Vue>,
  options?: ShallowMountOptions<Vue>
) => vueShallowMount(localVue.extend(Component), options)

export const checkOnMountAndUnmountEvents = async (
  target: any,
  events: string[],
  testComponent: Function
) => {
  const addEventListenerSpy = jest.spyOn(target, 'addEventListener')
  const removeEventListenerSpy = jest.spyOn(target, 'removeEventListener')
  const wrapper = mount(testComponent())
  await wrapper.vm.$nextTick()
  expect(addEventListenerSpy).toHaveBeenCalledTimes(events.length)
  events.forEach(event => {
    expect(addEventListenerSpy).toBeCalledWith(event, expect.any(Function))
  })

  // Destroy instance to check if the remove event listener is being called
  wrapper.destroy()
  expect(removeEventListenerSpy).toHaveBeenCalledTimes(events.length)
  events.forEach(event => {
    expect(removeEventListenerSpy).toBeCalledWith(event, expect.any(Function))
  })
}

export const checkOnStartEvents = async (
  target: any,
  events: string[],
  testComponent: Function
) => {
  const addEventListenerSpy = jest.spyOn(target, 'addEventListener')
  const wrapper = mount(testComponent())
  expect(addEventListenerSpy).toHaveBeenCalledTimes(events.length)
  wrapper.find('#stop').trigger('click')

  // Wait for Vue to append #start in the DOM
  await wrapper.vm.$nextTick()
  wrapper.find('#start').trigger('click')
  expect(addEventListenerSpy).toHaveBeenCalledTimes(events.length * 2)
}

export const checkOnStopEvents = async (
  target: any,
  events: string[],
  testComponent: Function
) => {
  const removeEventListenerSpy = jest.spyOn(target, 'removeEventListener')
  const wrapper = mount(testComponent())
  wrapper.find('#stop').trigger('click')

  // Wait for Vue to append #start in the DOM
  await wrapper.vm.$nextTick()
  expect(removeEventListenerSpy).toHaveBeenCalledTimes(events.length)
}

export const checkElementExistenceOnMount = async (
  mountType: boolean,
  testComponent: Function,
  elementName = '#isTracking'
) => {
  const wrapper = mount(testComponent(mountType))
  await wrapper.vm.$nextTick()
  expect(wrapper.find(elementName).exists()).toBe(mountType)
}
