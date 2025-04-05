import { JwtPayload } from '../auth/dto/jwt.payload';

declare global {
    namespace Express {
        export interface User extends JwtPayload {}
    }
}
