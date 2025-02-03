import { User } from '@/auth/entities/user.entity';


export interface AuthRequest extends Request{
  user: User;
}
