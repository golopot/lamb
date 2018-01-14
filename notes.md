* add trace
* use traditional notation
* numbers, booleans, lists?
* types



( λ x:A { λ y:B { x(y) } })(t)(s)


{x: A} |- M:B
----
( λ x:A { M } ) : A -> B

( λ x:A -> B { x } ) :  (A -> B) -> (A -> B)
( λ x:A -> B { x })(t) : B
( λ x:A -> B { λ y:A { x(y) } }) : (A -> B) -> A -> B
