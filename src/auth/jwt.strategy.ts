import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

// Define the expected structure of the token payload for type safety
interface JwtPayload {
    sub: number;
    username: string;
    role: string;
    iat: number; 
    exp: number; 
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Secret for validating the access token
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET || 'access_secret',
    });
  }

  // Uses the defined interface for better type checking
  async validate(payload: Partial<JwtPayload>) { 
    // The returned object becomes req.user
    return { 
      id: payload.sub, // Map sub (subject ID) to 'id'
      username: payload.username, 
      role: payload.role 
    };
  }
}