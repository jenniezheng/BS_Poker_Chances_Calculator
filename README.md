# BS Poker Probabilities Calculator
## BS Poker Rules
BS poker is a card game with rules as follows. A set number of cards is dealt to each player. The players go around a circle calling out higher and higher poker hands, trying to guess which poker hands can be adequately formed using the cards pooled together by all the players. Then when one player calls BS, all cards are revealed. If the last claim was true, the player who called BS loses. If it was false, the player who was convicted of BS loses.

Special BS poker rules: 2's are wild cards which can represent any suit and any number/royal. Poker hands longer than 5 cards are possible.

## Calculator
This calculator is capable of figuring out an optimal play or ranking the chances of each BS poker hand. Note that BS poker differs from regular poker in that 2's are wild cards and that poker hands may have more than 5 cards.

## Usage
Find optimal play:
- Syntax: `find_best_play(num_decks,num_cards,my_hand)`
- Example finding best play with three known cards (three jacks from one deck) and a total of 15 cards from one deck: `find_best_play(1,15,[("Spades","Jack",0),("Clubs","Jack",0),("Hearts","Jack",0)])`

Find chances of there existing any of flush/straight/kind/straightflush:
- Syntax: `rank_general_chances(num_trials=10000)`
- Example ranking with 100000 trials: `rank_chances(100000)`

Find chances of there existing the flush/straight/kind/straightflush which has highest chance given a random hand:
- Syntax: `rank_specific_all(num_trials=100)`
- Example ranking with 200 different hands: `rank_specific_all(200)`

## General Results:
My PC generated psuedorandom hands of 15 cards from 1 deck and counted the number of occurrances of the following from 100000 trials. Note: this is the chance of there existing any kind/flush/straight/straightflush rather than the chance of a specific one.   Results are as follows.
- Probability of 8 of a kind is 0.000 percent
- Probability of 11 flush is 0.030 percent
- Probability of 10 straight flush is 0.150 percent
- Probability of 7 of a kind is 0.330 percent
- Probability of 10 flush is 0.350 percent
- Probability of 9 straight flush is 0.580 percent
- Probability of 9 flush is 1.920 percent
- Probability of 8 straight flush is 2.680 percent
- Probability of 6 of a kind is 4.740 percent
- Probability of 7 straight flush is 9.430 percent
- Probability of 8 flush is 11.260 percent
- Probability of 5 of a kind is 23.640 percent
- Probability of 6 straight flush is 24.850 percent
- Probability of 10 straight is 35.910 percent
- Probability of 7 flush is 37.920 percent
- Probability of 5 straight flush is 49.070 percent
- Probability of 9 straight is 49.330 percent
- Probability of 8 straight is 61.230 percent
- Probability of 4 of a kind is 62.770 percent
- Probability of 7 straight is 75.250 percent
- Probability of 6 flush is 76.300 percent
- Probability of 6 straight is 86.060 percent
- Probability of 5 straight is 93.030 percent
- Probability of 3 of a kind is 93.330 percent
- Probability of 5 flush is 97.410 percent
- Probability of 2 of a kind is 100.000 percent

## Specific Results:
My PC generated psuedorandom hands of 15 cards with 3 known (5000 trials).  For each hand and each category (kind/flush/straightflush/straight), the program found the BS call with the highest chance based on the known cards, and then counted the number of occurrances of that specific call. Results are as follows.
- 0.003 percent chance: 8 of a kind with specific kind
- 0.018 percent chance: 11 flush with Ace or hand high
- 0.043 percent chance: 10 straight flush with specific high and suit
- 0.141 percent chance: 7 of a kind with specific kind
- 0.199 percent chance: 9 straight flush with specific high and suit
- 0.212 percent chance: 10 flush with Ace or hand high
- 0.802 percent chance: 8 straight flush with specific high and suit
- 1.324 percent chance: 9 flush with Ace or hand high
- 1.578 percent chance: 6 of a kind with specific kind
- 2.686 percent chance: 7 straight flush with specific high and suit
- 5.949 percent chance: 8 flush with Ace or hand high
- 7.394 percent chance: 6 straight flush with specific high and suit
- 9.167 percent chance: 5 of a kind with specific kind
- 17.176 percent chance: 5 straight flush with specific high and suit
- 18.197 percent chance: 7 flush with Ace or hand high
- 27.481 percent chance: 10 straight with specific high
- 31.483 percent chance: 4 of a kind with specific kind
- 36.135 percent chance: 9 straight with specific high
- 40.002 percent chance: 6 flush with Ace or hand high
- 45.784 percent chance: 8 straight with specific high
- 55.542 percent chance: 7 straight with specific high
- 63.860 percent chance: 5 flush with Ace or hand high
- 65.046 percent chance: 6 straight with specific high
- 65.462 percent chance: 3 of a kind with specific kind
- 74.362 percent chance: 5 straight with specific high
- 92.174 percent chance: 2 of a kind with specific kind
