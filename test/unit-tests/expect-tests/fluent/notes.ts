import {
  FluentExpect as Expect,
  Test,
  TestCase,
  Any
} from "../../../../core/alsatian-core";
import { EqualMatchError } from "../../../../core/errors/equal-match-error";

/** TO DO:
 * 1. Dictionary matchers should reflect level of nesting in error message.
 * 2. Make sure negations work - e.g., .not.to.throw().with.properties();
 * 3. Add fluent integration tests ^^^
 * 4. Use Mix-ins/multiple inheritance strategy
 *    1. Remove with.and and with.not
 *    2.
 * 5. In order for fluency to reach its full potential, we need to track state throughout a "sentence"
 *    and lazily evaluate the result. E.g., Expect(val).to.equal(52).or.to.equal(51);
 * 6. Documentation.
 * 7. .whose(p => p.Prop) or .atPath("prop", "subprop", "subsubprop")
 */

class Rectangle {
  public width: number = 0;
  public height: number = 0;
  public rect: Rectangle;
  get area(): number {
    return this.width * this.height;
  }
}

class Picture {
  public title: string;
  public rect: Rectangle;
}

class MyError extends Error {}

var returnVal = new Rectangle();
/*Expect(returnVal).toBeDefined();
Expect(returnVal).toBeTruthy(returnVal instanceof Rectangle);
Expect(returnVal.message).toBe("asdf");
Expect(returnVal.stack).toMatch(/asdfasdf/);*/

Expect(new Rectangle())
  .to.throw(MyError)
  .not.with.properties({
    message: "asdf",
    stack: /asdfasdf/
  });

/*Expect(new Picture())
  .with.property(p => p.rect)
  .with.properties({
    title: "My Pic",
    rect: {
      width: w => w > 3,
      height: h => h > 3,
      rect: r => Expect(r).to.beDefined(),
      area: 123
    }
  })
  .and.keys([]);

// more mundane:
Expect([1, 2, 3])
  .with.elements([2, 3])
  .and.not.elements([5, 6]);
Expect("something").to.beDefined();
// Expect(weirdThing).to.satisfy(c => myPredicate(c));
// Expect(stringy).to.match(/stuff/);

// Expect({}).where.subset(x => x).with.all()

class Something {
  
}*/

// .to.have returns result of factory as interface (rather than concrete impl)
Expect({ someProp: 1, someOther: 2 })
  .with.properties({
    someProp: p => Expect(p).to.beDefined(),
    someOther: /2/,
  });
/*Expect(new Picture())
  .with.properties({
    rect: { width: w => w > 3 }
  })
    .with.properties({ width: { a: 3 }});

Expect([1,2])
  .to.haveMatches(/ /)
  .with.elements([
    _0 => _0 == 1
  ]);*/

class Bob<T> {
  one<U>(lambda: (t: T) => U): U {
    return <U>{};
  }
}

interface Two<T> {
  second: typeof Bob.prototype.one;
}

interface Bob<T> extends Two<T> {

}

interface Three<T> {
  four: Two<T>;
}

let b: Two<string>;
b.second(a => a)

/*Expect(something).toHave(p => p.Property);
Expect(something).toHave({ ... })
Expect(collection).not.toContain()
Expect(collection).toSatisfy()
Expect(collection).not.toBeEmpty()*/