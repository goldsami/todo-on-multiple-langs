/*
  Props:
    name: string
    imageUrl: string
    description: string
 */
class UserCard extends HTMLElement {
  rendered = false

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  static get observedAttributes() {
    return ['name', 'imageUrl', 'description'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.innerHTML = this.getTemplate(this.name, this.imageUrl, this.description)
  }

  getTemplate(name, imageUrl, description) {
    return `
      <div class="card user-card" style="width: 20rem;">
        <img src="${imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
        </div>
      </div>
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
