import { Injectable, InternalServerErrorException, NotImplementedException } from "@nestjs/common";
import { type LoginRequest, type RegisterRequest } from "@shared/contracts";
import { hash } from "argon2";
import { DatabaseService } from "../../database/database.service.js";
import { users } from "../../database/schema/auth.js";
import { RegisterResponse } from "./auth.schema.js";


@Injectable()
export class AuthService {
  constructor(private readonly db: DatabaseService) {}

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    try {
      const { password, ...user } = request;
      const passwordHash = await hash(password);
      const [_createdUser] = await this.db.connection
        .insert(users)
        .values({ ...user, passwordHash })
        .returning();
      console.log(_createdUser);
      return {'accessToken': "1", "refreshToken": "1"}
    } catch {
      throw new InternalServerErrorException();
    }
  }

  login(_request: LoginRequest) {
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
