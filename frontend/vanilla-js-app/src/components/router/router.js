/*
  Props:
    pages: {
      path: string,
      element?: string,
      redirectPath?: string
    }[]
 */
export class Router extends HTMLElement {
  rendered = false

  connectedCallback() {
    if (!this.rendered) {
      this.render(this.getInitialTab())
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
    const page = this.pages.find(x => x.path === initialPath) || this.pages[0]

    if (page.redirectPath) {
      this.pushState(page.redirectPath)
      return page.redirectPath
    }

    return page.path
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render(this.getInitialTab());
    this.bindOnClickEvents()
  }

  render(id) {
    this.innerHTML = this.getTemplate(id)
    this.highlightLink(id)
  }

  getTemplate(id) {
    return this.pages.find(x => x.path === id).element
  }

  linkClickEventHandler(event, el) {
    event.preventDefault()
    const eventHref = el.getAttribute('href').slice(1)
    const targetPage = this.pages.find(x => x.path === eventHref)
    const target = targetPage.redirectPath || targetPage.path
    this.pushState(target)
    this.render(target)
  }

  pushState(id) {
    window.history.pushState({id}, `${id}`, `/${id}`);
  }

  highlightLink(id) {
    document.querySelectorAll('.router-link')
      .forEach(el => el?.classList.remove('active'))
    document.querySelector(`li .router-link[href='/${id}']`).classList.add('active')
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
