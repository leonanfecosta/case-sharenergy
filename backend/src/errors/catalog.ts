export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  NotFound = 'NotFound',
  EntityAlreadyExists = 'EntityAlreadyExists',
}

// esse é o tipo do objeto vai ser usado para onstruir a resposta da API
type ErrorResponseObject = {
  error: string;
  httpStatus: number;
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    error: 'Object not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    error: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  NotFound: {
    error: 'User not found',
    httpStatus: 404,
  },
  EntityAlreadyExists: {
    error: 'Entity already exists',
    httpStatus: 409,
  },
};
