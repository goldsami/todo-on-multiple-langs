/*
  Props:
    pages: {
      path: string,
      element: string,
    }[]
 */
export class Router extends HTMLElement {
  rendered = false

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.highlightLink(this.getInitialTab())
      this.rendered = true
    }
  }

  disconnectedCallback() {
    this.removeEventListeners()
  }

  static get observedAttributes() {
    return ['pages'];
  }

  getInitialTab() {
    const initialPath = window.location.pathname.slice(1)
    return this.pages.find(x => x.path === initialPath)
      ? initialPath
      : this.pages[0].path
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
    this.bindOnClickEvents()
  }

  render() {
    this.innerHTML = this.getTemplate()
  }

  getTemplate() {
    return this.pages[0].element
  }

  linkClickEventHandler(event, el) {
    event.preventDefault()
    const target = el.getAttribute('href').slice(1)
    this.pushState(target)
    this.highlightLink(target)
  }

  pushState(id) {
    window.history.pushState({id}, `${id}`, `/${id}`);
  }

  highlightLink(id) {
    document.querySelectorAll('.router-link')
      .forEach(el => el?.parentElement?.parentElement?.classList.remove('active'))
    document.querySelector(`li .router-link[href='/${id}']`)
      ?.parentElement?.parentElement.classList.add('active')
  }

  bindOnClickEvents() {
    document.querySelectorAll('.router-link')
      .forEach(el => el.addEventListener('click', event =>
        this.linkClickEventHandler(event, el)))
  }

  removeEventListeners() {
    document.querySelectorAll('.router-link')
      .forEach(el => el.removeEventListener('click', (event) =>
        this.linkClickEventHandler(event, el)))
  }

  get pages() {
    return this.getAttribute('pages')
      ? JSON.parse(this.getAttribute('pages'))
      : []
  }
}

customElements.define('cc-router', Router)
