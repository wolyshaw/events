module.exports = {
  port: 8000,
  title: 'events',
  proxy: {
    target: 'https://www.google.com',
    changeOrigin: true,
    secure: false
  },
  proxyFilters(pathname, req) {
    return req.method === 'POST'
  }
}
