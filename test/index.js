import requireDir from 'require-dir'

describe('components', () => {
  requireDir('./components', {recurse: true})
})

describe('util', () => {
  requireDir('./util', {recurse: true})
})

describe('services', () => {
  requireDir('./services', {recurse: true})
})
