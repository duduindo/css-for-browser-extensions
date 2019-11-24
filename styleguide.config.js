const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
const pathDocsComponents = path.resolve(__dirname, 'docs/components/')

dotenv.config()

// Variables
const port = process.env.STYLEGUIDE_PORT ? parseInt(process.env.STYLEGUIDE_PORT, 10) : 6060;


// Exports
module.exports = {
  serverPort: port,
  title: 'CSS for browser extensions - Style Guide',
  webpackConfig: require('./config/styleguide.js'),
  require: [
    path.join(__dirname, './src/sass/app.sass')
  ],
  getExampleFilename(componentPath) {
    const isPathComponents = componentPath.match('/common/components/')
    let path = null
    let pathFull = componentPath

    if (isPathComponents) {
      path = componentPath.replace(`${__dirname}/src/sass/entries/common/components/`, `${__dirname}/docs/components/`)
      pathFull = path.replace(/\.sass?$/, '.md')
    }

    return pathFull
  },
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md'
    },
    {
      name: 'Documentation',
      sections: [
        {
          name: 'Installation',
          content: 'docs/installation.md',
          description: 'The description for the installation section'
        },
        {
          name: 'Configuration',
          content: 'docs/configuration.md'
        },
        {
          name: 'Live Demo',
          external: true,
          href: 'http://example.com'
        }
      ]
    },
    {
      name: 'Components',
      sections: fs.readdirSync(pathDocsComponents).map(file => {
        const name = file.replace('.md', '')
        const content = `docs/components/${file}`

        return {name, content}
      }),
      exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
      usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
    },
  ],
  require: [
    path.join(__dirname, 'styleguide/global.requires.js'),
    path.join(__dirname, 'src/sass/app.sass'),
  ]
};
