// импорт интерфейса формы
import { Submitform } from "../../../types";

// Единый интерфейс для  всех валидаторов(дженерик)
interface FieldValidator<T> {
  validate(value: T): boolean;
  getError(): string;
}

// Класс данных формы
export class FormData implements Submitform {
  name: string;
  email: string;
  phone: string;
  consent: boolean;

  constructor(name = "", email = "", phone = "", consent = false) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.consent = consent;
  }
}

// Валидатор имени
export class NameValidator implements FieldValidator<string> {
  validate(name: string): boolean {
    if (!name || typeof name !== "string") return false;
    const trimmed = name.trim();
    return trimmed.length >= 2 && trimmed.length <= 30;
  }

  getError(): string {
    return "Имя должно быть от 2 до 30 символов";
  }
}

// Валидатор email
export class EmailValidator implements FieldValidator<string> {
  //регулярное выражение
  private regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  validate(email: string): boolean {
    if (!email || typeof email !== "string") return false;
    return this.regex.test(email.trim());
  }

  getError(): string {
    return "Введите корректный email (например: user@example.com)";
  }
}

// Валидатор телефона
export class PhoneValidator implements FieldValidator<string> {
  private regex = /^\+?[\d\s\-\(\)]{10,15}$/;

  validate(phone: string): boolean {
    if (!phone || typeof phone !== "string") return false;

    const cleaned = phone.replace(/\s+/g, "");
    if (cleaned.length < 10 || cleaned.length > 15) return false;

    const allowedChars = /^[\+\d\-\(\)]+$/;
    if (!allowedChars.test(cleaned)) return false;

    return this.regex.test(phone);
  }

  getError(): string {
    return "Номер должен содержать 10–15 цифр, можно с +, -, ()";
  }
}

// Валидатор согласия
export class ConsentValidator implements FieldValidator<boolean> {
  validate(consent: boolean): boolean {
    return consent === true;
  }

  getError(): string {
    return "Требуется согласие на обработку данных";
  }
}

// Сервис для валидации всей формы
export class FormValidator {
  // Экземпляры валидаторов
  private nameValidator = new NameValidator();
  private emailValidator = new EmailValidator();
  private phoneValidator = new PhoneValidator();
  private consentValidator = new ConsentValidator();

  validate(formData: FormData): {
    isValid: boolean;
    errors: Partial<Record<keyof FormData, string>>;
  } {
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (!this.nameValidator.validate(formData.name)) {
      errors.name = this.nameValidator.getError();
    }
    if (!this.emailValidator.validate(formData.email)) {
      errors.email = this.emailValidator.getError();
    }
    if (!this.phoneValidator.validate(formData.phone)) {
      errors.phone = this.phoneValidator.getError();
    }
    if (!this.consentValidator.validate(formData.consent)) {
      errors.consent = this.consentValidator.getError();
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
