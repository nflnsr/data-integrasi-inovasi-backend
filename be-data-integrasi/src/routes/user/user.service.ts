import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { UserRepository } from "./user.repository";
import { User } from "./user.type";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getProfile(userId: number) {
    return await this.userRepository.getProfile(userId);
  }

  async createUser(data: User) {
    const isUserExist = await this.userRepository.checkEmailExists(data.email);
    if (isUserExist) {
      throw new Error("User already exists");
    }

    const { password, ...userData } = data;
    const hashedPassword = await hashPassword(password);

    return await this.userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });
  }

  async loginUser(email: string, password: string) {
    const isUserExist = await this.userRepository.checkEmailExists(email);
    if (!isUserExist) {
      throw new Error("User not found");
    }

    const user = await this.userRepository.loginUser(email);

    if (!(await comparePassword(password, user?.password as string))) {
      throw new Error("Invalid email or password");
    }
    return user;
  }
}
