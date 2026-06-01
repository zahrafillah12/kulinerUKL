export class CreateUserDto {
  nama!: string;
  email!: string;
  password!: string;
  role?: 'ADMIN' | 'USER';
}