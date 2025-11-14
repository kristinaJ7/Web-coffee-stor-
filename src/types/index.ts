//Создание интерфейсов для данных(в приложении используются две сущности, которые описывают данные, — товар и покупатель. описываем их интерфейсами

//интерфейс для товара
export interface Product {
  //свойство: тип данных
  id: string;
  image: string;
  title: string;
  description: string;
  compound: string;
  category: string;
  price: number;
}

// интефейс для покупателя
export interface Buyer {
  payment: Payment;
  email: string;
  phone: string;
}
//тип оплаты
export type Payment = "card" | "cash";

//для формы отправки подписки
export interface Submitform {
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}
