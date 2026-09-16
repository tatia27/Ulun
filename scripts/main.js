const SIZE_DATA = [
  {
    id: 0,
    weight: "100 г",
    sku: "01306",
    price: "326,40 ₽",
    oldPrice: "349,20 ₽",
  },
  {
    id: 1,
    weight: "500 г",
    sku: "01307",
    price: "1 432 ₽",
    oldPrice: "1 646 ₽",
  },
  {
    id: 2,
    weight: "1000 г",
    sku: "01308",
    price: "2 064 ₽",
    oldPrice: "2 592 ₽",
  },
  {
    id: 3,
    weight: "5000 г",
    sku: "01309",
    price: "6 320 ₽",
    oldPrice: "8 710 ₽",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const packSizesContainer = document.getElementById("pack-sizes");
  const packButtons = Array.from(document.querySelectorAll(".pack-size-btn"));
  const skuElement = document.getElementById("product-sku");
  const priceElement = document.getElementById("product-price");
  const oldPriceElement = document.getElementById("product-old-price");

  const updateProductDetails = (data) => {
    if (!data) return;

    skuElement.textContent = `Арт. ${data.sku}`;
    priceElement.textContent = data.price;

    if (data.oldPrice) {
      oldPriceElement.textContent = data.oldPrice;
      oldPriceElement.style.display = "inline-block";
    } else {
      oldPriceElement.style.display = "none";
    }
  };

  const handlePackSelection = (event) => {
    const button = event.target.closest(".pack-size-btn");
    if (!button) return;

    if (button.classList.contains("active")) return;

    packButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-checked", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-checked", "true");

    const id = parseInt(button.dataset.id, 10);
    const selectedData = SIZE_DATA.find((item) => item.id === id);

    updateProductDetails(selectedData);
  };

  packSizesContainer.addEventListener("click", handlePackSelection);

  packSizesContainer.addEventListener("keydown", (event) => {
    const currentBtn = event.target;
    if (!currentBtn.classList.contains("pack-size-btn")) return;

    const currentIndex = packButtons.indexOf(currentBtn);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % packButtons.length;
      event.preventDefault();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + packButtons.length) % packButtons.length;
      event.preventDefault();
    }

    if (nextIndex !== currentIndex) {
      packButtons[nextIndex].focus();
      packButtons[nextIndex].click();
    }
  });
});
