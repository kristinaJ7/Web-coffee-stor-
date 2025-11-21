//ипорт
import "./scss/main.scss";
//импорт данных
import { apiProducts } from "./utils/data";

//импорт моделей
import { Basket } from "./components/Models/Basket";
import { Customer } from "./components/Models/Buyer";
import { Products } from "./components/Models/Products";

import { FormValidator } from "./components/Models/form/form";

//ПРОВЕРКА И ВЫВОД В КОНСОЛЬ
//проверка класса  ProductsCatalog и его методов
const productsModel = new Products();
productsModel.setItems(apiProducts.items);
console.log("Массив товаров из каталога: ", productsModel.getProducts());

//проверка класса  Buyer и его методов
const BuyerModel = new Customer();
BuyerModel.setEmail("example@example.com");
BuyerModel.setPhone("123-456-7890");
BuyerModel.setPayment("card");

console.log("Данные покупателя: ", BuyerModel.getData());
// Пример валидации данных
const validationErrors = BuyerModel.validate();
console.log("Ошибки валидации: ", validationErrors);

//проверка класса  и его методов
const BuyListModel = new Basket();
BuyListModel.addItem(apiProducts.items[0]); // добавляем первый товар в корзину
console.log("Массив товаров из корзины: ", BuyListModel.getItems());

// Пример удаления товара из корзины
BuyListModel.removeItem(apiProducts.items[0].id);
console.log("Корзина после удаления товара: ", BuyListModel.getItems());

// Пример получения количества товаров в корзине
console.log("Количество товаров в корзине: ", BuyListModel.getItemCount());

// Пример проверки наличия товара в корзине
const hasItem = BuyListModel.hasItem(apiProducts.items[0].id);
console.log(`Товар с ID ${apiProducts.items[0].id} в корзине:`, hasItem);

import { Product } from "./types";

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  if (!gallery) {
    console.error("Контейнер #gallery не найден");
    return;
  }

  const getTemplate = (id: string): DocumentFragment | null => {
    const template = document.getElementById(id) as HTMLTemplateElement;
    if (!template) {
      console.error(`Шаблон #${id} не найден`);
      return null;
    }
    return template.content.cloneNode(true) as DocumentFragment;
  };

  const renderProductCard = (product: Product) => {
    const fragment = getTemplate("card-catalog");
    if (!fragment) return;

    const card = fragment.querySelector(".card") as HTMLElement;
    if (!card) {
      console.error("Элемент .card не найден в шаблоне");
      return;
    }

    // Заполняем текстовые поля
    [
      ".card__title",
      ".card__price",
      ".card__description",
      ".card__compound",
    ].forEach((selector) => {
      const el = card.querySelector(selector);
      if (el) {
        switch (selector) {
          case ".card__title":
            el.textContent = product.title;
            break;
          case ".card__price":
            el.textContent = `${product.price} ₽`;
            break;
          case ".card__description":
            el.textContent = product.description;
            break;
          case ".card__compound":
            el.textContent = product.compound;
            break;
        }
      }
    });

    // Обрабатываем изображение
    const img = card.querySelector(".card__image") as HTMLImageElement;
    if (img) {
      img.src = product.image;
      img.alt = product.title;
    }

    // Категория
    const category = card.querySelector(".card__category");
    if (category && product.category) {
      category.textContent = product.category;
    }

    // Кнопка "Купить"
    const buyButton = card.querySelector(".card__button") as HTMLButtonElement;
    buyButton?.addEventListener("click", () => {
      console.log("Товар добавлен в корзину:", product.id);
      // Логика добавления в корзину
    });

    gallery.appendChild(card);
  };

  if (apiProducts.items.length === 0) {
    console.warn("Список товаров пуст!");
    return;
  }

  apiProducts.items.forEach(renderProductCard);
});





document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("subscribeForm") as HTMLFormElement;
  const errorMessages = document.querySelectorAll(".error-message");

  const clearErrors = () => {
    errorMessages.forEach((el) => {
      el.textContent = "";
    });
  };

  const showErrors = (errors: Record<string, string>) => {
    Object.keys(errors).forEach((field) => {
      const errorEl = document.querySelector(
        `.error-message[data-for="${field}"]`
      );
      if (errorEl) {
        errorEl.textContent = errors[field];
      }
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const formData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      phone: (document.getElementById("phone") as HTMLInputElement).value,
      consent: (document.getElementById("consent") as HTMLInputElement).checked,
    };

    try {
      const validator = new FormValidator();
      const result = validator.validate(formData);

      if (result.isValid) {
        fetch("http://localhost:3000/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP ошибка! Статус: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            alert(`Подписка оформлена! Статус: ${data.message}`);
            form.reset();
          })
          .catch((err) => {
            console.error("Ошибка запроса:", err);
            if (err.message.includes("HTTP")) {
              alert("Ошибка сервера: " + err.message);
            } else {
              alert("Сетевая ошибка. Проверьте подключение к серверу.");
            }
          });
      } else {
        showErrors(result.errors);
      }
    } catch (err) {
      console.error("Ошибка валидации:", err);
      alert("Ошибка валидации формы. Проверьте данные.");
    }
  });
});
