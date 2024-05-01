import * as argon from 'argon2';

export async function hashString(value: string): Promise<string> {
  const salt = Buffer.from(process.env.PASS_SALT!, 'utf-8');
  return await argon.hash(value, {
    type: 2,
    salt: salt,
  });
}
