MAIN_PRODUCTS = document.getElementById('products');

class Products {
  handleAddSessionStorage(id) {
    sessionStorageUtil.putProducts(id);
    basket.render(sessionStorageUtil.productsCount);
    this.render();
  }
  handleRemoveSessionStorage(id) {
    sessionStorageUtil.removeProduct(id);
    basket.render(sessionStorageUtil.productsCount);
    this.render();
  }
  handleAllRemoveSessionStorage(id) {
    sessionStorageUtil.removeAllProducts(id);
    basket.render(sessionStorageUtil.productsCount);
    this.render(id);
  }
  render() {
    // debugger;
    const productsStore = sessionStorageUtil.getProducts();
    let htmlCatalog = '';
    let totalPrice = 0;

    PRODUCTS.forEach(({ id, img, title, price }) => {
      const index = productsStore.findIndex((item) => item.id === id);

      if (index !== -1) {
        const productTotalPrice = price * productsStore[index].countProductsId;
        totalPrice += productTotalPrice;
        htmlCatalog += `
          <div class="container basket__item">
          <button 
            class="basket__delete"
            type="button"
            title="delete"
            onclick="productsPage.handleAllRemoveSessionStorage('${id}');"
          >
            <img src="/images/Delete.svg" alt="" />
          </button>
            <img
              class="basket__image-1"
              src="${img}"
              alt="${title}"
            />
            <div class="counter container space-between">
              <button 
                class="counter_button container"
                type="button"
                title="minus"
                data-direction="minus"
                onclick="productsPage.handleRemoveSessionStorage('${id}');"
              >
                <div class="minus"></div>
              </button>
              <input
                class="counter__value"
                type="text"
                aria-label="count"
                name="productCount"
                value="${productsStore[index].countProductsId}"
                disabled
              />
              <button 
                class="counter_button container" 
                type="button"
                title="plus"
                data-direction="plus" 
                onclick="productsPage.handleAddSessionStorage('${id}');"
              >
                <div class="plus1"></div>
                <div class="plus2"></div>
              </button>
            </div>
            <p class="item__name">${title}</p>
            <p class="item__price">${price.toLocaleString()} ₽</p>
            <p class="item__price__all">${productTotalPrice.toLocaleString()} ₽</p>
          </div>
        `;
      }
    });

    const html = `
      <div class="container collumn main__basket-items">
        ${htmlCatalog}
      </div>
      <div class="container collumn main__total-price space-between">
        <div class="container total space-between">
          <p>ИТОГО</p>
          <p>${totalPrice.toLocaleString()} ₽</p>
        </div>
        <a href="#">
          <div class="total_button container">
            <p>Перейти к оформлению</p>
          </div>
        </a>
      </div>
    `;

    MAIN_PRODUCTS.innerHTML = html;
  }
}

// debugger;

const productsPage = new Products();
productsPage.render();
