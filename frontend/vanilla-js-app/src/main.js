import '../style.css'
import './components'
import './pages'
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
      <cc-tasks-page></cc-tasks-page>
    `
  },
  {
    path: 'users',
    element: `
      <cc-users-page></cc-users-page>
    `
  },
]

document.querySelector('#app').innerHTML = `
    <cc-navbar title='${JSON.stringify(navbarProps.title)}' links='${JSON.stringify(navbarProps.links)}'></cc-navbar>
    <cc-router pages='${JSON.stringify(pages)}'></cc-router>
`
