import operator as op
import random
from collections import defaultdict

def ncr(n, r):
    r = min(r, n-r)
    if r == 0: return 1
    numer = reduce(op.mul, xrange(n, n-r, -1))
    denom = reduce(op.mul, xrange(1, r+1))
    return numer//denom

def cards(num_sets):
    card_set=set()
    for aset in range(0,num_sets):
        for suit in [0,1,2,3]:
            for num in range (0,13,1):
                card_set.add((suit,num,aset))
    return card_set

def rand_set(myset,n):
    return random.sample(myset, n)

def card_num_to_str(card_num):
    card_str=''
    if(card_num<9):
        card_str=str(card_num+2)
    elif card_num==9:
        card_str='Jack'
    elif card_num==10:
        card_str='Queen'
    elif card_num==11:
        card_str='King'
    elif card_num==12:
        card_str='Ace'
    return card_str

def suit_num_to_str(suit):
    suit_str=''
    if(suit==0):
        suit_str='Spades'
    elif suit==1:
        suit_str='Clubs'
    elif suit==2:
        suit_str='Diamonds'
    elif suit==3:
        suit_str='Hearts'
    return suit_str

def print_set(card_set):
    for card in card_set:
        suit,card_num,set_num=card
        card_str=card_num_to_str(card_num)
        suit_str=suit_num_to_str(suit)
        print("%s of %s, Set %d" % (card_str, suit_str, set_num))

def hasOfKind(myset,length):
    for kind in range (0,13):
        if(hasSpecificOfKind(myset,length,kind)):
            return True
    return False

def hasSpecificOfKind(myset,length,n):
    num_of_kind=0

    for card in myset:
        _,card_num,_=card
        if(card_num==0 or card_num==n):
            num_of_kind+=1

    return num_of_kind>=length

def hasStraight(myset,length):
    for low in range (0,13):
        if(isStraightWithLow(myset,length,low)):
            return True
    return False


def hasStraightFlush(myset,length):
    for curr_suit in range(4):
        for low in range(0,13):
            if(hasStraightFlushWithLow(myset,length,low,curr_suit)):
                return True
    return False

def hasStraightFlushWithLow(myset,length,low,mysuit):
    if(low!=12 and low+length-1>12):
        return False

    arr=[False]*13

    num_wild=0
    for card in myset:
        suit,card_num,_=card
        if(card_num==0):
            num_wild+=1
        elif mysuit!=suit:
                continue
        else:
            arr[card_num]=True

    curr_length=0
    curr_unused_wild=num_wild
    for x in range(low,low+length):
        if(not arr[x % 13]):
            curr_unused_wild-=1
            if(curr_unused_wild==-1):
                return False

    return True


def hasFlush(myset,length):
    for suit in range(4):
        if(hasFlushOfSuit(myset,length,suit)):
            return True
    return False

def hasFlushOfSuit(myset,length,mysuit):
    suit_count=0
    for card in myset:
        suit,card_num,_=card
        if(card_num==2 or suit==mysuit):
            suit_count+=1

    return suit_count>=length


def hasFlushOfSuitWithHigh(myset,length,mysuit,high):
    suit_count=0
    has_high=False
    for card in myset:
        suit,card_num,_=card
        if(card_num==2 or (suit==mysuit and card_num <=high)):
            suit_count+=1
            if(card_num==2 or card_num==high):
                has_high=True

    return suit_count>=length and has_high

def isStraightWithLow(myset,length,low):
    if(low!=12 and low+length-1>12):
        return False

    arr=[False]*13

    num_wild=0
    for card in myset:
        _,card_num,_=card
        if(card_num==0):
            num_wild+=1
        else:
            arr[card_num]=True

    unused_wild=num_wild
    for x in range(low,low+length):
        if(not arr[x % 13]):
            unused_wild-=1
            if(unused_wild==-1):
                return False
    """
    if(length==10):
        print("Is straight with low",card_num_to_str(low),"and length",length)
        print_set(myset)
    """

    return True

def heuristic_calc(num_decks,n, trials,function, kwargs):
    card_set=cards(num_decks)
    count=0
    for trial in range(trials):
        random_set=rand_set(card_set,n)
        straight=function(random_set,**kwargs)
        if(straight):
            count+=1
    return count/trials

def heuristic_calc_with_hand(my_hand,num_decks,n, trials,function, kwargs):
    card_set=cards(num_decks)
    for card in my_hand:
        card_set.remove(card)

    count=0
    for trial in range(trials):
        random_set=rand_set(card_set,n-len(my_hand))
        semi_rand_set=my_hand.union(random_set)
        straight=function(semi_rand_set,**kwargs)
        if(straight):
            count+=1
    return count/trials


def str_to_nums(card):
    suit_str,card_str,deck=card
    suit_num=-1
    card_num=-1
    if suit_str=='Spades':
       suit_num=0
    elif suit_str=='Clubs':
       suit_num=1
    elif suit_str=='Diamonds':
       suit_num=2
    elif suit_str=='Hearts':
       suit_num=3
    else:
        raise ValueError('Invalid suit!')

    if card_str=='Jack':
        card_num=9
    elif card_num=='Queen':
        card_num=10
    elif card_num=='King':
        card_num=11
    elif card_num=='Ace':
        card_num=12
    else:
        if(card_num>=2 and card_num<=10):
            card_num=card_str-2
        else:
            raise ValueError('Invalid card str!')

    return (suit_num,card_num,deck)

def top_specific_kind(hand):
    num_arr=[0]*13
    for card in hand:
        _,card_num,_=card
        if(card_num!=0):
            num_arr[card_num]+=1

    max_count=0
    max_index=0
    for x in range(0,13):
        if(num_arr[x]>=max_count):
            max_count=num_arr[x]
            max_index=x
    if(max_index==0):
        max_index=1
    return max_index

def top_suit_and_high(hand):
    suits=[0]*4
    highs=[0]*4
    for card in hand:
        suit,card_num,_=card
        if(card_num!=0):
            suits[suit]+=1
        if(highs[suit]<card_num):
            highs[suit]=card_num

    max_suit=0
    max_suit_count=0
    for x in range(0,4):
        if(suits[x]>max_suit_count or
            suits[x]==max_suit_count and highs[max_suit] < highs[x]):
            max_suit_count=suits[x]
            max_suit=x
    return (max_suit,highs[max_suit])

def top_straight(hand,length):
    if(length>13):
        return False

    arr=[False]*13
    for card in hand:
        _,card_num,_=card
        if(card_num!=0):
            arr[card_num]=True

    low_index=0
    max_length=0
    current_length=0
    #try start at ace
    for x in range(12,12+length):
        if(arr[x%13]):
            current_length+=1
            if(max_length<=current_length):
                max_length=current_length


    for x in range(length-1,13):
        if(arr[x-length]):
            current_length-=1
        if(arr[x]):
            current_length+=1
            if(max_length<=current_length):
                max_length=current_length
                low_index=x-length+1
    if(low_index==0 and length!=13):
        low_index+=1
    return low_index

def top_suit_straight(hand,length):
    if(length>13):
        return False

    best_suit=0
    best_suit_length=0
    best_low_index=0

    for suit in range(4):
        arr=[False]*13
        for card in hand:
            mysuit,card_num,_=card
            if(card_num!=0 and suit == mysuit):
                arr[card_num]=True

        low_index=0
        max_length=0
        current_length=0
        #try start at ace
        for x in range(12,12+length):
            if(arr[x%13]):
                current_length+=1
                if(max_length<=current_length):
                    max_length=current_length

        for x in range(length-1,13):
            if(arr[x-length]):
                current_length-=1
            if(arr[x]):
                current_length+=1
                if(max_length<=current_length):
                    max_length=current_length
                    low_index=x-length+1
        if(low_index==0 and length!=13):
            low_index+=1

        if(max_length>=best_suit_length):
            best_suit_length=max_length
            best_suit=suit
            best_low_index=low_index

    return (best_suit,best_low_index)


def rankSpecificChancesWithHand(num_decks,num_cards,my_hand):
    results=[]
    num_trials=1000
    #print("Ranking for %s cards out of %s deck(s)" % (num_cards,num_decks))
    #descript,prob
    for l in range(5,12):
        suit,high=top_suit_and_high(my_hand)
        kwargs={"length":l,"mysuit":suit,"high":high}
        prob1=heuristic_calc_with_hand(my_hand,num_decks,num_cards,num_trials,hasFlushOfSuitWithHigh,kwargs)
        kwargs={"length":l,"mysuit":suit,"high":12}
        prob2=heuristic_calc_with_hand(my_hand,num_decks,num_cards,num_trials,hasFlushOfSuitWithHigh,kwargs)
        descript="{0} flush with Ace or hand high".format(l)
        if(prob1>prob2):
            results.append((prob1,descript))
        else:
            results.append((prob2,descript))

    for l in range(5,11):
        best_straight_low=top_straight(my_hand,l)
        high=card_num_to_str(best_straight_low+l-1)
        kwargs={"length":l,"low":best_straight_low}
        prob=heuristic_calc_with_hand(my_hand,num_decks,num_cards,num_trials,isStraightWithLow,kwargs)
        descript="{0} straight with specific high".format(l,high)
        results.append((prob,descript))

    for l in range(5,11):
        best_suit,best_low_index=top_suit_straight(my_hand,l)
        high=card_num_to_str(best_straight_low+l-1)
        suit=suit_num_to_str(best_suit)
        kwargs={"length":l,"low":best_low_index,"mysuit":best_suit}
        prob=heuristic_calc_with_hand(my_hand,num_decks,num_cards,num_trials,hasStraightFlushWithLow,kwargs)
        descript="{0} straight flush with specific high and suit".format(l)
        results.append((prob,descript))

    kind=top_specific_kind(my_hand)
    #print("best kind:",card_num_to_str(kind))
    for l in range(2,9):
        kwargs={"length":l,"n":kind}
        prob=heuristic_calc_with_hand(my_hand,num_decks,num_cards,num_trials,hasSpecificOfKind,kwargs)
        descript="{0} of a kind with specific kind".format(l)
        results.append((prob,descript))

    suit,high=top_suit_and_high(my_hand)

    """
    results.sort()

    for res in results:
        print("%s is %.3f percent" %(res[1],res[0]*100))

    """
    return results


def rank_general_chances(trials=10000):
    num_decks=1
    num_cards=15

    results=[]
    print("Ranking for %s cards out of %s deck(s)" % (num_cards,num_decks))
    #descript,prob

    for l in range(5,11):
        kwargs={"length":l}
        prob=heuristic_calc(num_decks,num_cards,trials,hasStraightFlush,kwargs)
        descript="Probability of {0} straight flush".format(l)
        results.append((prob,descript))

    for l in range(5,11):
        kwargs={"length":l}
        prob=heuristic_calc(num_decks,num_cards,trials,hasStraight,kwargs)
        descript="Probability of {0} straight".format(l)
        results.append((prob,descript))

    for l in range(2,9):
        kwargs={"length":l}
        prob=heuristic_calc(num_decks,num_cards,trials,hasOfKind,kwargs)
        descript="Probability of {0} of a kind".format(l)
        results.append((prob,descript))

    for l in range(5,12):
        kwargs={"length":l}
        prob=heuristic_calc(num_decks,num_cards,trials,hasFlush,kwargs)
        descript="Probability of {0} flush".format(l)
        results.append((prob,descript))

    results.sort()
    for res in results:
        print("%s is %.3f percent" %(res[1],res[0]*100))

    return results


def find_best_play(num_decks,num_cards,hand):
    my_hand=set()
    for card in hand:
        my_hand.add(str_to_nums(card))
    print("Reading hand...")
    print_set(my_hand)

    results=[]
    print("Ranking for %s cards out of %s deck(s)" % (num_cards,num_decks))
    #descript,prob
    for l in range(5,12):
        suit,high=top_suit_straight(my_hand,l)
        kwargs={"length":l,"mysuit":suit,"high":high}
        prob1=heuristic_calc_with_hand(my_hand,num_decks,num_cards,10000,hasFlushOfSuitWithHigh,kwargs)
        descript1="Probability of {0} flush with hand high".format(l)
        kwargs={"length":l,"mysuit":suit,"high":12}
        prob2=heuristic_calc_with_hand(my_hand,num_decks,num_cards,10000,hasFlushOfSuitWithHigh,kwargs)
        descript2="Probability of {0} flush with Ace high".format(l)
        if(prob1>prob2):
            results.append((prob1,descript1))
        else:
            results.append((prob2,descript2))

    for l in range(5,11):
        best_straight_low=top_straight(my_hand,l)
        high=card_num_to_str(best_straight_low+l-1)
        kwargs={"length":l,"low":best_straight_low}
        prob=heuristic_calc_with_hand(my_hand,num_decks,num_cards,10000,isStraightWithLow,kwargs)
        descript="Probability of {0} straight with high {1}".format(l,high)
        results.append((prob,descript))

    for l in range(5,11):
        best_suit,best_low_index=top_suit_straight(my_hand,l)
        high=card_num_to_str(best_straight_low+l-1)
        suit=suit_num_to_str(best_suit)
        kwargs={"length":l,"low":best_low_index,"mysuit":best_suit}
        prob=heuristic_calc_with_hand(my_hand,num_decks,num_cards,10000,hasStraightFlushWithLow,kwargs)
        descript="Probability of {0} straight flush with high {1} and suit {2}".format(l,high,suit)
        results.append((prob,descript))

    kind=top_specific_kind(my_hand)
    for l in range(2,9):
        kwargs={"length":l,"n":kind}
        prob=heuristic_calc_with_hand(my_hand,num_decks,num_cards,10000,hasSpecificOfKind,kwargs)
        descript="Probability of {0} of kind {1}".format(l,kind)
        results.append((prob,descript))

    suit,high=top_suit_and_high(my_hand)

    results.sort()
    for res in results:
        print("%s is %.3f percent" %(res[1],res[0]*100))


def rank_specific_all(num_trials=100):
    num_decks=1
    num_cards=15
    known_cards=3
    probs = {}
    probs = defaultdict(lambda:0, probs)
    print("Know %d cards of %d in %d set(s)" %(known_cards,num_cards,num_decks))
    my_cards=cards(num_decks)
    for trial in range(num_trials):
        print("Calculating trial",trial)
        hand=set(rand_set(my_cards,known_cards))
        print_set(hand)
        results=rankSpecificChancesWithHand(num_decks,num_cards,hand)

        for x in range(len(results)):
            probs[results[x][1]]+=results[x][0]

    for key in probs:
        probs[key]/=num_trials

    ranking=[]
    for key in probs:
        ranking.append((probs[key],key))

    ranking.sort()
    for tup in ranking:
        print("%.3f percent chance: %s" %(tup[0]*100,tup[1]))


rank_general_chances()