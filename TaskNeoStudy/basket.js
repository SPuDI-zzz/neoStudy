BASKET = document.getElementById('basket');

class Basket {
  render(count) {
    const html = `
      <div class="circle">${count}</div>
      <img src="/images/Basket.svg" alt="Basket" />
    `;

    BASKET.innerHTML = html;
  }
}

const basket = new Basket();
basket.render(sessionStorageUtil.productsCount);
