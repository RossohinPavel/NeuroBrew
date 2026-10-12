import { Injectable, NotImplementedException } from "@nestjs/common";


@Injectable()
export class AuthService {
  register() {
    throw new NotImplementedException("Регистрация пока не реализована");
  }

  login() {
    throw new NotImplementedException("Вход пока не реализован");
  }

  refresh() {
    throw new NotImplementedException("Обновление токенов пока не реализовано");
  }

  logout() {
    throw new NotImplementedException("Выход пока не реализован");
  }

  me() {
    throw new NotImplementedException("Получение текущего пользователя пока не реализовано");
  }
}
