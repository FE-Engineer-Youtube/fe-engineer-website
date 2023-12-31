/*
 * @see https://www.npmjs.com/package/node-cache
 */
import NodeCache from 'node-cache'
let cache: NodeCache

declare global {
  var __cache: NodeCache | undefined
}

if (process.env.NODE_ENV === 'production') {
  cache = new NodeCache({ stdTTL: 1800, checkperiod: 600 })
} else {
  if (!global.__cache) {
    global.__cache = new NodeCache({ stdTTL: 1800, checkperiod: 600 })
  }
  cache = global.__cache
}

export { cache }
