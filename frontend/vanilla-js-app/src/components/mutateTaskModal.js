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
      <div class="modal-window" id="task-modal" style="display: none;">
        <h3 id="modal-name"></h3>
        <form id="task-form">
          <label for="task-name">Name:</label>
          <input type="text" id="task-name" required><br>
          <label for="task-description">Description:</label>
          <textarea id="task-description"></textarea><br>
          <label for="task-user">User:</label>
          <select id="task-user"></select><br>
          <label for="task-time">Time:</label>
          <input type="datetime-local" id="task-time" required><br>
          <button type="submit">Save</button>
        </form>
        <button id="cancel-button">Cancel</button>
      </div>
    `
  }
}

customElements.define('cc-mutate-task-modal', MutateTaskModal)
