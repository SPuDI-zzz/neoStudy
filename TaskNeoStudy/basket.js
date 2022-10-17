BASKET = document.getElementById('basket');

class Basket {
  render(count) {
    const html = `
      <div class="circle">${count}</div>
      <img src="/images/Basket.svg" alt="Basket" />
    `;

    BASKET.innerHTML = html;
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
    
    this.render(sessionStorageUtil.productsCount);
    // this.render();
  }
}

const basket = new Basket();
basket.render(sessionStorageUtil.productsCount);
