import assert from "assert";
import {Game} from "../src/game.js";
import {generateTypes} from "../src/util.js";

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('Game', function () {
    describe('shuffleBoard', function () {
        it('should return the same types as the pre-shuffled board', function () {
            let game = Game(generateTypes());
            const oldTypes = game.getTypes();
            game.shuffleBoard();
            const newTypes = game.getTypes();

            assert.deepEqual(oldTypes, newTypes);
        })
    })
});
