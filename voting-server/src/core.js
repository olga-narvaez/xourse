import {List, Map} from 'immutable';
export const INITIAL_STATE = Map();

export function setEntries(state, entries) 
{
  return state.set('entries', List(entries));
}

function getWinners(vote) 
{
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes)  return [a];
  else if (aVotes < bVotes)  return [b];
  else                       return [a, b];
}

export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({
        //round: round + 1,
        pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}

export function vote(voteState, entry) {
  /*
  return addVote(
    removePreviousVote(voteState, voter),
    entry,
    voter
  */
 return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}
//1. Invalid Vote Prevention
/*if (voteState.get('pair').includes(entry)) 
{
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
    );
}
else
{
  return voteState;
} */
/*
export function restart(state) {
  const round = state.getIn(['vote', 'round'], 0);
  return next(
    state.set('entries', state.get('initialEntries'))
         .remove('vote')
         .remove('winner'),
    round
  );
}

function removePreviousVote(voteState, voter) {
  const previousVote = voteState.getIn(['votes', voter]);
  if (previousVote) {
    return voteState.updateIn(['tally', previousVote], t => t - 1)
                    .removeIn(['votes', voter]);
  } else {
    return voteState;
  }
}

function addVote(voteState, entry, voter) {
  if (voteState.get('pair').includes(entry)) {
    return voteState.updateIn(['tally', entry], 0, t => t + 1)
                    .setIn(['votes', voter], entry);
  } else {
    return voteState;
  }
}
*/