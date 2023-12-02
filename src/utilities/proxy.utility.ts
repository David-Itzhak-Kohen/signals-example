export interface IObserverHandler {
  beforeGet?: () => void;
  afterGet?: () => void;
  beforeSet?: () => void;
  afterSet?: () => void;
}

export const isObject = (value: unknown) => {
  return typeof value === "object" && value !== null;
};

export const createDeepObjectObserver = <T extends Object>(
  target: T,
  handler: IObserverHandler,
  cache: WeakMap<Object, Object>
): T => {
  if (cache.has(target)) {
    return cache.get(target) as T;
  }

  const proxy = new Proxy(target, {
    get: (target, property) => {
      handler.beforeGet?.();

      const value = target[property as keyof T];

      handler.afterGet?.();

      if (isObject(value)) {
        return createDeepObjectObserver(value as Object, handler, cache);
      }

      return value;
    },
    set: (object, key, value) => {
      console.log("set", object, key, value);
      handler.beforeSet?.();
      cache.delete(object);
      const success = Reflect.set(object, key, value);

      if (success) {
        handler.afterSet?.();
      }

      return success;
    },
  }) as T;

  cache.set(target, proxy);

  return proxy;
};
