class SessionStorageUtil {
  constructor() {
    this.keyName = 'products';
    this.productsCount = this.getProducts().reduce(
      (sum, current) => sum + current.countProductsId,
      0
    );
  }

  getProducts() {
    const productsSessionlStorage = sessionStorage.getItem(this.keyName);
    if (productsSessionlStorage !== null) {
      return JSON.parse(productsSessionlStorage);
    }
    return [];
  }

  putProducts(id) {
    let products = this.getProducts();
    const index = products.findIndex((item) => item.id === id);

    if (index === -1) {
      products.push({ id, countProductsId: 1 });
      ++this.productsCount;
    } else {
      if (products[index].countProductsId < 10) {
        ++products[index].countProductsId;
        ++this.productsCount;
      }
    }

    sessionStorage.setItem(this.keyName, JSON.stringify(products));
  }

  removeProduct(id) {
    let products = this.getProducts();
    const index = products.findIndex((item) => item.id === id);

    if (index === -1) {
      return;
    }

    if (products[index].countProductsId === 1) {
      this.removeAllProducts(id);
      return;
    }

    if (products[index].countProductsId > 1) {
      --products[index].countProductsId;
      --this.productsCount;
    }

    sessionStorage.setItem(this.keyName, JSON.stringify(products));
  }

  removeAllProducts(id) {
    let products = this.getProducts();
    const index = products.findIndex((item) => item.id === id);

    if (index === -1) {
      return;
    }

    this.productsCount -= products[index].countProductsId;
    products.splice(index, 1);

    sessionStorage.setItem(this.keyName, JSON.stringify(products));
  }
}

const sessionStorageUtil = new SessionStorageUtil();
