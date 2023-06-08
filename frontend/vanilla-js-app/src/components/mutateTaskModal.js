class MutateTaskModal extends HTMLElement {
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
      <div class="overlay"></div>
      <div class="modal modal-window" id="task-modal" style="display: none;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="modal-name" class="modal-title"></h5>
          </div>
          <form id="task-form">
            <div class="modal-body">
              <label for="task-name" class="form-label">Name</label>
              <input type="text" id="task-name" class="form-control" required><br>
              <label for="task-description" class="form-label">Description</label>
              <textarea id="task-description" class="form-control"></textarea><br>
              <label for="task-user" class="form-label">User</label>
              <select id="task-user" class="form-control form-select"></select><br>
              <label for="task-time" class="form-label">Time</label>
              <input type="datetime-local" id="task-time" class="form-control" required><br>
            </div>
            <div class="modal-footer">
              <button id="cancel-button" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    `
  }
}

customElements.define('cc-mutate-task-modal', MutateTaskModal)
