import { useState } from 'react'
import css from './App.module.css'
import CafeInfo from '../CafeInfo/CafeInfo'
import Notification from '../Notification/Notification'
import VoteOptions from '../VoteOptions/VoteOptions'
import VoteStats from '../VoteStats/VoteStats'
import { type Votes, type VoteType } from '../../types/votes';


function App() {
  const [votes, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });

  const handleVote = (type: VoteType) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  };

  
  const totalVotes = votes.good + votes.neutral + votes.bad;

 
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

 
  const canReset = totalVotes > 0;
  return (
    <>
      <div className={css.app}>
        <CafeInfo />

        <VoteOptions
          onVote={handleVote}
          onReset={resetVotes}
          canReset={canReset}
        />

        {totalVotes > 0 ? (
          <VoteStats
            votes={votes}
            totalVotes={totalVotes}
            positiveRate={positiveRate}
          />
        ) : (
          <Notification />
          )}

     </div>

    </>
  )
}

export default App





