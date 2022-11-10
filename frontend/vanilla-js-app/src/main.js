import '../style.css'
import './components/index.js'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'

const navbarProps = {
  title: {
    name: 'TODO',
    url: ''
  },
  links: [
    {name: 'Tasks', url: 'tasks'},
    {name: 'Users', url: 'users'},
  ]
}

const pages = [
  {
    path: '',
    redirectPath: 'tasks'
  },
  {
    path: 'tasks',
    element: `
      <h1>Tasks Page</h1>
    `
  },
  {
    path: 'users',
    element: `
      <h1>People Page</h1>
    `
  },
]

document.querySelector('#app').innerHTML = `
    <cc-navbar title='${JSON.stringify(navbarProps.title)}' links='${JSON.stringify(navbarProps.links)}'></cc-navbar>
    <cc-router pages='${JSON.stringify(pages)}'></cc-router>
`
