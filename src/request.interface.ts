import { User } from './entity/user.entity';

export interface AuthRequest extends Request{
  user: User;
}
