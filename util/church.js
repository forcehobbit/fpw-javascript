// https://www.willtaylor.blog/combinators-and-church-encoding-in-javscript/

/**
 * IDENTITY
 * The Kestrel is a function which takes two arguments and returns the first argument.
 */
const I = (a) => a;

/**
 * KESTREL
 * The Kestrel is a function which takes two arguments and returns the first argument.
 */
const K = (a) => (b) => a;

/**
 * KITE
 * The Kite is a function which takes two arguments and returns the second argument.
 */
const KI = (a) => (b) => b;

/**
 * CARDINAL
 * The Cardinal is a function which takes another function, who has 2 arguments, and flips those arguments.
 */
const C = (f) => (a) => (b) => f(b)(a);

/**
 * MOCKINGBIRD
 * The Mockingbird combinator takes a function and applies it to itself.
 */
const M = (a) => a(a);
