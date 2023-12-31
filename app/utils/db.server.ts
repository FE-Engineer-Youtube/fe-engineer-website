/*
 * @see https://www.npmjs.com/package/node-cache
 */
import NodeCache from 'node-cache'
let cache: NodeCache

declare global {
  var __cache: NodeCache | undefined
}

if (process.env.NODE_ENV === 'production') {
  cache = new NodeCache({ stdTTL: 1200, checkperiod: 120 })
} else {
  if (!global.__cache) {
    global.__cache = new NodeCache({ stdTTL: 1200, checkperiod: 120 })
  }
  cache = global.__cache
}

export { cache }
