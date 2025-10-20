import { NextFunction, Request, RequestHandler, Response } from "express";

// export const catchAsync =
//   (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
//     fn(res, req, next).catch(next);
//   };

export function catchAsync<T extends RequestHandler>(fn: T) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

//   Esta es la versión de mi código y tengo preguntas. ¿Aquí dónde está el promise.resolve? En realidad solo estoy haciendo un  return de la función fn(...).catch(next).¿Es eso suficiente para que se entienda que es una promesa? Después, en cuanto al tipado de la función que se le pasa por parámetro he puesto "Function" pero creo que está mal. ¿Qué se suele poner en estos casos? Antes has puesto un ejemplo en el que  usabas <T extends...> y lo has usado como tipo para esa función. ¿Puedes explicar qué es, para qué sirve y porque es la mejor opción en este caso?¿Hay algo en el código que cambiarías? Código: "export const catchAsync =
//   (fn: Function) => (res: Response, req: Request, next: NextFunction) => {
//     return fn(res, req, next).catch(next);
//   };"
