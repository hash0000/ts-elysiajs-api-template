import { CustomErrorTypeEnum } from '../enums/errorType.enum';
import { HttpStatusCode } from '../enums/httpStatusCode.enum';

type CustomResponseTypeError = Array<{ property?: string; type?: string; message?: string }>;

export type MainResponseType = {
  statusCode: HttpStatusCode;
  data?: object | object[];
  validationError?: CustomResponseTypeError;
  errorTypeCode?: CustomErrorTypeEnum;
};
