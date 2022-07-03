import jsonServer from 'json-server';
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
import queryString from 'query-string';

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  } else if (req.method === 'PATCH') {
    req.body.updateAt = Date.now();
  }

  // Continue to JSON Server router
  next()
})

router.render = (req, res) => {
  const headers = res?.getHeaders();

  const totalCountHeader = headers['x-total-count'];
  if (req?.method === 'GET' && totalCountHeader) {
    // console.log('req', req)
    const queryParams = queryString.parse(req?._parsedOriginalUrl?.query);
    console.log('queryParams', queryParams)

    const result = {
      data: res?.locals?.data,
      pagination: {
        _page: Number.parseInt(queryParams?._page),
        _limit: Number.parseInt(queryParams?._limit),
        _totalRows: Number.parseInt(totalCountHeader),
      }
    }
    return res.jsonp(result);
  }
  
  res.jsonp({ data: res?.locals?.data})
}

// Use default router
server.use('/api',router)

// Start server
const PORT = process?.env?.PORT || 3000
server.listen(PORT, () => {
  console.log('JSON Server is running')
})