/* eslint-disable */
const { cd, exec, echo, touch } = require('shelljs')
const { readFileSync } = require('fs')
const url = require('url')

const pkg = JSON.parse(readFileSync('package.json'))
const repoUrl = pkg.repository.url
const parsedUrl = url.parse(repoUrl)
const repository = `${parsedUrl.host || ''}${parsedUrl.path || ''}`
const ghToken = process.env.GH_TOKEN

echo('Deploying docs!!!')
cd('docs')
touch('.nojekyll')
exec('git init')
exec('git add .')
exec('git config user.name "Salvatore Tedde"')
exec('git config user.email "microcipcip@gmail.com"')
exec('git commit -m "docs(docs): update gh-pages"')
exec(
  `git push --force --quiet "https://${ghToken}@${repository}" master:gh-pages`
)
echo('Docs deployed!!')
