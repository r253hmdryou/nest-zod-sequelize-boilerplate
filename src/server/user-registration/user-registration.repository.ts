import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'share/models/user.model';
import { v4 } from 'uuid';

export class UserRegistrationRepository {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}
  async save(user: { email: string; passwordHash: string }): Promise<void> {
    const model = new this.userModel({
      ...user,
      uuid: v4(),
      createdAt: new Date(),
    });
    await model.save();
  }
}
