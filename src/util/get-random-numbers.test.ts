import { getRandomNumbersBetween0And200 } from "./get-random-numbers";

it("getRandomNumbers- size=1 should return 1 random number", () => {
    // Arrange
    let size = 1;
    // Act
    let numbers = getRandomNumbersBetween0And200(size);
    // Assert
    expect(numbers.length === 1);
});