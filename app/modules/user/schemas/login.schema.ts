import Joi from 'joi';
import { propertyLength } from '../../../common/constant/propertyLength';
import { regexConstant } from '../../../common/constant/regex.constant';

export const LoginSchema = Joi.object().keys({
  login: Joi.string().min(propertyLength.USER.LOGIN.MIN).max(propertyLength.USER.LOGIN.MAX).pattern(regexConstant.USER.login).required(),
  password: Joi.string().pattern(regexConstant.USER.password).required(),
});

export type ILoginSchema = {
  login: string;
  password: string;
};
