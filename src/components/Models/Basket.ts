//для работы с корзиной на сайте


// ипорт интерфейса карточки товара
import type { Product } from "../../types/index.js";



export class Basket {
    // хранит массив товаров выбранных покупателем для покупки
  private cardList: Product[] = []; 

  //МЕТОДЫ:

  //1 получаем массив товаров, которые находятся в корзине
  getItems(): Product[] {
    return this.cardList;
  }

  // добавляем товар, который был получен в параметре, в массив корзины
  addItem(item: Product): void {
    this.cardList.push(item);
  }

  // Удаление товара из корзины по ID (полученного в параметре из массива корзины)
  removeItem(id: string): void {
    this.cardList = this.cardList.filter((item) => item.id !== id);
  }

  // Очистка корзины
  clear(): void {
    this.cardList = [];
  }

  // получение стоимости всех товаров в корзине;
  getTotalPrice(): number {
    return this.cardList.reduce(
      (total, item) => total + (item.price ?? 0),
      0
    );
  }

  // Получение количества товаров в корзине
  getItemCount(): number {
    return this.cardList.length;
  }

  // проверка наличия товара в корзине по его id, полученного в параметр метода
  hasItem(id: string): boolean {
    return this.cardList.some((item) => item.id === id);
  }
}
