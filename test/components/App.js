import React from 'react'
import { shallow } from 'enzyme'
import App from '../../src/js/components/App'

describe('App', () => {
  it('should render', () => {
    shallow(
      <App params={{}} history={{}} />
    )
  })
})
