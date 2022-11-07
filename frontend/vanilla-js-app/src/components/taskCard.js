/*
  Props:
    title: string
 */
class TaskCard extends HTMLElement {
  rendered = false

  connectCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.innerHTML = this.getTemplate(this.title)
  }

  getTemplate(title = '') {
    return `
        <div class="task-card">
            ${title}
        </div>
    `
  }

  get title() {
    return this.getAttribute('title') || ''
  }
}

customElements.define('task-card', TaskCard)
