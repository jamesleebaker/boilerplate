export default function(...mixins) {
  let Class = function(...args) {
    mixins.forEach(Mixin => {
      let instance = new Mixin(args);
      // instance properties
      for(let prop in instance) {
        if(instance.hasOwnProperty(prop)) {
          this[prop] = instance[prop];
        }
      }
    });
  };

  // merge Mixins into a single prototype
  mixins.forEach(Mixin => {
    const props = Object.getOwnPropertyNames(Mixin.prototype)
                  .filter(prop => prop !== 'constructor');

    for(let index in props) {
      let key = props[index];
      let value = Mixin.prototype[key];

      if(typeof value === 'function') {
        Class.prototype[key] = value;
      }
    }
  });

  return Class;
}
