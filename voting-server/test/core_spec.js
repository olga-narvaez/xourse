import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
        //, initialEntries: List.of('Trainspotting', '28 Days Later')
      }));
    });

  it('converts to immutable', () => {
  const state = Map();
  const entries = ['Trainspotting', '28 Days Later'];
  const nextState = setEntries(state, entries);
  expect(nextState).to.equal(Map({
    entries: List.of('Trainspotting', '28 Days Later')
  //, initialEntries: List.of('Trainspotting', '28 Days Later')
  }));
}); 

}); // end of setEntries

  // Starting The Vote
    describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
        });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          //round: 1,
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }));
    });

       //The winner gets back to the entries to be later paired with other one
   it('puts winner of current vote back to entries', () => {
    //expect(
       // next(Map({
    const state = Map({
      vote: Map({
        //round: 1,
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 4,
          '28 Days Later': 2
        })
      }),
      entries: List.of('Sunshine', 'Millions', '127 Hours')
    });
    const nextState = next(state);
    expect(nextState).to.equal(Map({
      vote: Map({
        //round: 2,
        pair: List.of('Sunshine', 'Millions')
      }),
      entries: List.of('127 Hours', 'Trainspotting')
    }));
  });

  it('puts both from tied vote back to entries', () => {
    const state = Map({
      vote: Map({
        //round: 1,
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 3,
          '28 Days Later': 3
        })
      }),
      entries: List.of('Sunshine', 'Millions', '127 Hours')
    });
    const nextState = next(state);
    expect(nextState).to.equal(Map({
      vote: Map({
        pair: List.of('Sunshine', 'Millions')
      }),
      entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
    }));
  });
 

    //Ending the vote
  it('marks winner when just one entry left', () => {
    const state = Map({
      vote: Map({
        //round: 1,
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 4,
          '28 Days Later': 2
        })
      }),
      entries: List()
    });
    const nextState = next(state);
    expect(nextState).to.equal(Map({
      winner: 'Trainspotting'
    }));
  });

 }); //End of describeNext

    //Vote
describe('vote', () => {

  it('creates a tally for the voted entry', () => {
    const state = Map({
      //round: 1
      pair: List.of('Trainspotting', '28 Days Later')
    });
    const nextState = vote(state, 'Trainspotting')
    expect(nextState).to.equal(Map({
      //round: 1
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: Map({
        'Trainspotting': 1
      })
    }));
  });

  it('adds to existing tally for the voted entry', () => {
    const state = Map({
      //round: 1
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: Map({
        'Trainspotting': 3,
        '28 Days Later': 2
      })
    });
    const nextState = vote(state, 'Trainspotting');
    expect(nextState).to.equal(Map({
      //round: 1
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: Map({
        'Trainspotting': 4,
        '28 Days Later': 2
      })
    }));
  });

}); //End of vote

}); 

