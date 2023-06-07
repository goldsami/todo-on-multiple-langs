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
      <div class="user-card">
        <div class="card">
          <div class="card-image">
            <img style="object-fit: cover; height: 300px" src="${imageUrl}">
            <span class="card-title">${name}</span>
          </div>
          <div class="card-content">
            <p>${description}</p>
          </div>
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
