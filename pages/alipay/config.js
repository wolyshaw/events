module.exports = {
  port: 8000,
  title: '付款',
  proxy: {
    target: 'https://dev.lanjingfenqi.com',
    changeOrigin: true,
    secure: false
  },
  proxyFilters(pathname, req) {
    return req.method === 'POST' || /\.do$/.test(pathname)
  }
}
