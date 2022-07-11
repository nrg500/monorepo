import {Point, Square} from "./square";

describe("Squares", () => {
  const squareA = new Square([new Point(362, 180), new Point(303, 183), new Point(306, 246), new Point(366,241)]);
  const squareB = new Square([new Point(363, 178), new Point(368, 242), new Point(305, 249), new Point(301, 182)]);
  const squareC = new Square([new Point(362, 180), new Point(303, 183), new Point(306, 246), new Point(522,241)]);

  it('Should equal with overlapping points', () => {
    expect(squareA.equals(squareB)).toBeTrue();
  });

  it('Should not equal with one differing point', () => {
    expect(squareA.equals(squareC)).toBeFalse();
  });

  it('Should not add itself to unique list if duplicate', () => {
    const squares = [squareA, squareB, squareC];
    let realSquares: Square[] = []
    squares.forEach(squareA => {
      if(!realSquares.some(squareB => squareB.equals(squareA))) {
        realSquares.push(squareA);
      }
    });
    expect(realSquares.length).toBe(2)
    expect(realSquares[0]).toBe(squareA);
    expect(realSquares[1]).toBe(squareC);
  });
})
