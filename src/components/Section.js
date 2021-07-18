class Section {
  constructor ({items, renderer}, containerSelector) {
    this._containerForAddItem = document.querySelector(containerSelector);
    this._items = items;
    this._renderer = renderer;
  }

  rendererItems = () => {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem = (item) => {
    this._containerForAddItem.prepend(item);
  }

}

export default Section;
