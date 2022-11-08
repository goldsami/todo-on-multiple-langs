/*
  Props:
    pages: {
      path: string,
      element: string,
    }[]
 */
class Router extends HTMLElement {
  rendered = false

  connectCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  static get observedAttributes() {
    return ['pages'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.innerHTML = this.getTemplate()
  }

  getTemplate() {
    return this.pages[0].element
  }

  get pages() {
    return this.getAttribute('pages')
      ? JSON.parse(this.getAttribute('pages'))
      : []
  }
}

customElements.define('cc-router', Router)
