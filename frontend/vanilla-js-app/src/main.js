import '../style.css'
import './components/index.js'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'

document.querySelector('#app').innerHTML = `
  <div>
    <task-card title="test task"></task-card>
  </div>
`
