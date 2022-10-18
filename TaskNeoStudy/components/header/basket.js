BASKET = document.getElementById('countProducts');

class Basket {
  render(count) {
    BASKET.innerHTML = count;
  }

  handleAddSessionStorage(id) {
    sessionStorageUtil.putProducts(id);
    this.render(sessionStorageUtil.productsCount);
  }
}

const basket = new Basket();
basket.render(sessionStorageUtil.productsCount);
