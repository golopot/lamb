{
  const newNode = (type, obj) => {
    const node = {type}
    Object.assign(node, obj)
    return node
  }

}

Term
  = Abstraction
  / Application
  / CompactTerm

Abstraction
  = 'λ' _ a:IdentTerm _ '{' _ b:Term _ '}' _
    {
      return {
        type: 'λ',
        parameter: a,
        body: b
      }
    }

Application
  = a:CompactTerm _ b:ParenTermUnwarped+ _
    {
      // FIXME node change shape. Optimation killer.
      let node = a
      for (let argument of b){
        node = {
          type: 'call',
          func: node,
          argument,
        }
      }
      return node
    }

CompactTerm
  = ParenTerm
  / IdentTerm

ParenTerm
  = '(' _ a:Term _ ')' _
    {
      return {
        type: 'paren',
        x: a,
      }
    }

ParenTermUnwarped
  = '(' _ a:Term _ ')' { return a }

IdentTerm
  = a:[a-z] _ {
    return {
      type: 'ident',
      name: a,
    }
}

_ "whitespace"
  = [ \t\n\r]*
