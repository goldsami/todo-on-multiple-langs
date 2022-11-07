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

  connectCallback() {
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
        <nav>
          <div class="nav-wrapper">
            <a href="${title.url}" class="brand-logo">${title.name}</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              ${links.map(x => (
                `<li><a href="${x.url}">${x.name}</a></li>`
              )).join('')}
            </ul>
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

customElements.define('my-navbar', Navbar)
