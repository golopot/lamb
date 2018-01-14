const {parser, reduce} = require('../index')


const testcases = [
  '(λx{x})(y)', // basic application
  '(λx{λy{x}})(t)', // closure
  '(λx{λy{λz{x}}})(t)(s)', // double-closure
  '(λx{λy{x}})(t)(s)', // non-local variable
  '(λx{λx{x}})(t)(s)', // parameter name collision
  '(λx{λt{x}})(t)(s)', // capture avoid
  '(λx{x})((λx{x})(t))', // reducible argument
  '(λx{λy{x(y)}})(t)(s)', // call in body
  '(λx{λy{x(y)}})(λx{x})(s)', // higher-order function
]

const negativeCases = [
  '(λx{x})y'
]

describe('parser', () => {
  for (let testcase of testcases){
    test(testcase, () => {
      const tree = parser.parse(testcase)
      expect(tree).toMatchSnapshot()
    })
  }
})

describe('reduce', () => {
  for (let testcase of testcases){
    test(testcase, () => {
      const tree = reduce(parser.parse(testcase))
      expect(tree).toMatchSnapshot()
    })
  }
})

describe('parser negative', () => {
  for (let negCase of negativeCases){
    test(negCase, () => {
      expect(() => {
        parser.parse(negCase)
      }).toThrow()
    })
  }
})
