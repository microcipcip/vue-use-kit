import { configure } from '@storybook/vue'
import { loadStories } from './configureStorybook'
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)

configure(loadStories, module)
