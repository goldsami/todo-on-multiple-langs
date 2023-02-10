class CreateTaskModal extends HTMLElement {
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

  getTemplate() {
    return `
      <div id="createTaskModal" class="modal">
        <div class="modal-content">
          <h4>Create Task</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Submit</a>
        </div>
      </div>
    `
  }
}

customElements.define('cc-create-task-modal', CreateTaskModal)
