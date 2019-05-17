exports.entrys = () => {
  const parmas = {
    '-s': 'src',
    '-o': 'dist',
    '-h': 'static/index.html',
  }

  for (let i = 0; i < process.argv.length; i++) {
    const p = process.argv[i]
    if(p.charAt() === '-') {
      parmas[p] = process.argv[i + 1]
      if(typeof parmas[p] === 'undefined' && parmas[p].charAt() !== '-') {
        parmas[p] = true
      }
    }
  }

  return parmas
}
