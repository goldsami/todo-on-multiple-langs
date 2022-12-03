class ModalWindow extends HTMLElement {
  rendered = false

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.innerHTML = this.getTemplate()
  }

  getTemplate(name, imageUrl, description) {
    return `
      hello
    `
  }

  get name() {
    return this.getAttribute('name') || ''
  }

  get imageUrl() {
    return this.getAttribute('imageUrl') || ''
  }

  get description() {
    return this.getAttribute('description') || ''
  }
}

customElements.define('cc-user-card', UserCard)
