MAIN_PRODUCTS = document.getElementById('products');

class Products {
  constructor() {
    this.classNameActive = 'products-element__btn_active';
    this.labelAdd = 'Добавить в корзину';
    this.labelRemove = 'Удалить из корзины';
  }

  handleAddSessionStorage(id) {
    // debugger;
    sessionStorageUtil.putProducts(id);

    // if (pushProduct) {
    //   element.classList.add(this.classNameActive);
    //   element.innerHTML = this.labelRemove;
    // } else {
    //   element.classList.remove(this.classNameActive);
    //   element.innerHTML = this.labelAdd;
    // }

    basket.render(sessionStorageUtil.productsCount);
  }
  handleRemoveSessionStorage(id) {
    sessionStorageUtil.removeProduct(id);
    basket.render(sessionStorageUtil.productsCount);
  }
  handleAllRemoveSessionStorage(id) {
    sessionStorageUtil.removeAllProducts(id);
    basket.render(sessionStorageUtil.productsCount);
    this.render();
  }
  render() {
    const productsStore = sessionStorageUtil.getProducts();
    let htmlCatalog = '';
    let totalPrice = 0;
    debugger;
    PRODUCTS.forEach(({ id, img, title, price }) => {
      // let countProductsId = productsStore.filter((item) => item.id === id).length;
      // onclick="productsPage.handleAddSessionStorage("${id}");"
      const index = productsStore.findIndex((item) => item.id === id);
      if (index !== -1) {
        totalPrice += price * productsStore[index].countProductsId;
        htmlCatalog += `
          <div class="container basket__item">
          <button 
            class="basket__delete"
            onclick="productsPage.handleAllRemoveSessionStorage('el1');"
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
                data-direction="minus"
                onclick="productsPage.handleRemoveSessionStorage('${id}');"
              >
                <div class="minus"></div>
              </button>
              <input
                class="counter__value"
                type="text"
                name="productCount"
                value="${productsStore[index].countProductsId}"
                disabled
              />
              <button 
                id="${id}"
                class="counter_button container" 
                data-direction="plus" 
                onclick="productsPage.handleAddSessionStorage('${id}');"
              >
                <div class="plus1"></div>
                <div class="plus2"></div>
              </button>
            </div>
            <p class="item__name">${title}</p>
            <p class="item__price">${price.toLocaleString()} ₽</p>
            <p class="item__price__all">${(
              price * productsStore[index].countProductsId
            ).toLocaleString()} ₽</p>
          </div>
        `;
      }
    });
    // CATALOG.forEach(({ id, name, price, img }) => {
    //   let activeClass = '';
    //   let activeText = '';

    //   if (productsStore.indexOf(id) === -1) {
    //     activeText = this.labelAdd;
    //   } else {
    //     activeClass = ' ' + this.classNameActive;
    //     activeText = this.labelRemove;
    //   }

    //   htmlCatalog += `
    //             <li class="products-element">
    //                 <span class="products-element__name">${name}</span>
    //                 <img class="products-element__img" src="${img}" />
    //                 <span class="products-element__price">
    //                     ⚡️ ${price.toLocaleString()} USD
    //                 </span>
    //                 <button class="products-element__btn${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}');">
    //                     ${activeText}
    //                 </button>
    //             </li>
    //         `;
    // });

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
