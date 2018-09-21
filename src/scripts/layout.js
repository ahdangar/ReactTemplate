const fs = require('fs')
const glob = require('glob-all')
const changeCase = require('change-case')

const appShellFiles = glob.sync('public/snippet/layouts/**/index.html')
const appShells = []
appShellFiles.forEach(function (f) {
  const title = f.split('/')[3].replace(/-/g, ' ')
  appShells.push({
    type: 'applicationShell',
    name: changeCase.upperCaseFirst(title),
    path: `/${f}`
  })
})

// const pageFiles = glob.sync('public/snippet/app-shells/**/index.html')
// pageFiles.forEach(function (f) {
//   const title = f.split('/')[3].replace(/-/g, ' ')
//   appShells.push({
//     type: 'page',
//     name: changeCase.upperCaseFirst(title),
//     path: `/${f}`
//   })
// })

fs.writeFileSync('public/static/layouts.json', JSON.stringify(appShells, null, 2))
