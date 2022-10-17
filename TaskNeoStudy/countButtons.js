const counter = function () {
  const btns = document.querySelectorAll('.counter_button');
  // debugger;
  btns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const direction = this.dataset.direction;
      const inp = this.parentElement.querySelector('.counter__value');
      const currentValue = +inp.value;
      let newValue;

      if (direction === 'plus') {
        newValue = currentValue + 1 > 10 ? 10 : currentValue + 1;
      } else {
        newValue = currentValue - 1 > 1 ? currentValue - 1 : 1;
      }

      inp.value = newValue;
    });
  });
};

counter();
