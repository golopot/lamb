const peg = require('pegjs')
const pegGrammar = require('fs').readFileSync('./parser.pegjs').toString()
const parser = peg.generate(pegGrammar)


function unwrapParen(node){
  while(node.type === 'paren') node = node.x
  return node
}

function reduce(node){
  node = unwrapParen(node)
  if (node.type === 'call'){
    const func = reduce(node.func)
    const {argument} = node
    if (func.type === 'λ'){
      return betaReduction(func, argument)
    }
    else if (func.type === 'ident'){
      return {
        type: 'call',
        func,
        argument,
      }
    }
    else{
      throw new Error('Should be unreachable.')
    }
  }
  else if (node.type === 'λ'){
    return node
  }
  else if (node.type === 'ident'){
    return node
  }
  else{
    throw new Error('Should be unreachable.')
  }

}

function betaReduction(func, argument){
  const body = func.body
  const from = func.parameter.name
  const to = argument.name
  const env = func.env
  if (body.type === 'ident'){
    const locals = Object.assign({}, env, {[from]: to})
    return locals[body.name]
  }
  else if (body.type === 'λ'){
    const closure = Object.assign({}, body)
    closure.env = Object.assign({}, env, {[from]: to})
    return closure
  }
  else if (body.type === 'call'){
    return reduce(body)
  }
  else {
    throw new Error('Should be unreachable.')
  }
}

function main(){

  const input = '(λx{λy{x(y)}})(λx{x})(s)'
  console.log('Input: \n' + input + '\n')
  const tree = parser.parse(input)
  console.log('Tree: ')
  console.log(JSON.stringify(tree, null, 2))
  console.log('')
  const reduced = reduce(tree)
  console.log('Reduced: ')
  console.log(reduced)

}

if (require.main === module){
  try{
    main()
  }
  catch(e){
    console.error(e)
  }
}

module.exports = {
  parser,
  reduce,
}
