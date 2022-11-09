/*
  Props:
    pages: {
      name: string,
      path: string,
      className: string,
    }[]
 */
class RouterLink extends HTMLElement {
  rendered = false

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  static get observedAttributes() {
    return ['pages', 'className'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.innerHTML = this.getTemplate()
  }

  getTemplate() {
    return `
      <a class="${this.className}" href="/${this.path}">${this.name}</a>
    `
  }

  get name() {
    return this.getAttribute('name')
      ? this.getAttribute('name')
      : ''
  }

  get path() {
    return this.getAttribute('path')
      ? this.getAttribute('path')
      : ''
  }

  get className() {
    return this.getAttribute('className')
      ? this.getAttribute('className')
      : ''
  }
}

customElements.define('cc-router-link', RouterLink)
