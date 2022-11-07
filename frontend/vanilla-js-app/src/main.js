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

document.querySelector('#app').innerHTML = `
    <my-navbar title='${JSON.stringify(navbarProps.title)}' links='${JSON.stringify(navbarProps.links)}'></my-navbar>
    <task-card title="test task"></task-card>
`
