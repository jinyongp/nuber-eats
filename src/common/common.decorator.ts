export function HandleError(message: string = '') {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor,
  ) {
    const origin = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        return await origin.apply(this, args);
      } catch (err) {
        console.error(err);
        let error = `Unexpected error occurred`;
        if (message) error += `: ${message}`;
        return { ok: false, error };
      }
    };
  };
}
