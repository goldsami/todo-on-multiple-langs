class MutateTaskModal extends HTMLElement {
  rendered = false

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  static get observedAttributes() {
    return ['isCreateModal'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.innerHTML = this.getTemplate(this.isCreateModal)
  }

  getTemplate(isCreateModal) {
    return `
      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>${isCreateModal ? 'Create' : 'Update'} Task</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Submit</a>
        </div>
      </div>
    `
  }

  get isCreateModal() {
    return this.getAttribute('isCreateModal') || false
  }
}

customElements.define('cc-mutate-task-modal', MutateTaskModal)
