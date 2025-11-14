//для работы с интерфейсом для данных покупателя

// импортируем интерфейс покупателя
import  { Buyer } from "../../types/index.js";
//импортируем способ оплаты
import  { Payment } from "../../types/index.js";

export class Customer {
  //покупатель хранит данные
  private data: Buyer = {
    payment: "card", //вид оплаты
    phone: "",
    email: "",
  };

  //МЕТОДЫ:

  // Сохранение данных в модели (отдельные методы для каждого поля)
  setPayment(payment: Payment): void {
    this.data.payment = payment; //поле оплаты
  }

  setEmail(email: string): void {
    //поле почты
    this.data.email = email;
  }

  setPhone(phone: string): void {
    //поле телефона
    this.data.phone = phone;
  }

  // Метод для массовой установки данных
  setData(data: Partial<Buyer>): void {
    Object.assign(this.data, data);
  }

  // получение всех данных покупателя
  getData(): Buyer {
    return { ...this.data };
  }

  // очистка данных покупателя
  clearData(): void {
    this.data = {
      payment: "card",
      email: "",
      phone: "",
    };
  }

  // Валидация данных методом validate() проверяем коректность данных в объекте data
  validate(): Record<string, string> {
    const errors: Record<string, string> = {}; //Создаем пустой объект  который будет содержать сообщения об ошибках для каждого поля

    if (!this.data.payment) {
      errors.payment = "Выберите вид оплаты"; //Если поле payment(оплаты) не заполнено  добавляется сообщение об ошибке в объект errorr
    }
    if (!this.data.email) {
      errors.email = "Укажите email";
    }
    if (!this.data.phone) {
      errors.phone = "Укажите номер телефона";
    }

    return errors; // вернуть массив если есть ошибки при валидации
  }
}
