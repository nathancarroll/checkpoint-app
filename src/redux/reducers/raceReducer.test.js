import raceReducer from './raceReducer';

describe('testing raceReducers', () => {
    test('default state should be as expected', () => {
        let action = {};
        let defaultState = raceReducer(undefined, action)

        expect(defaultState.allRaces).toEqual([]);
        expect(defaultState.checkpoints).toEqual(null);
        expect(defaultState.participants).toEqual(null);
        expect(defaultState.raceDetails).toEqual({startTime: null, finishTime: null, creator: null});
    })
})