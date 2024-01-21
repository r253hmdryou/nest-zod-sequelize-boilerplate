import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'share/models/user.model';
import { UserEntity } from './entities/user.entity';

export class UserRegistrationRepository {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}
  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.userModel.count({ where: { email: email } });
    return count > 0;
  }

  async save(user: UserEntity): Promise<void> {
    const model = user.toModel();
    await model.save();
  }
}
