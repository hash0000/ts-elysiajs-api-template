import { JWTPayloadSpec } from '@elysiajs/jwt';
import Elysia, { TSchema, UnwrapSchema } from 'elysia';

export interface ElysiaApp extends Elysia {
  decorator: {
    jwt: {
      readonly sign: (morePayload: Record<string, string | number> & JWTPayloadSpec) => Promise<string>;
      readonly verify: (jwt?: string) => Promise<false | (UnwrapSchema<TSchema, Record<string, string | number>> & JWTPayloadSpec)>;
    };
  };
}
