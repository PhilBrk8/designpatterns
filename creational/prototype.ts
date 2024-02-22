// Prototype is a creational design pattern that lets you copy existing objects without making your code dependent on their classes.

// Problem:
// Not all objects can be copied from the outside because some of the object’s fields may be private and not visible from outside of the object itself.
// Since you have to know the object’s class to create a duplicate, your code becomes dependent on that class.
// Sometimes you only know the interface that the object follows, but not its concrete class, when, for example, a parameter in a method accepts any objects that follow some interface.

// Solution:
// The Prototype pattern delegates the cloning process to the actual objects that are being cloned.
// The pattern declares a common interface for all objects that support cloning.
// This interface lets you clone an object without coupling your code to the class of that object. Usually, such an interface contains just a single clone method.

// The implementation of the clone method is very similar in all classes.
// The method creates an object of the current class and carries over all of the field values of the old object into the new one.
// You can even copy private fields because most programming languages let objects access private fields of other objects that belong to the same class.

// An object that supports cloning is called a prototype.
// When your objects have dozens of fields and hundreds of possible configurations, cloning them might serve as an alternative to subclassing.

// Usage examples:
// The Prototype pattern is available in TypeScript out of the box with a JavaScript’s native Object.assign() method.

/**
 * The example class that has cloning ability. We'll see how the values of field
 * with different types will be cloned.
 */
class Prototype {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference;

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    // Cloning an object that has a nested object with backreference
    // requires special treatment. After the cloning is completed, the
    // nested object should point to the cloned object, instead of the
    // original object. Spread operator can be handy for this case.
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

/**
 * The client code.
 */
function clientCode() {
  const p1 = new Prototype();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();
  if (p1.primitive === p2.primitive) {
    console.log(
      "Primitive field values have been carried over to a clone. Yay!"
    );
  } else {
    console.log("Primitive field values have not been copied. Booo!");
  }
  if (p1.component === p2.component) {
    console.log("Simple component has not been cloned. Booo!");
  } else {
    console.log("Simple component has been cloned. Yay!");
  }

  if (p1.circularReference === p2.circularReference) {
    console.log("Component with back reference has not been cloned. Booo!");
  } else {
    console.log("Component with back reference has been cloned. Yay!");
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log(
      "Component with back reference is linked to original object. Booo!"
    );
  } else {
    console.log("Component with back reference is linked to the clone. Yay!");
  }
}

clientCode();
