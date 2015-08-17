export default function(...mixins) {
  class Class {
    constructor(...args) {
      mixins.forEach(Mixin => {
        const props = Object.getOwnPropertyNames(Mixin.prototype)
          .filter(prop => prop !== 'constructor');
        let instance = new Mixin(args);
        let proto = Object.getPrototypeOf(this);

        for(let prop in instance) {
          if(instance.hasOwnProperty(prop)) {
            this[prop] = instance[prop];
          }
        }

        for(let index in props) {
          const key = props[index];
          const value = Mixin.prototype[key];

          proto[key] = value;
        }
      });
    }
  }

  return Class;
}
