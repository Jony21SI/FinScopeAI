import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { UserService } from '../User/user.service';
import { User } from '../User/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    // Handle AUTH0_DOMAIN that might already include https://
    const domain = process.env.AUTH0_DOMAIN?.startsWith('https://')
      ? process.env.AUTH0_DOMAIN
      : `https://${process.env.AUTH0_DOMAIN}`;

    // Ensure it ends with /
    const issuer = domain.endsWith('/') ? domain : `${domain}/`;

    // Fix JWKS URI to avoid double slashes
    const jwksUri = domain.endsWith('/')
      ? `${domain}.well-known/jwks.json`
      : `${domain}/.well-known/jwks.json`;

    super({
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: jwksUri,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: issuer,
      algorithms: ['RS256'],
    });

    // Debug logging
    console.log('JWT Strategy Configuration:');
    console.log('AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN);
    console.log('AUTH0_AUDIENCE:', process.env.AUTH0_AUDIENCE);
    console.log('JWKS URI:', jwksUri);
    console.log('Issuer:', issuer);
  }

  async validate(payload: any): Promise<User> {
    console.log('JWT Strategy - Token payload received:', payload);
    const { sub: auth0Id, email, name } = payload;
    console.log('JWT Strategy - Extracted data:', { auth0Id, email, name });

    try {
      const user = await this.userService.findOrCreate(auth0Id, email, name);
      console.log('JWT Strategy - User found/created:', user);
      return user;
    } catch (error) {
      console.error('JWT Strategy - Error in validate method:', error);
      throw error;
    }
  }
}
