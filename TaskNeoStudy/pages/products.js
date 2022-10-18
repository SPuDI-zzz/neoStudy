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
    const productsStore = sessionStorageUtil.getProducts();
    let htmlCatalog = '';
    let totalPrice = 0;

    PRODUCTS.forEach(({ id, img, title, price }) => {
      const index = productsStore.findIndex((item) => item.id === id);

      if (index !== -1) {
        const productTotalPrice = price * productsStore[index].countProductsId;
        totalPrice += productTotalPrice;
        htmlCatalog += `
          <div class="main__products-element">
            <button
              class="products-element__delete_btn"
              onclick="productsPage.handleAllRemoveSessionStorage('${id}');"
            >
              <img src="../images/Delete.svg" alt="Delete" />
            </button>
            <img
              class="products-element__img"
              src="..${img}"
              alt="${title}"
            />
            <div class="products-element__counter">
              <button 
                class="products-element__counter_btn" 
                type="button"
                title="minus"
                data-direction="minus"
                onclick="productsPage.handleRemoveSessionStorage('${id}');"
              >
                <div class="counter_btn__minus"></div>
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
                class="products-element__counter_btn" 
                type="button"
                title="minus"
                data-direction="minus"
                onclick="productsPage.handleAddSessionStorage('${id}');"
              >
                <div class="counter_btn__plus1"></div>
                <div class="counter_btn__plus2"></div>
              </button>
            </div>
            <span class="products-element__name">${title}</span>
            <span class="products-element__price">${price.toLocaleString()} ₽</span>
            <span class="products-element__price-all">${productTotalPrice.toLocaleString()} ₽</span>
          </div>
        `;
      }
    });

    const html = `
      <div class="main__products-container">
        ${htmlCatalog}
      </div>
      <div class="main__products__total-price">
        <div class="total">
          <span>ИТОГО</span>
          <span>${totalPrice.toLocaleString()} ₽</span>
        </div>
        <a href="#">
          <div class="total_btn">
            <span>Перейти к оформлению</span>
          </div>
        </a>
      </div>
    `;

    MAIN_PRODUCTS.innerHTML = html;
  }
}

const productsPage = new Products();
productsPage.render();
