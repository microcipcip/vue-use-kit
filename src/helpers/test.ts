import Vue, { ComponentOptions } from 'vue'
import {
  createLocalVue,
  mount as vueMount,
  MountOptions,
  shallowMount as vueShallowMount,
  ShallowMountOptions
} from '@vue/test-utils'
import VueCompositionAPI from '../api'

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
