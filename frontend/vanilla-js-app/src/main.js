import '../style.css'
import './components/index.js'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'

const navbarProps = {
  title: {
    name: 'TODO',
    url: '/'
  },
  links: [
    {name: 'Tasks', url: '/tasks'},
    {name: 'Users', url: '/users'},
  ]
}

const pages = [
  {
    path: '',
    element: `
      <h1>Home Page</h1>
      <task-card title="test task"></task-card>
    `
  }
]

document.querySelector('#app').innerHTML = `
    <cc-navbar title='${JSON.stringify(navbarProps.title)}' links='${JSON.stringify(navbarProps.links)}'></cc-navbar>
    <cc-router pages='${JSON.stringify(pages)}'></cc-router>
`
