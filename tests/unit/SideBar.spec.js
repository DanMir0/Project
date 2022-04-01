import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SideBar from '@/components/SideBar.vue'

describe('SideBar.vue', () => {
  it('renders title', () => {
    const wrapper = shallowMount(SideBar, {
      propsData: {}
    })
    expect(wrapper.text()).to.include('Склад')
  })
})
