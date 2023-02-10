class UpdateTaskModal extends HTMLElement {
  rendered = false

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  static get observedAttributes() {
    return ['test'];
  }

  get test() {
    return this.getAttribute('test')
      // ? JSON.parse(this.getAttribute('test'))
      ? this.getAttribute('test')
      : null
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.innerHTML = this.getTemplate()
  }

  getTemplate() {
    return `
      <div id="updateTaskModal" class="modal">
        <div class="modal-content">
          <h4>Update Task ${this.test}</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Submit</a>
        </div>
      </div>
    `
  }
}

customElements.define('cc-update-task-modal', UpdateTaskModal)
