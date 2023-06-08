import {Router} from './router'

const defaultItem = {
  name: '',
  url: '#',
}

/*
  Props:
    title: {name: string, url: string}
    links: {name: string, url: string}[]
 */
class Navbar extends HTMLElement {
  rendered = false

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  static get observedAttributes() {
    return ['title', 'links'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.innerHTML = this.getTemplate(this.title, this.links)
  }

  getTemplate(title = defaultItem, links = []) {
    return `
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <cc-router-link className="navbar-brand" path="${title.url}" name="${title.name}"></cc-router-link>
            <div id="navbarNav">
              <ul class="navbar-nav flex-row">
                ${links.map(x => (`
                  <li class="nav-item">
                    <cc-router-link className="nav-link p-2" path="${x.url}" name="${x.name}"></cc-router-link>
                  </li>
                `)).join('')}
              </ul>
            </div>
          </div>
        </nav>
    `
  }

  get title() {
    return this.getAttribute('title')
      ? JSON.parse(this.getAttribute('title'))
      : defaultItem
  }

  get links() {
    return this.getAttribute('links')
      ? JSON.parse(this.getAttribute('links'))
      : defaultItem
  }
}

customElements.define('cc-navbar', Navbar)
