'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

var Card = function () {
  function Card(num_num, suit_num) {
    _classCallCheck(this, Card);

    if (num_num >= 13 || num_num < 0) {
      throw 'Error invalid num number ' + num_num;
    }
    if (suit_num >= 4 || suit_num < 0) {
      throw 'Error invalid suit number ' + suit_num;
    }
    this.num = num_num;
    this.suit = suit_num;
  }

  Card.suit_num_to_str = function suit_num_to_str(num) {
    switch (num) {
      case 0:
        return 'Spades';
      case 1:
        return 'Clubs';
      case 2:
        return 'Diamonds';
      case 3:
        return 'Hearts';
    }
  };

  Card.card_num_to_str = function card_num_to_str(num) {
    switch (num) {
      case 9:
        return 'Jack';
      case 10:
        return 'Queen';
      case 11:
        return 'King';
      case 12:
        return 'Ace';
      default:
        return (num + 2).toString();
    }
  };

  Card.num_char = function num_char(num) {
    switch (num) {
      case 9:
        return 'J';
      case 10:
        return 'Q';
      case 11:
        return 'K';
      case 12:
        return 'A';
      default:
        return (num + 2).toString();
    }
  };

  Card.prototype.toString = function toString() {
    return "{0} of {1}, Set {2}".format(this.num_str, this.suit_str);
  };

  Card.prototype.valueOf = function valueOf() {
    return this.num * 10 + this.suit;
  };

  _createClass(Card, [{
    key: 'suit_str',
    get: function get() {
      return Card.suit_num_to_str(this.suit);
    }
  }, {
    key: 'num_str',
    get: function get() {
      return Card.card_num_to_str(this.num);
    }
  }]);

  return Card;
}();

var Card_Set = function () {
  function Card_Set() {
    var cards = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    _classCallCheck(this, Card_Set);

    this.cards = cards;
    this.shuffleCards();
    this.pointer = 0;
    this.decks = 1;
  }

  Card_Set.prototype.fill_decks_no_shuffle = function fill_decks_no_shuffle(num_decks) {
    this.decks = num_decks;
    this.cards = [];
    for (var deck = 0; deck < num_decks; deck++) {
      for (var suit_num = 0; suit_num < 4; suit_num++) {
        for (var num_num = 0; num_num < 13; num_num++) {
          this.add(new Card(num_num, suit_num));
        }
      }
    }
  };

  Card_Set.prototype.fill_decks = function fill_decks(num_decks) {
    this.fill_decks_no_shuffle(num_decks);
    this.shuffleCards();
  };

  Card_Set.prototype.safe_add = function safe_add(card) {
    var count = 0;
    for (var i = 0; i < this.cards.length; i++) {
      if (this.cards[i].valueOf() == card.valueOf()) count += 1;
    }
    if (count != this.decks) this.add(card);
  };

  Card_Set.prototype.add = function add(card) {
    if (card instanceof Card) this.cards.push(card);else throw 'Error card not instanceof Card';
  };

  Card_Set.prototype.shuffleCards = function shuffleCards() {
    for (var i = this.cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var _ref = [this.cards[j], this.cards[i]];
      this.cards[i] = _ref[0];
      this.cards[j] = _ref[1];
    }
  };

  Card_Set.prototype.indexOfCard = function indexOfCard(card) {
    if (card instanceof Card) {
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].valueOf() == card.valueOf()) return i;
      }
      return -1;
    } else throw 'Error card not instanceof Card';
  };

  Card_Set.prototype.remove = function remove(card) {
    var index = this.indexOfCard(card);
    if (index != -1) this.cards.splice(index, 1);
  };

  Card_Set.prototype.toString = function toString() {
    var myString = '';
    for (var _iterator = this.cards, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var card = _ref2;

      myString += card.toString() + '; ';
    }
    return myString;
  };

  Card_Set.prototype.getCards = function getCards(num) {
    if (num > this.cards.length) throw 'Error tried to get ' + num + ' cards when only ' + this.cards.length + ' cards in set';

    if (this.pointer + num > this.cards.length) {
      this.shuffleCards();
      this.pointer = 0;
    }

    var result = new Card_Set(this.cards.slice(this.pointer, this.pointer + num));
    if (result.length != num) throw 'Wrong length!' + ' Wanted ' + num + ' but got ' + result.length;
    this.pointer += num;
    return result;
  };

  Card_Set.prototype.hasSpecificOfAKind = function hasSpecificOfAKind(length, wanted_num) {
    var num_of_kind = this.numSpecificOfAKind(wanted_num);
    return num_of_kind >= length;
  };

  Card_Set.prototype.numSpecificOfAKind = function numSpecificOfAKind(wanted_num) {
    var num_of_kind = 0;
    for (var _iterator2 = this.cards, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var card = _ref3;

      var num = card.num;
      if (num == 0 || num == wanted_num) num_of_kind += 1;
    }
    return num_of_kind;
  };

  Card_Set.prototype.hasOfAKind = function hasOfAKind(length) {
    if (length > this.cards.length) return false;
    for (var kind = 0; kind < 13; kind++) {
      if (this.hasSpecificOfAKind(length, kind)) return true;
    }return false;
  };

  Card_Set.prototype.hasFullHouse = function hasFullHouse(triple, double) {

    var num_of_triple = 0;
    var num_of_double = 0;
    var num_wild = 0;
    for (var _iterator3 = this.cards, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref4 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref4 = _i3.value;
      }

      var card = _ref4;

      if (card.num == 0) num_wild += 1;else if (card.num == 1) num_of_double += 1;else num_of_triple += 1;
    }
    var missing = Math.max(2 - num_of_double, 0) + Math.max(3 - num_of_triple, 0);
    return num_wild >= missing;
  };

  Card_Set.prototype.hasSuitSeperatedTrait = function hasSuitSeperatedTrait(funcStr) {
    var suitSet = [];
    for (var i = 0; i < 4; ++i) {
      suitSet.push(new Card_Set());
    }for (var _iterator4 = this.cards, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref5 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref5 = _i4.value;
      }

      var card = _ref5;

      if (card.num == 0) {
        for (var i = 0; i < 4; ++i) {
          suitSet[i].add(card);
        }
      } else {
        suitSet[card.suit].add(card);
      }
    }

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    for (var i = 0; i < 4; ++i) {
      switch (funcStr) {
        case 'hasSpecificFlushWithoutHigh':
          if (suitSet[i].hasSpecificFlushWithoutHigh(args, i)) {
            return true;
          }
          break;
        case 'hasStraight':
          var arg = [].concat(args);
          if (suitSet[i].hasStraight(arg[0])) {
            return true;
          }
          break;
        case 'hasSpecificStraight':
          if (suitSet[i].hasSpecificStraight(args, i)) return true;
          break;
        default:
          throw 'invalid funcStr';
      }
    }
    return false;
  };

  Card_Set.prototype.hasSpecificFlushWithoutHigh = function hasSpecificFlushWithoutHigh(length, wanted_suit) {
    if (length > this.cards.length) return false;

    var suit_count = 0;
    for (var _iterator5 = this.cards, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
      var _ref6;

      if (_isArray5) {
        if (_i5 >= _iterator5.length) break;
        _ref6 = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();
        if (_i5.done) break;
        _ref6 = _i5.value;
      }

      var card = _ref6;

      var suit = card.suit;
      var num = card.num;
      if (num == 0 || suit == wanted_suit) suit_count += 1;
    }
    return suit_count >= length;
  };

  Card_Set.prototype.hasFlush = function hasFlush(length) {
    if (length > this.cards.length) return false;
    return this.hasSuitSeperatedTrait('hasSpecificFlushWithoutHigh', length);
  };

  Card_Set.prototype.numSpecificFlush = function numSpecificFlush(wanted_suit, high) {
    var has_high = false;
    var suit_count = 0;
    for (var _iterator6 = this.cards, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
      var _ref7;

      if (_isArray6) {
        if (_i6 >= _iterator6.length) break;
        _ref7 = _iterator6[_i6++];
      } else {
        _i6 = _iterator6.next();
        if (_i6.done) break;
        _ref7 = _i6.value;
      }

      var card = _ref7;

      var suit = card.suit;
      var num = card.num;
      if (num == 0 || suit == wanted_suit) suit_count += 1;
      if (num == 0 || suit == wanted_suit && high == num) has_high = true;
    }

    if (!has_high) return 0;
    return suit_count;
  };

  Card_Set.prototype.hasSpecificFlush = function hasSpecificFlush(length, wanted_suit, high) {
    var count = this.numSpecificFlush(wanted_suit, high);
    return count >= length;
  };

  Card_Set.prototype.hasSpecificHigh = function hasSpecificHigh(length, high) {
    if (length > this.cards.length) return false;

    var count = 0;
    var has_high = false;

    for (var _iterator7 = this.cards, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
      var _ref8;

      if (_isArray7) {
        if (_i7 >= _iterator7.length) break;
        _ref8 = _iterator7[_i7++];
      } else {
        _i7 = _iterator7.next();
        if (_i7.done) break;
        _ref8 = _i7.value;
      }

      var card = _ref8;

      if (card.num <= high) count += 1;
      if (card.num == 0 || card.num == high) has_high = true;
    }
    return has_high && count >= length;
  };

  Card_Set.prototype.hasSpecificStraight = function hasSpecificStraight(length, high) {
    if (length > this.cards.length || length > 13) return false;

    var low = (high - length + 1) % 13;
    if (low != 12 && low + length - 1 > 12) return false;

    var num_arr = [];
    for (var i = 0; i < 13; ++i) {
      num_arr.push(false);
    }var num_wild = 0;
    for (var _iterator8 = this.cards, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
      var _ref9;

      if (_isArray8) {
        if (_i8 >= _iterator8.length) break;
        _ref9 = _iterator8[_i8++];
      } else {
        _i8 = _iterator8.next();
        if (_i8.done) break;
        _ref9 = _i8.value;
      }

      var card = _ref9;

      if (card.num == 0) num_wild += 1;else num_arr[card.num] = true;
    }

    for (var x = low; x < low + length; x++) {
      if (!num_arr[x % 13]) {
        num_wild -= 1;
        if (num_wild == -1) return false;
      }
    }return true;
  };

  Card_Set.prototype.hasStraight = function hasStraight(length) {
    if (length > this.cards.length || length > 13) return false;

    for (var high = length; high < 13; high++) {
      if (this.hasSpecificStraight(length, high)) {
        return true;
      }
    }

    return false;
  };

  Card_Set.prototype.hasStraightFlush = function hasStraightFlush(length) {
    if (length > this.cards.length || length > 13) return false;

    if (!this.hasFlush()) return false;

    return this.hasSuitSeperatedTrait('hasStraight', length);
  };

  Card_Set.prototype.hasSpecificStraightFlush = function hasSpecificStraightFlush(length, suit, high) {
    if (length > this.cards.length || length > 13) return false;

    if (!this.hasSpecificFlush(length, suit, high) || !this.hasSpecificStraight(length, high)) return false;

    return this.hasSuitSeperatedTrait('hasSpecificStraight', length, high);
  };

  Card_Set.prototype.top_expected_straight = function top_expected_straight(length) {
    var arr = [];
    for (var i = 0; i < 13; ++i) {
      arr.push(false);
    }for (var _iterator9 = this.cards, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
      var _ref10;

      if (_isArray9) {
        if (_i9 >= _iterator9.length) break;
        _ref10 = _iterator9[_i9++];
      } else {
        _i9 = _iterator9.next();
        if (_i9.done) break;
        _ref10 = _i9.value;
      }

      var card = _ref10;

      if (card.num != 0) arr[card.num] = true;
    }var low_index = 0;
    var max_length = 0;
    var current_length = 0;
    //try start at ace
    for (var x = 12; x < 12 + length; x++) {
      if (arr[x % 13]) {
        current_length += 1;
        if (max_length <= current_length) max_length = current_length;
      }
    }for (var x = length - 12; x < 12; x++) {
      if (arr[x - length]) current_length -= 1;
      if (arr[x]) current_length += 1;

      if (max_length <= current_length) {
        max_length = current_length;
        low_index = x - length + 1;
      }
    }
    //should never be 0
    if (low_index == 0) low_index += 1;
    var high = low_index + length - 1;
    return [high, max_length];
  };

  Card_Set.prototype.top_of_a_kind = function top_of_a_kind() {
    var _top_of_two_kinds = this.top_of_two_kinds();

    var first_index = _top_of_two_kinds[0];
    var second_index = _top_of_two_kinds[1];
    var first_count = _top_of_two_kinds[2];
    var second_count = _top_of_two_kinds[3];

    return [first_index, first_count];
  };

  Card_Set.prototype.top_of_two_kinds = function top_of_two_kinds() {
    var num_wild = 0;
    var num_arr = [];
    for (var i = 0; i < 13; ++i) {
      num_arr.push(0);
    }for (var _iterator10 = this.cards, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
      var _ref11;

      if (_isArray10) {
        if (_i10 >= _iterator10.length) break;
        _ref11 = _iterator10[_i10++];
      } else {
        _i10 = _iterator10.next();
        if (_i10.done) break;
        _ref11 = _i10.value;
      }

      var card = _ref11;

      if (card.num != 0) num_arr[card.num] += 1;else num_wild += 1;
    }var first_count = 0,
        second_count = 0;
    var first_index = 0,
        second_index = 0;
    for (var x = 0; x < 13; ++x) {
      if (num_arr[x] >= first_count) {
        second_count = first_count;
        second_index = first_index;
        first_count = num_arr[x];
        first_index = x;
      } else if (num_arr[x] >= second_count) {
        second_count = num_arr[x];
        second_index = x;
      }
    }if (first_index == 0) first_index = 1;
    if (second_index == 0) second_index = 1;
    if (first_index == second_index) first_index = (second_index + 1) % 13;
    return [first_index, second_index, first_count + num_wild, second_count];
  };

  Card_Set.prototype.top_suit = function top_suit() {
    var num_wild = 0;
    var suits = [0, 0, 0, 0];
    var highs = [0, 0, 0, 0];
    for (var _iterator11 = this.cards, _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
      var _ref12;

      if (_isArray11) {
        if (_i11 >= _iterator11.length) break;
        _ref12 = _iterator11[_i11++];
      } else {
        _i11 = _iterator11.next();
        if (_i11.done) break;
        _ref12 = _i11.value;
      }

      var card = _ref12;

      if (card.num != 0) {
        suits[card.suit] += 1;
        if (highs[card.suit] < card.num) highs[card.suit] = card.num;
      } else num_wild += 1;
    }

    var max_suit = 0;
    var max_suit_count = 0;
    for (var x = 0; x < 4; ++x) {
      if (suits[x] > max_suit_count || suits[x] == max_suit_count && highs[max_suit] <= highs[x]) {
        max_suit_count = suits[x];
        max_suit = x;
      }
    }return [max_suit, highs[max_suit], max_suit_count + num_wild];
  };

  Card_Set.prototype.top_expected_straight_flush = function top_expected_straight_flush(length) {
    var best_suit = 0;
    var best_length = 0;
    var best_high = 0;

    var suitSet = [];
    for (var i = 0; i < 4; ++i) {
      suitSet.push(new Card_Set());
    }for (var _iterator12 = this.cards, _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
      var _ref13;

      if (_isArray12) {
        if (_i12 >= _iterator12.length) break;
        _ref13 = _iterator12[_i12++];
      } else {
        _i12 = _iterator12.next();
        if (_i12.done) break;
        _ref13 = _i12.value;
      }

      var card = _ref13;

      if (card.num == 0) {
        for (var i = 0; i < 4; ++i) {
          suitSet[i].add(card);
        }
      } else {
        suitSet[card.suit].add(card);
      }
    }

    for (var x = 0; x < 4; ++x) {
      var _suitSet$x$top_expect = suitSet[x].top_expected_straight(length);

      var high = _suitSet$x$top_expect[0];
      var mlength = _suitSet$x$top_expect[1];

      if (mlength > best_length) {
        best_length = mlength;
        best_suit = x;
        best_high = high;
      }
    }
    return [best_suit, best_high, best_length];
  };

  _createClass(Card_Set, [{
    key: 'length',
    get: function get() {
      return this.cards.length;
    }
  }]);

  return Card_Set;
}();

var Optimal = function () {
  function Optimal(known, cards, decks, trials) {
    _classCallCheck(this, Optimal);

    this.known = known;
    this.cards = cards;
    this.decks = decks;
    this.trials = trials;
    this.specific_chances = [];
    this.general_chances = [];
  }

  Optimal.prototype.rank_general_chances = function rank_general_chances() {
    if (this.general_chances.length != 0) return this.general_chances;
    var cards = this.cards,
        decks = this.decks,
        trials = this.trials;
    var results = {};
    //fill results
    for (var i = 2; i <= decks * 8; i++) {
      var target = i + " of a kind";
      results[target] = 0;
    }

    for (var i = 5; i <= cards; i++) {
      var target = i + " long flush";
      results[target] = 0;
    }

    for (var i = 5; i <= 13; i++) {
      var target = i + " long straight";
      results[target] = 0;
    }

    for (var i = 5; i <= 13; i++) {
      var target = i + " long straight flush";
      results[target] = 0;
    }

    var deck = new Card_Set();
    //fill up card set
    deck.fill_decks(decks);

    for (var trial = 0; trial < trials; ++trial) {
      var card_set = deck.getCards(cards);

      var _card_set$top_of_a_ki = card_set.top_of_a_kind();

      var _ = _card_set$top_of_a_ki[0];
      var longest_of_kind = _card_set$top_of_a_ki[1];

      var _card_set$top_suit = card_set.top_suit();

      var ____ = _card_set$top_suit[0];
      var __ = _card_set$top_suit[1];
      var longest_flush = _card_set$top_suit[2];

      var longest_straight = 0,
          longest_straight_flush = 0;
      var curr_length = 5;
      while (card_set.hasStraight(curr_length)) {
        longest_straight = curr_length;
        curr_length += 1;
      }
      //temp
      curr_length = 5;
      while (card_set.hasStraightFlush(curr_length)) {
        longest_straight_flush = curr_length;
        curr_length += 1;
      }
      for (var i = 2; i <= longest_of_kind; i++) {
        var target = i + " of a kind";
        results[target] += 1;
      }

      for (var i = 5; i <= longest_flush; i++) {
        var target = i + " long flush";
        results[target] += 1;
      }

      for (var i = 5; i <= longest_straight; i++) {
        var target = i + " long straight";
        results[target] += 1;
      }

      for (var i = 5; i <= longest_straight_flush; i++) {
        var target = i + " long straight flush";
        results[target] += 1;
      }
    }

    var arr = [];
    for (var key in results) {
      if (results[key] > .001) arr.push([results[key] * 100.0 / trials, key]);
    }

    arr.sort(function (x, y) {
      if (x[0] > y[0]) return 1;else if (x[0] == y[0]) return 0;else return -1;
    });

    for (var _iterator13 = arr, _isArray13 = Array.isArray(_iterator13), _i13 = 0, _iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();;) {
      //if(res[0]>=.01)
      //console.log(res[0]+'% chance '+res[1])

      var _ref14;

      if (_isArray13) {
        if (_i13 >= _iterator13.length) break;
        _ref14 = _iterator13[_i13++];
      } else {
        _i13 = _iterator13.next();
        if (_i13.done) break;
        _ref14 = _i13.value;
      }

      var res = _ref14;
    }
    this.general_chances = arr;
    return arr;
  };

  Optimal.prototype.rank_specific_chances = function rank_specific_chances() {

    if (this.specific_chances.length != 0) return this.specific_chances;
    this.specific_ranks_dict = {};

    var results = this.specific_ranks_dict;
    results["Full house, specified triple and double"] = 0;

    //fill results
    for (var i = 2; i <= this.decks * 8; i++) {
      results[i + " of a kind, specified rank"] = 0;
    }for (var i = 5; i <= this.cards; i++) {
      results[i + " long flush, specified suit and own card high"] = 0;
      results[i + " long flush, specified suit and Ace high"] = 0;
    }

    for (var i = 5; i <= 13; i++) {
      results[i + " long straight, specified high"] = 0;
      results[i + " long straight flush, specified high"] = 0;
    }

    var num_hands = Math.sqrt(this.trials);
    var deck = new Card_Set();
    deck.fill_decks(this.decks);

    for (var trial = 0; trial < num_hands; ++trial) {
      var card_set = deck.getCards(this.known);
      this.rank_specific_chances_helper(card_set);
    }

    var total_trials = Math.floor(num_hands) * Math.floor(num_hands);
    var arr = [];

    for (var key in this.specific_ranks_dict) {
      if (results[key] > .001) arr.push([this.specific_ranks_dict[key] * 100.0 / total_trials, key]);
    }

    arr.sort(function (x, y) {
      if (x[0] > y[0]) return 1;else if (x[0] == y[0]) return 0;else return -1;
    });

    for (var _iterator14 = arr, _isArray14 = Array.isArray(_iterator14), _i14 = 0, _iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();;) {
      var _ref15;

      if (_isArray14) {
        if (_i14 >= _iterator14.length) break;
        _ref15 = _iterator14[_i14++];
      } else {
        _i14 = _iterator14.next();
        if (_i14.done) break;
        _ref15 = _i14.value;
      }

      var res = _ref15;

      if (res[0] >= .01) console.log('spe ' + res[0] + '% chance ' + res[1]);
    }
    this.specific_chances = arr;
    return arr;
  };

  Optimal.prototype.rank_specific_chances_helper = function rank_specific_chances_helper(hand) {
    if (this.cards < hand.length) throw 'Error: hand too large';

    var cards = hand,
        decks = this.decks,
        trials = Math.sqrt(this.trials);
    //alert(cards.toString())
    var deck = new Card_Set();

    //fill up card set
    deck.fill_decks(decks);

    for (var _iterator15 = cards.cards, _isArray15 = Array.isArray(_iterator15), _i15 = 0, _iterator15 = _isArray15 ? _iterator15 : _iterator15[Symbol.iterator]();;) {
      var _ref16;

      if (_isArray15) {
        if (_i15 >= _iterator15.length) break;
        _ref16 = _iterator15[_i15++];
      } else {
        _i15 = _iterator15.next();
        if (_i15.done) break;
        _ref16 = _i15.value;
      }

      var card = _ref16;

      deck.remove(card);
    }
    var _cards$top_of_a_kind = cards.top_of_a_kind();

    var best_kind = _cards$top_of_a_kind[0];
    var ___ = _cards$top_of_a_kind[1];

    var _cards$top_suit = cards.top_suit();

    var best_suit = _cards$top_suit[0];
    var best_flush_high = _cards$top_suit[1];
    var _ = _cards$top_suit[2];

    var _cards$top_of_two_kin = cards.top_of_two_kinds();

    var fullHhouseIndex1 = _cards$top_of_two_kin[0];
    var fullHhouseIndex2 = _cards$top_of_two_kin[1];

    var straight_arr = [],
        straight_flush_arr = [];
    var results = this.specific_ranks_dict;
    for (var x = 5; x <= 13; x++) {
      var _cards$top_expected_s = cards.top_expected_straight(length);

      var high = _cards$top_expected_s[0];
      var _2 = _cards$top_expected_s[1];

      var _cards$top_expected_s2 = cards.top_expected_straight_flush(length);

      var suit = _cards$top_expected_s2[0];
      var fhigh = _cards$top_expected_s2[1];
      var __ = _cards$top_expected_s2[2];

      straight_arr.push(high);
      straight_flush_arr.push([suit, fhigh]);
    }

    for (var trial = 0; trial < trials; ++trial) {

      var card_set_addition = deck.getCards(this.cards - hand.length);
      var card_set = new Card_Set(cards.cards.concat(card_set_addition.cards));
      var longest_straight = 1,
          longest_straight_flush = 1;
      var curr_length = 5;
      while (card_set.hasSpecificStraight(curr_length, straight_arr[curr_length - 5])) {
        longest_straight = curr_length;
        curr_length += 1;
      }
      //temp
      curr_length = 5;
      while (card_set.hasSpecificStraightFlush(curr_length, straight_flush_arr[curr_length - 5][1], straight_flush_arr[curr_length - 5][0])) {
        longest_straight_flush = curr_length;
        curr_length += 1;
      }

      if (card_set.hasFullHouse(fullHhouseIndex1, fullHhouseIndex2)) {
        var target = "Full house, specified triple and double";
        results[target] += 1;
      }

      var longest_of_kind = card_set.numSpecificOfAKind(best_kind);
      var longest_flush = card_set.numSpecificFlush(best_suit, best_flush_high);
      //ace high
      var longest_flush_alt = card_set.numSpecificFlush(best_suit, 10);

      for (var i = 2; i <= longest_of_kind; i++) {
        var target = i + " of a kind, specified rank";
        results[target] += 1;
      }

      for (var i = 5; i <= longest_flush; i++) {
        var target = i + " long flush, specified suit and high";
        results[target] += 1;
      }

      for (var i = 5; i <= longest_flush_alt; i++) {
        var target = i + " long flush, specified suit and own card high";
        results[target] += 1;
      }

      for (var i = 5; i <= longest_straight; i++) {
        var target = i + " long straight, specified high";
        results[target] += 1;
      }

      for (var i = 5; i <= longest_straight_flush; i++) {
        var target = i + " long straight flush, specified suit and high";
        results[target] += 1;
      }
    }
  };

  Optimal.prototype.find_best_play = function find_best_play(hand) {
    if (hand.length == 0) return this.rank_specific_chances();

    if (this.cards - hand.length < 0) throw 'Error: hand too large';

    var cards = hand,
        decks = this.decks,
        trials = this.trials;
    //alert(cards.toString())
    var deck = new Card_Set();

    //fill up card set
    deck.fill_decks(decks);

    for (var _iterator16 = cards.cards, _isArray16 = Array.isArray(_iterator16), _i16 = 0, _iterator16 = _isArray16 ? _iterator16 : _iterator16[Symbol.iterator]();;) {
      var _ref17;

      if (_isArray16) {
        if (_i16 >= _iterator16.length) break;
        _ref17 = _iterator16[_i16++];
      } else {
        _i16 = _iterator16.next();
        if (_i16.done) break;
        _ref17 = _i16.value;
      }

      var card = _ref17;

      deck.remove(card);
    }var results = {};

    var _cards$top_of_a_kind2 = cards.top_of_a_kind();

    var best_kind = _cards$top_of_a_kind2[0];
    var ___ = _cards$top_of_a_kind2[1];

    var _cards$top_suit2 = cards.top_suit();

    var best_suit = _cards$top_suit2[0];
    var best_flush_high = _cards$top_suit2[1];
    var _ = _cards$top_suit2[2];

    var straight_arr = [],
        straight_flush_arr = [];
    for (var x = 5; x <= 13; x++) {
      var _cards$top_expected_s3 = cards.top_expected_straight(length);

      var high = _cards$top_expected_s3[0];
      var _3 = _cards$top_expected_s3[1];

      var _cards$top_expected_s4 = cards.top_expected_straight_flush(length);

      var suit = _cards$top_expected_s4[0];
      var fhigh = _cards$top_expected_s4[1];
      var __ = _cards$top_expected_s4[2];

      straight_arr.push(high);
      straight_flush_arr.push([suit, fhigh]);
    }

    var _cards$top_of_two_kin2 = cards.top_of_two_kinds();

    var fullHhouseIndex1 = _cards$top_of_two_kin2[0];
    var fullHhouseIndex2 = _cards$top_of_two_kin2[1];

    var htarget = "Full house, " + Card.card_num_to_str(fullHhouseIndex1) + ' on ' + Card.card_num_to_str(fullHhouseIndex2);
    results[htarget] = 0;

    //fill results
    for (var i = 2; i <= decks * 8; i++) {
      var target = i + " of a kind " + Card.card_num_to_str(best_kind);
      results[target] = 0;
    }

    for (var i = 5; i <= this.cards; i++) {
      var target = i + " long " + Card.suit_num_to_str(best_suit) + " flush, " + Card.card_num_to_str(best_flush_high) + ' high';
      var target2 = i + " long " + Card.suit_num_to_str(best_suit) + " flush, Ace high";
      results[target] = 0;
      results[target2] = 0;
    }

    for (var i = 5; i <= 13; i++) {
      var target = i + " long straight, " + Card.card_num_to_str(straight_arr[i - 5]) + " high";
      results[target] = 0;
    }

    for (var i = 5; i <= 13; i++) {
      var target = i + " long straight " + Card.card_num_to_str(straight_flush_arr[i - 5][0]) + " flush, " + Card.card_num_to_str(straight_flush_arr[i - 5][1]) + " high";
      results[target] = 0;
    }

    for (var trial = 0; trial < trials; ++trial) {
      var card_set_addition = deck.getCards(this.cards - hand.length);
      var card_set = new Card_Set(cards.cards.concat(card_set_addition.cards));
      var longest_straight = 1,
          longest_straight_flush = 1;
      var curr_length = 5;
      while (card_set.hasSpecificStraight(curr_length, straight_arr[curr_length - 5])) {
        longest_straight = curr_length;
        curr_length += 1;
      }
      //temp
      curr_length = 5;
      while (card_set.hasSpecificStraightFlush(curr_length, straight_flush_arr[curr_length - 5][1], straight_flush_arr[curr_length - 5][0])) {
        longest_straight_flush = curr_length;
        curr_length += 1;
      }

      if (card_set.hasFullHouse(fullHhouseIndex1, fullHhouseIndex2)) {
        var target = "Full house, " + Card.card_num_to_str(fullHhouseIndex1) + ' on ' + Card.card_num_to_str(fullHhouseIndex2);
        results[target] += 1;
      }

      var longest_of_kind = card_set.numSpecificOfAKind(best_kind);
      var longest_flush = card_set.numSpecificFlush(best_suit, best_flush_high);
      //ace high
      var longest_flush_alt = card_set.numSpecificFlush(best_suit, 10);

      for (var i = 2; i <= longest_of_kind; i++) {
        var target = i + " of a kind " + Card.card_num_to_str(best_kind);
        results[target] += 1;
      }

      for (var i = 5; i <= longest_flush; i++) {
        var target = i + " long " + Card.suit_num_to_str(best_suit) + " flush, " + Card.card_num_to_str(best_flush_high) + ' high';
        results[target] += 1;
      }

      for (var i = 5; i <= longest_flush_alt; i++) {
        var target = i + " long " + Card.suit_num_to_str(best_suit) + " flush, Ace high";
        results[target] += 1;
      }

      for (var i = 5; i <= longest_straight; i++) {
        var target = i + " long straight, " + Card.card_num_to_str(straight_arr[i - 5]) + " high";
        results[target] += 1;
      }

      for (var i = 5; i <= longest_straight_flush; i++) {
        var target = i + " long straight " + Card.card_num_to_str(straight_flush_arr[i - 5][0]) + " flush, ";
        Card.card_num_to_str(straight_flush_arr[i - 5][1]) + " high";
        results[target] += 1;
      }
    }

    var arr = [];
    for (var key in results) {

      if (results[key] > .001) arr.push([results[key] * 100.0 / trials, key]);
    }

    arr.sort(function (x, y) {
      if (x[0] > y[0]) return 1;else if (x[0] == y[0]) return 0;else return -1;
    });

    for (var _iterator17 = arr, _isArray17 = Array.isArray(_iterator17), _i17 = 0, _iterator17 = _isArray17 ? _iterator17 : _iterator17[Symbol.iterator]();;) {
      //if(res[0]>=.01)
      //console.log(res[0]+'% chance '+res[1])

      var _ref18;

      if (_isArray17) {
        if (_i17 >= _iterator17.length) break;
        _ref18 = _iterator17[_i17++];
      } else {
        _i17 = _iterator17.next();
        if (_i17.done) break;
        _ref18 = _i17.value;
      }

      var res = _ref18;
    }
    return arr.reverse();
  };

  return Optimal;
}();

var Bar = function (_React$Component) {
  _inherits(Bar, _React$Component);

  function Bar() {
    _classCallCheck(this, Bar);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Bar.prototype.render = function render() {
    var divStyle = {
      width: this.props.percent + '%'
    };

    return React.createElement(
      'skill',
      { className: 'bar_container' },
      React.createElement(
        'div',
        { className: 'bar', style: divStyle },
        ' ',
        this.props.description + ': ' + this.props.percent + '%'
      )
    );
  };

  return Bar;
}(React.Component);

var Bar_Graph = function (_React$Component2) {
  _inherits(Bar_Graph, _React$Component2);

  function Bar_Graph() {
    _classCallCheck(this, Bar_Graph);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Bar_Graph.prototype.render = function render() {
    var results = this.props.data_func();
    return React.createElement(
      'div',
      { className: 'bar_graph' },
      React.createElement(
        'div',
        { className: 'title' },
        React.createElement(
          'h1',
          null,
          this.props.name,
          ' '
        ),
        this.props.description.split("\n").map(function (i) {
          return React.createElement(
            'p',
            { className: 'bar_description' },
            i
          );
        })
      ),
      React.createElement(
        'section',
        { className: 'graph' },
        results.map(function (result) {
          return React.createElement(Bar, { percent: result[0], description: result[1] });
        })
      )
    );
  };

  return Bar_Graph;
}(React.Component);

var default_known = 3,
    default_cards = 15,
    default_decks = 2,
    default_trials = 10000;
var default_hand = new Card_Set();
default_hand.add(new Card(9, 0));
default_hand.add(new Card(10, 1));
default_hand.add(new Card(3, 3));
var default_hand_choices = new Card_Set();
default_hand_choices.fill_decks_no_shuffle(1);

var Hand_Options = function (_React$Component3) {
  _inherits(Hand_Options, _React$Component3);

  function Hand_Options() {
    _classCallCheck(this, Hand_Options);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this));

    _this3.state = {
      hand: default_hand
    };
    return _this3;
  }

  Hand_Options.prototype.cardAdded = function cardAdded(num, suit) {
    if (this.state.hand.length >= 13) return;
    this.state.hand.decks = default_decks;
    this.state.hand.safe_add(new Card(num, suit));
    this.setState({ hand: this.state.hand });
  };

  Hand_Options.prototype.cardRemoved = function cardRemoved(num, suit) {
    this.state.hand.remove(new Card(num, suit));
    this.setState({ hand: this.state.hand });
  };

  Hand_Options.prototype.run = function run() {
    this.props.callbackParent(this.state.hand);
  };

  Hand_Options.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'hand_options jumbotron' },
      ' ',
      React.createElement(
        'div',
        { className: 'hand_choices' },
        React.createElement(
          'h1',
          null,
          'Hand'
        ),
        React.createElement(HandCardSetIcon, { cb: this.cardRemoved.bind(this), cards: this.state.hand.cards }),
        React.createElement('br', null),
        React.createElement(
          'button',
          { className: 'btn btn-success', onClick: this.run.bind(this) },
          'Calculate'
        ),
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement(HandCardSetIcon, { cb: this.cardAdded.bind(this), cards: default_hand_choices.cards.slice(0, 13) }),
        React.createElement(HandCardSetIcon, { cb: this.cardAdded.bind(this), cards: default_hand_choices.cards.slice(13, 26) }),
        React.createElement(HandCardSetIcon, { cb: this.cardAdded.bind(this), cards: default_hand_choices.cards.slice(26, 39) }),
        React.createElement(HandCardSetIcon, { cb: this.cardAdded.bind(this), cards: default_hand_choices.cards.slice(39, 52) })
      )
    );
  };

  return Hand_Options;
}(React.Component);

var Deck_Options = function (_React$Component4) {
  _inherits(Deck_Options, _React$Component4);

  function Deck_Options() {
    _classCallCheck(this, Deck_Options);

    var _this4 = _possibleConstructorReturn(this, _React$Component4.call(this));

    _this4.state = {
      cards: default_cards,
      known: default_known,
      decks: default_decks,
      trials: default_trials
    };
    return _this4;
  }

  Deck_Options.prototype.clicked = function clicked() {
    if (this.state.cards < 5 || this.state.cards > this.state.decks * 52) {
      alert('Error: invalid number of total cards');
    }

    if (this.state.known < 0 > this.state.known > this.state.cards) {
      alert('Error: invalid number of known cards');
    }

    var newState = this.state;
    this.props.callbackParent(newState);
  };

  Deck_Options.prototype.handleCardsChange = function handleCardsChange(event) {
    this.setState({ cards: event.target.value });
    default_cards = event.target.value;
  };

  Deck_Options.prototype.handleKnownCardsChange = function handleKnownCardsChange(event) {
    this.setState({ known: event.target.value });
    default_known = event.target.value;
  };

  Deck_Options.prototype.handleDecksChange = function handleDecksChange(event) {
    var value = event.target.options[event.target.selectedIndex].value;
    this.setState({ decks: value });
    default_decks = value;
  };

  Deck_Options.prototype.handleTrialsChange = function handleTrialsChange(event) {
    var value = event.target.options[event.target.selectedIndex].value;
    this.setState({ trials: value });
    default_trials = value;
  };

  Deck_Options.prototype.render = function render() {
    var d1 = default_decks == 1 ? React.createElement(
      'option',
      { selected: true, value: '1' },
      '1'
    ) : React.createElement(
      'option',
      { value: '1' },
      '1'
    );
    var d2 = default_decks == 2 ? React.createElement(
      'option',
      { selected: true, value: '2' },
      '2'
    ) : React.createElement(
      'option',
      { value: '2' },
      '2'
    );
    var d3 = default_decks == 3 ? React.createElement(
      'option',
      { selected: true, value: '3' },
      '3'
    ) : React.createElement(
      'option',
      { value: '3' },
      '3'
    );
    var d4 = default_decks == 4 ? React.createElement(
      'option',
      { selected: true, value: '4' },
      '4'
    ) : React.createElement(
      'option',
      { value: '4' },
      '4'
    );

    var t1 = default_trials == 100 ? React.createElement(
      'option',
      { selected: true, value: '100' },
      '100'
    ) : React.createElement(
      'option',
      { value: '100' },
      '100'
    );
    var t2 = default_trials == 1000 ? React.createElement(
      'option',
      { selected: true, value: '1000' },
      '1000'
    ) : React.createElement(
      'option',
      { value: '1000' },
      '1000'
    );
    var t3 = default_trials == 10000 ? React.createElement(
      'option',
      { selected: true, value: '10000' },
      '10000'
    ) : React.createElement(
      'option',
      { value: '10000' },
      '10000'
    );
    var t4 = default_trials == 100000 ? React.createElement(
      'option',
      { selected: true, value: '100000' },
      '100000'
    ) : React.createElement(
      'option',
      { value: '100000' },
      '100000'
    );

    return React.createElement(
      'div',
      { className: 'deck_options jumbotron' },
      React.createElement(
        'h1',
        null,
        'Deck Options'
      ),
      React.createElement(
        'div',
        { className: 'form-inline deck' },
        React.createElement(
          'label',
          { className: 'mr-sm-2', 'for': 'inlineFormInput' },
          'Known'
        ),
        React.createElement('input', { defaultValue: this.props.known, onChange: this.handleKnownCardsChange.bind(this), type: 'number', className: 'num_input form-control mb-2 mr-sm-2 mb-sm-0' }),
        React.createElement(
          'label',
          { className: 'mr-sm-2', 'for': 'inlineFormInput' },
          'Total'
        ),
        React.createElement('input', { defaultValue: this.props.cards, onChange: this.handleCardsChange.bind(this), type: 'number', className: 'num_input form-control mb-2 mr-sm-2 mb-sm-0' }),
        React.createElement(
          'label',
          { className: 'mr-sm-2', 'for': 'inlineFormCustomSelect' },
          'Decks'
        ),
        React.createElement(
          'select',
          { onChange: this.handleDecksChange.bind(this), className: 'custom-select mb-2 mr-sm-2 mb-sm-0' },
          d1,
          d2,
          d3,
          d4
        ),
        React.createElement(
          'label',
          { className: 'mr-sm-2', 'for': 'inlineFormCustomSelect' },
          'Trials'
        ),
        React.createElement(
          'select',
          { onChange: this.handleTrialsChange.bind(this), className: 'custom-select mb-2 mr-sm-2 mb-sm-0' },
          t1,
          t2,
          t3,
          t4
        ),
        React.createElement(
          'button',
          { className: 'settings btn btn-success', onClick: this.clicked.bind(this) },
          ' Set '
        )
      )
    );
  };

  return Deck_Options;
}(React.Component);

var Calculator = function (_React$Component5) {
  _inherits(Calculator, _React$Component5);

  function Calculator() {
    _classCallCheck(this, Calculator);

    var _this5 = _possibleConstructorReturn(this, _React$Component5.call(this));

    _this5.state = {
      page: 'about',
      cards: default_cards,
      decks: default_decks,
      trials: default_trials,
      known: default_known,
      hand: default_hand,
      opt: new Optimal(default_known, default_cards, default_decks, default_trials)
    };
    return _this5;
  }

  Calculator.prototype.onDeckChanged = function onDeckChanged(newState) {
    this.setState({ cards: newState.cards,
      decks: newState.decks,
      trials: newState.trials,
      known: newState.known,
      opt: new Optimal(newState.known, newState.cards, newState.decks, newState.trials)
    });
  };

  Calculator.prototype.onHandChanged = function onHandChanged(hand) {
    this.setState({ hand: hand });
  };

  Calculator.prototype.onPageChanged = function onPageChanged(page) {
    this.setState({ page: page });
  };

  Calculator.prototype.render = function render() {
    var remaining = this.state.cards - this.state.known;
    var deck_word = 'deck';
    if (this.state.decks > 1) deck_word = this.state.decks + ' decks';
    var deck_opts = React.createElement(Deck_Options, { callbackParent: this.onDeckChanged.bind(this),
      cards: default_cards,
      known: default_known,
      trials: default_trials,
      decks: default_decks
    });
    var main = '';

    switch (this.state.page) {
      case 'about':
        main = React.createElement(Rules, null);
        break;
      case 'general':
        main = React.createElement(
          'div',
          null,
          ' ',
          deck_opts,
          React.createElement(Bar_Graph, { data_func: this.state.opt.rank_general_chances.bind(this.state.opt),
            name: 'General Chances',
            description: 'Here are odds that a set of ' + this.state.cards + " cards from the " + deck_word + " contains each BS combination (four of a kind, any flush, any straight, etc). \nFor each of " + this.state.trials + " trials, the program chose a psuedorandom set of " + this.state.cards + ' cards from the ' + deck_word + " and judged whether the set contained each particular combition. \nIf a particular combination is not shown, it means the program found the combination less than .01% of the time. Keep in mind that these odds assume that 2's are wild cards." })
        );
        break;
      case 'specific':
        main = React.createElement(
          'div',
          null,
          deck_opts,
          React.createElement(Bar_Graph, { data_func: this.state.opt.rank_specific_chances.bind(this.state.opt),
            name: 'Specific Chances',
            description: 'Here are odds that a set of ' + this.state.cards + " cards from " + this.state.decks + " decks contains the particular BS call from each category which has the highest chance of occuring, based on the " + this.state.known + " known cards. \nFor each of " + this.state.trials + " trials, the program chose a psuedorandom hand of " + this.state.known + ' cards from the ' + deck_word + " and call the most likely BS call from each combination. For example, when the hand contained a large number of fives, the program called 4 of a kind fives rather than 4 of a kind sixes for the four of a kind combination. Then the program added a psuedorandom set of " + remaining + " cards to the hand and checked for the existance of each call. \nIf a particular call is not shown, it means the program found the combination less than .01% of the time. Keep in mind that these odds assume that 2's are wild cards." })
        );
        break;
      case 'play':
        main = React.createElement(
          'div',
          null,
          deck_opts,
          React.createElement(Hand_Options, { callbackParent: this.onHandChanged.bind(this) }),
          React.createElement(Bar_Graph, { data_func: this.state.opt.find_best_play.bind(this.state.opt, this.state.hand),
            name: 'Best Plays',
            description: 'Here are BS calls which have the highest chance of being true, given  a set of ' + this.state.cards + " cards from " + this.state.decks + " decks which includes the hand selected above. \nFor each of " + this.state.trials + " trials, the program added a psuedorandom set of  " + remaining + " cards to the hand and checked for the existance of each call. \nIf a particular call is not shown, it means the program found the combination less than .01% of the time. Keep in mind that these odds assume that 2's are wild cards." })
        );
        break;
    }

    return React.createElement(
      'div',
      null,
      React.createElement(NavBar, { cb: this.onPageChanged.bind(this) }),
      main,
      React.createElement(Footer, null)
    );
  };

  return Calculator;
}(React.Component);

var CardIcon = function (_React$Component6) {
  _inherits(CardIcon, _React$Component6);

  function CardIcon() {
    _classCallCheck(this, CardIcon);

    return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
  }

  CardIcon.prototype.render = function render() {
    var word = React.createElement('p', null);
    var style = {};
    if (this.props.suit >= 2) style = { color: '#C30A0A' };
    switch (this.props.suit) {
      case 0:
        word = React.createElement(
          'p',
          { style: style },
          '♠'
        );
        break;
      case 1:
        word = React.createElement(
          'p',
          { style: style },
          '♣'
        );
        break;
      case 2:
        word = React.createElement(
          'p',
          { style: style },
          '♦'
        );
        break;
      case 3:
        word = React.createElement(
          'p',
          { style: style },
          '♥'
        );
        break;
    }

    return React.createElement(
      'div',
      { className: 'card' },
      word,
      React.createElement(
        'p',
        { style: style },
        Card.num_char(this.props.num),
        ' '
      )
    );
  };

  return CardIcon;
}(React.Component);

var NavBar = function (_React$Component7) {
  _inherits(NavBar, _React$Component7);

  function NavBar() {
    _classCallCheck(this, NavBar);

    var _this7 = _possibleConstructorReturn(this, _React$Component7.call(this));

    _this7.state = {
      page: 'about'
    };
    return _this7;
  }

  NavBar.prototype.onPageChanged = function onPageChanged(newPage) {
    this.setState({ page: newPage });
    this.props.cb(newPage);
  };

  NavBar.prototype.render = function render() {
    var reg = "nav-item nav-link";
    var active = "nav-item nav-link active";
    return React.createElement(
      'nav',
      { className: 'navbar navbar-toggleable-md navbar-light bg-faded' },
      React.createElement(
        'p',
        { className: 'navbar-brand' },
        'BS'
      ),
      React.createElement(
        'div',
        { className: 'navbar-nav' },
        React.createElement(
          'a',
          { className: this.state.page == 'about' ? active : reg, onClick: this.onPageChanged.bind(this, 'about') },
          'About '
        ),
        React.createElement(
          'a',
          { className: this.state.page == 'general' ? active : reg, onClick: this.onPageChanged.bind(this, 'general') },
          'GeneralRank'
        ),
        React.createElement(
          'a',
          { className: this.state.page == 'specific' ? active : reg, onClick: this.onPageChanged.bind(this, 'specific') },
          'SpecificRank'
        ),
        React.createElement(
          'a',
          { className: this.state.page == 'play' ? active : reg, onClick: this.onPageChanged.bind(this, 'play') },
          'BestPlay'
        )
      )
    );
  };

  return NavBar;
}(React.Component);

var HandCardIcon = function (_React$Component8) {
  _inherits(HandCardIcon, _React$Component8);

  function HandCardIcon() {
    _classCallCheck(this, HandCardIcon);

    return _possibleConstructorReturn(this, _React$Component8.call(this));
  }

  HandCardIcon.prototype.clicked = function clicked() {
    this.props.cb(this.props.num, this.props.suit);
  };

  HandCardIcon.prototype.render = function render() {
    return React.createElement(
      'a',
      { onClick: this.clicked.bind(this) },
      React.createElement(CardIcon, { suit: this.props.suit, num: this.props.num })
    );
  };

  return HandCardIcon;
}(React.Component);

var HandCardSetIcon = function (_React$Component9) {
  _inherits(HandCardSetIcon, _React$Component9);

  function HandCardSetIcon() {
    _classCallCheck(this, HandCardSetIcon);

    return _possibleConstructorReturn(this, _React$Component9.apply(this, arguments));
  }

  HandCardSetIcon.prototype.render = function render() {
    var cb = this.props.cb;

    return React.createElement(
      'div',
      { className: 'container cardset' },
      this.props.cards.map(function (card) {
        return React.createElement(HandCardIcon, { suit: card.suit, num: card.num, cb: cb });
      })
    );
  };

  return HandCardSetIcon;
}(React.Component);

var CardSetIcon = function (_React$Component10) {
  _inherits(CardSetIcon, _React$Component10);

  function CardSetIcon() {
    _classCallCheck(this, CardSetIcon);

    return _possibleConstructorReturn(this, _React$Component10.apply(this, arguments));
  }

  CardSetIcon.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'container cardset' },
      this.props.cards.map(function (card, i) {
        return React.createElement(CardIcon, { num: card.num, suit: card.suit });
      })
    );
  };

  return CardSetIcon;
}(React.Component);

var Footer = function (_React$Component11) {
  _inherits(Footer, _React$Component11);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _React$Component11.apply(this, arguments));
  }

  Footer.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'footer' },
      React.createElement(
        'h3',
        null,
        '© 2017 Jennie Zheng '
      ),
      React.createElement(
        'ul',
        { className: 'fa-ul footer_links' },
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { target: '_blank', href: 'https://www.linkedin.com/in/jenniezheng' },
            React.createElement('i', { className: 'fa-linkedin fa' })
          )
        ),
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { target: '_blank', href: 'https://www.facebook.com/jenniezheng2' },
            ' ',
            React.createElement('i', { className: 'fa-facebook fa' })
          )
        ),
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { target: '_blank', href: 'https://github.com/jenniezheng321' },
            React.createElement('i', { className: 'fa-github fa' })
          )
        )
      )
    );
  };

  return Footer;
}(React.Component);

var tut1 = new Card_Set();
tut1.add(new Card(3, 2));
tut1.add(new Card(7, 0));
tut1.add(new Card(8, 0));
tut1.add(new Card(9, 1));
tut1.add(new Card(0, 3));
tut1.add(new Card(11, 2));
tut1.add(new Card(12, 1));

var tut2 = new Card_Set();
tut2.add(new Card(0, 3));
tut2.add(new Card(0, 2));
tut2.add(new Card(11, 1));
tut2.add(new Card(12, 3));
tut2.add(new Card(12, 2));
tut2.add(new Card(12, 1));

var tut3 = new Card_Set();
tut3.add(new Card(0, 3));
tut3.add(new Card(1, 3));
tut3.add(new Card(4, 3));
tut3.add(new Card(10, 3));
tut3.add(new Card(11, 3));
tut3.add(new Card(12, 3));

var tut4 = new Card_Set();
tut4.add(new Card(0, 3));
tut4.add(new Card(1, 1));
tut4.add(new Card(1, 3));
tut4.add(new Card(2, 2));
tut4.add(new Card(7, 1));

var Rules = function (_React$Component12) {
  _inherits(Rules, _React$Component12);

  function Rules() {
    _classCallCheck(this, Rules);

    return _possibleConstructorReturn(this, _React$Component12.apply(this, arguments));
  }

  Rules.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'rules jumbotron' },
      React.createElement(
        'h1',
        null,
        'How To'
      ),
      React.createElement(
        'h3',
        null,
        'Rules'
      ),
      React.createElement(
        'ul',
        null,
        React.createElement(
          'li',
          null,
          'Every player starts with 2 cards.'
        ),
        React.createElement(
          'li',
          null,
          'The players take turns going clockwise. Each turn, a player can call a higher hand or call BS on the previously called hand.'
        ),
        React.createElement(
          'li',
          null,
          'The player who lost a card gets to go first, or if that player is out, the next player goes first.'
        ),
        React.createElement(
          'li',
          null,
          'Players may only see their own hand but are calling hands regarding the cards pooled together by all players.'
        ),
        React.createElement(
          'li',
          null,
          'When a player calls BS, all players reveal their cards and sees whether the hand can be formed from 5 or more of the total cards'
        ),
        React.createElement(
          'li',
          null,
          'If the hand exists, the BS failed and the player who called BS gains a card.'
        ),
        React.createElement(
          'li',
          null,
          'If the hand doesn\'t exist, the BS succeeded and the player who called the hand gains a card.'
        ),
        React.createElement(
          'li',
          null,
          'The person who lost starts the next round.'
        ),
        React.createElement(
          'li',
          null,
          'A player is out when they have 6 cards in their hand.'
        ),
        React.createElement(
          'li',
          null,
          'The game continues until only one player is left.'
        )
      ),
      React.createElement(
        'h3',
        null,
        'Hands'
      ),
      React.createElement(
        'ul',
        null,
        React.createElement(
          'li',
          null,
          'Jokers are not part of the deck.'
        ),
        React.createElement(
          'li',
          null,
          '2\'s are wild cards which can be substituted for any rank or suit.'
        ),
        React.createElement(
          'li',
          null,
          'All regular poker hands are valid.'
        ),
        React.createElement(
          'li',
          null,
          'Straights, flushes, straight flushes, and of a kinds can extend beyond 5 cards'
        )
      ),
      React.createElement(
        'h3',
        null,
        'Examples'
      ),
      React.createElement(
        'ul',
        null,
        React.createElement(
          'li',
          null,
          ' The following contains a 6 long straight Ace high, because the wild card 2 can act as a queen.',
          React.createElement(CardSetIcon, { cards: tut1.cards })
        ),
        React.createElement('br', null),
        React.createElement(
          'li',
          null,
          ' The following does not contain a full house, 3 on 9. The wild card may act as either the third 3 or the second 9, but it cannot be both.',
          React.createElement(CardSetIcon, { cards: tut4.cards })
        ),
        React.createElement('br', null),
        React.createElement(
          'li',
          null,
          ' The following contains an Ace five of a kind, thanks to double wilds.',
          React.createElement(CardSetIcon, { cards: tut2.cards })
        ),
        React.createElement('br', null),
        React.createElement(
          'li',
          null,
          ' The following does not contain a hearts flush, Queen high. While there are enough hearts, only 4 are capable of being equal or below Queen (2, 3, 6, and Q).',
          React.createElement(CardSetIcon, { cards: tut3.cards })
        )
      )
    );
  };

  return Rules;
}(React.Component);

ReactDOM.render(React.createElement(Calculator, null), document.getElementById('app'));