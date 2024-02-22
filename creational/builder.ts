//
// Builder is a creational design pattern that lets you construct complex objects step by step.
//The pattern allows you to produce different types and representations of an object using the same construction code.

// Unlike other creational patterns, Builder doesn’t require products to have a common interface.
// That makes it possible to produce different products using the same construction process.

// Problem:
// Imagine a complex object that requires laborious, step-by-step initialization of many fields and nested objects.
// Such initialization code is usually buried inside a monstrous constructor with lots of parameters.
// Or even worse: scattered all over the client code.

// Usage Example:
// The Builder pattern is a well-known pattern in TypeScript world.
// It’s especially useful when you need to create an object with lots of possible configuration options.

// Identification:
// The Builder pattern can be recognized in a class, which has a single creation method and several methods to configure the resulting object.
// Builder methods often support chaining (for example, someBuilder.setValueA(1).setValueB(2).create()).

/**
 * The Builder interface specifies methods for creating the different parts of
 * the Product objects.
 */
interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

/**
 * The Concrete Builder classes follow the Builder interface and provide
 * specific implementations of the building steps. Your program may have several
 * variations of Builders, implemented differently.
 */
class ConcreteBuilder1 implements Builder {
  private product: Product1;

  /**
   * A fresh builder instance should contain a blank product object, which is
   * used in further assembly.
   */
  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new Product1();
  }

  /**
   * All production steps work with the same product instance.
   */
  public producePartA(): void {
    this.product.parts.push("PartA1");
  }

  public producePartB(): void {
    this.product.parts.push("PartB1");
  }

  public producePartC(): void {
    this.product.parts.push("PartC1");
  }

  /**
   * Concrete Builders are supposed to provide their own methods for
   * retrieving results. That's because various types of builders may create
   * entirely different products that don't follow the same interface.
   * Therefore, such methods cannot be declared in the base Builder interface
   * (at least in a statically typed programming language).
   *
   * Usually, after returning the end result to the client, a builder instance
   * is expected to be ready to start producing another product. That's why
   * it's a usual practice to call the reset method at the end of the
   * `getProduct` method body. However, this behavior is not mandatory, and
   * you can make your builders wait for an explicit reset call from the
   * client code before disposing of the previous result.
   */
  public getProduct(): Product1 {
    const result = this.product;
    this.reset();
    return result;
  }
}

/**
 * It makes sense to use the Builder pattern only when your products are quite
 * complex and require extensive configuration.
 *
 * Unlike in other creational patterns, different concrete builders can produce
 * unrelated products. In other words, results of various builders may not
 * always follow the same interface.
 */
class Product1 {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(", ")}\n`);
  }
}

/**
 * The Director is only responsible for executing the building steps in a
 * particular sequence. It is helpful when producing products according to a
 * specific order or configuration. Strictly speaking, the Director class is
 * optional, since the client can control builders directly.
 */
class Director {
  private builder: Builder;

  /**
   * The Director works with any builder instance that the client code passes
   * to it. This way, the client code may alter the final type of the newly
   * assembled product.
   */
  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  /**
   * The Director can construct several product variations using the same
   * building steps.
   */
  public buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

/**
 * The client code creates a builder object, passes it to the director and then
 * initiates the construction process. The end result is retrieved from the
 * builder object.
 */
function clientCode(director: Director) {
  const builder = new ConcreteBuilder1();
  director.setBuilder(builder);

  console.log("Standard basic product:");
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log("Standard full featured product:");
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  // Remember, the Builder pattern can be used without a Director class.
  console.log("Custom product:");
  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
