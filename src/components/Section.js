class Section {
  constructor (renderer, containerSelector) {
    this._containerForAddItem = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  rendererItems = (items) => {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem = (item) => {
    this._containerForAddItem.append(item);
  }

  addItemToTop = (item) => {
    this._containerForAddItem.prepend(item);
  }

}

export default Section;
