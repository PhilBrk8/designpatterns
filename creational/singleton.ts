// https://refactoring.guru/design-patterns/singleton
// Singleton is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.

// The Singleton pattern solves two problems at the same time, violating the Single Responsibility Principle:
// 1.: Ensure that a class has just a single instance.
//     The most common reason for this is to control access to some shared resource—for example, a database or a file.
//     This behavior is impossible to implement with a regular constructor since a constructor call must always return a new object by design.
// 2.: Profice a global access point to that instance.
//     The Singleton pattern lets you access some object from anywhere in the program. However, it also protects that instance from being overwritten by other code.
//     There’s another side to this problem: you don’t want the code that solves problem #1 to be scattered all over your program. It’s much better to have it within one class, especially if the rest of your code already depends on it.

// Solution:
// 1.: Make the default constructor private, to prevent other objects from using the new operator with the Singleton class.
// 2.: Create a static creation method that acts as a constructor.
//     Under the hood, this method calls the private constructor to create an object and saves it in a static field.
//     All following calls to this method return the cached object.

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Singleton {
  private static instance: Singleton;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public someBusinessLogic() {
    // ...
  }
}

/**
 * The client code.
 */
function clientCode() {
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();

  if (s1 === s2) {
    console.log("Singleton works, both variables contain the same instance.");
  } else {
    console.log("Singleton failed, variables contain different instances.");
  }
}

clientCode();
