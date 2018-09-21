const fs = require('fs')
const glob = require('glob-all')
const changeCase = require('change-case')

const appShellFiles = glob.sync('public/snippet/controls/**/index.html')
const appShells = []
appShellFiles.forEach(function (f) {
  const title = f.split('/')[3].replace(/-/g, ' ')
  if(title==='textbox' || title==='checkbox' || title === 'radio' || title === 'text area' || title==='dropdown'){
    appShells.push({
      type: 'form',
      name: changeCase.upperCaseFirst(title),
      path: `/${f}`
    })
  }else {
    appShells.push({
      type: 'all',
      name: changeCase.upperCaseFirst(title),
      path: `/${f}`
    })
  }
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

fs.writeFileSync('public/static/controls.json', JSON.stringify(appShells, null, 2))
