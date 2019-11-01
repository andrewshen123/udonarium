/* Generated by Opal 0.11.4 */
(function(Opal) {
  function $rb_times(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy;

  Opal.add_stubs(['$setPrefixes', '$===', '$to_i', '$last_match', '$nil?', '$*', '$checkRoll', '$>', '$+', '$<', '$checkDamage', '$<=', '$roll', '$gsub', '$collect', '$split', '$map!', '$-', '$join', '$sort', '$select', '$>=', '$size', '$count', '$reverse', '$delete', '$slice', '$inject', '$each', '$push']);
  return (function($base, $super, $parent_nesting) {
    function $Raisondetre(){};
    var self = $Raisondetre = $klass($base, $super, 'Raisondetre', $Raisondetre);

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), TMP_Raisondetre_initialize_1, TMP_Raisondetre_gameName_2, TMP_Raisondetre_gameType_3, TMP_Raisondetre_getHelpMessage_4, TMP_Raisondetre_rollDiceCommand_5, TMP_Raisondetre_checkRoll_9, TMP_Raisondetre_checkDamage_13;

    def.sortTye = nil;
    
    
    Opal.defn(self, '$initialize', TMP_Raisondetre_initialize_1 = function $$initialize() {
      var self = this, $iter = TMP_Raisondetre_initialize_1.$$p, $yield = $iter || nil, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;

      if ($iter) TMP_Raisondetre_initialize_1.$$p = null;
      // Prepare super implicit arguments
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      
      $send(self, Opal.find_super_dispatcher(self, 'initialize', TMP_Raisondetre_initialize_1, false), $zuper, $iter);
      return (self.sortType = 1);
    }, TMP_Raisondetre_initialize_1.$$arity = 0);
    self.$setPrefixes(["(-)?(\\d+)?RD(\\d+)?(@(\\d+))?", "(-)?(\\d+)?DD([1-9])?([\\+\\-]\\d+)?"]);
    
    Opal.defn(self, '$gameName', TMP_Raisondetre_gameName_2 = function $$gameName() {
      var self = this;

      return "叛逆レゾンデートル"
    }, TMP_Raisondetre_gameName_2.$$arity = 0);
    
    Opal.defn(self, '$gameType', TMP_Raisondetre_gameType_3 = function $$gameType() {
      var self = this;

      return "Raisondetre"
    }, TMP_Raisondetre_gameType_3.$$arity = 0);
    
    Opal.defn(self, '$getHelpMessage', TMP_Raisondetre_getHelpMessage_4 = function $$getHelpMessage() {
      var self = this;

      return "" + "判定：[判定値]RD[技能][@目標値]\n" + "ダメージロール：[ダイス数]DD[装甲]\n" + "\n" + "[]内のコマンドは省略可能。\n" + "「判定値」で判定に使用するダイス数を指定。省略時は「1」。0以下も指定可。\n" + "「技能」で有効なダイス数を指定。省略時は「1」。\n" + "達成値はクリティカルを含めて、「最も高くなる」ように計算します。\n" + "「@目標値」指定で、判定の成否を追加表示します。\n" + "\n" + "ダメージロールは[装甲]指定で、有効なダイス数と0の出目の数を表示します。\n" + "[装甲]省略時は、ダイス結果のみ表示します。（複数の対象への攻撃時用）\n" + "\n" + "【書式例】\n" + "・RD → 1Dで達成値を表示。\n" + "・2RD1@8 → 2D（1個選択）で目標値8の判定。\n" + "・-3RD → 1Dでダイスペナルティ-4の判定。\n" + "・4DD2 → 4Dで装甲2のダメージロール。\n"
    }, TMP_Raisondetre_getHelpMessage_4.$$arity = 0);
    
    Opal.defn(self, '$rollDiceCommand', TMP_Raisondetre_rollDiceCommand_5 = function $$rollDiceCommand(command) {
      var $a, self = this, diceCount = nil, choiceCount = nil, target = nil, armor = nil;

      
      if ($truthy(/(-)?(\d+)?RD(\d+)?(@(\d+))?$/i['$==='](command))) {
        
        diceCount = ($truthy($a = Opal.const_get_relative($nesting, 'Regexp').$last_match(2)) ? $a : 1).$to_i();
        if ($truthy(Opal.const_get_relative($nesting, 'Regexp').$last_match(1)['$nil?']())) {
          } else {
          diceCount = $rb_times(diceCount, -1)
        };
        choiceCount = ($truthy($a = Opal.const_get_relative($nesting, 'Regexp').$last_match(3)) ? $a : 1).$to_i();
        target = ($truthy($a = Opal.const_get_relative($nesting, 'Regexp').$last_match(5)) ? $a : 0).$to_i();
        return self.$checkRoll(diceCount, choiceCount, target);
      } else if ($truthy(/(-)?(\d+)?DD([1-9])?([\+\-]\d+)?$/i['$==='](command))) {
        
        diceCount = ($truthy($a = Opal.const_get_relative($nesting, 'Regexp').$last_match(2)) ? $a : 1).$to_i();
        if ($truthy(Opal.const_get_relative($nesting, 'Regexp').$last_match(1)['$nil?']())) {
          } else {
          diceCount = $rb_times(diceCount, -1)
        };
        armor = ($truthy($a = Opal.const_get_relative($nesting, 'Regexp').$last_match(3)) ? $a : 0).$to_i();
        if ($truthy($rb_gt(armor, 0))) {
          
          armor = $rb_plus(armor, ($truthy($a = Opal.const_get_relative($nesting, 'Regexp').$last_match(4)) ? $a : 0).$to_i());
          if ($truthy($rb_lt(armor, 1))) {
            armor = 1};
          if ($truthy($rb_gt(armor, 9))) {
            armor = 9};};
        return self.$checkDamage(diceCount, armor);};
      return nil;
    }, TMP_Raisondetre_rollDiceCommand_5.$$arity = 1);
    
    Opal.defn(self, '$checkRoll', TMP_Raisondetre_checkRoll_9 = function $$checkRoll(diceCount, choiceCount, target) {
      var $a, $b, TMP_6, TMP_7, TMP_8, self = this, correction = nil, rollCount = nil, dice = nil, diceText = nil, diceText2 = nil, diceArray = nil, funbleArray = nil, isFunble = nil, success = nil, criticalCount = nil, critical = nil, choiceArray = nil, choiceText = nil, result = nil;

      
      if ($truthy($rb_le(diceCount, 0))) {
        
        correction = $rb_plus(1, $rb_times(diceCount, -1));
        rollCount = 1;
        } else {
        
        correction = 0;
        rollCount = diceCount;
      };
      $b = self.$roll(rollCount, 10, self.sortTye), $a = Opal.to_ary($b), (dice = ($a[0] == null ? nil : $a[0])), (diceText = ($a[1] == null ? nil : $a[1])), $b;
      diceText2 = diceText.$gsub("10", "0");
      diceArray = $send(diceText2.$split(/,/), 'collect', [], (TMP_6 = function(i){var self = TMP_6.$$s || this;
if (i == null) i = nil;
      return i.$to_i()}, TMP_6.$$s = self, TMP_6.$$arity = 1, TMP_6));
      $send(diceArray, 'map!', [], (TMP_7 = function(i){var self = TMP_7.$$s || this;
if (i == null) i = nil;
      return $rb_minus(i, correction)}, TMP_7.$$s = self, TMP_7.$$arity = 1, TMP_7));
      diceText2 = diceArray.$sort().$join(",");
      funbleArray = $send(diceArray, 'select', [], (TMP_8 = function(i){var self = TMP_8.$$s || this;
if (i == null) i = nil;
      return $rb_le(i, 1)}, TMP_8.$$s = self, TMP_8.$$arity = 1, TMP_8));
      isFunble = $rb_ge(funbleArray.$size(), rollCount);
      dice = 0;
      success = 0;
      if ($truthy(isFunble)) {
        } else {
        
        criticalCount = diceArray.$count(0);
        critical = $rb_times(criticalCount, 10);
        choiceArray = diceArray.$reverse();
        choiceArray.$delete(0);
        choiceArray = choiceArray.$slice(Opal.Range.$new(0, $rb_minus(choiceCount, 1), false));
        choiceText = choiceArray.$join(",");
        dice = choiceArray.$inject("+");
        success = $rb_plus(dice, critical);
      };
      result = "" + (rollCount) + "D10";
      if ($truthy($rb_gt(correction, 0))) {
        result = $rb_plus(result, "" + "-" + (correction))};
      result = $rb_plus(result, "" + " ＞ [" + (diceText) + "] ＞ [" + (diceText2) + "] ＞ ");
      if ($truthy(isFunble)) {
        result = $rb_plus(result, "達成値：0 (Funble)")
        } else {
        
        result = $rb_plus(result, "" + (dice) + "[" + (choiceText) + "]");
        if ($truthy($rb_gt(critical, 0))) {
          result = $rb_plus(result, "" + "+" + (critical))};
        result = $rb_plus(result, "" + "=達成値：" + (success));
        if ($truthy($rb_gt(critical, 0))) {
          result = $rb_plus(result, "" + " (" + (criticalCount) + "Critical)")};
      };
      if ($truthy($rb_gt(target, 0))) {
        
        result = $rb_plus(result, "" + ">=" + (target) + " ");
        if ($truthy($rb_ge(success, target))) {
          result = $rb_plus(result, "【成功】")};
        if ($truthy($rb_lt(success, target))) {
          result = $rb_plus(result, "【失敗】")};};
      return result;
    }, TMP_Raisondetre_checkRoll_9.$$arity = 3);
    return (Opal.defn(self, '$checkDamage', TMP_Raisondetre_checkDamage_13 = function $$checkDamage(diceCount, armor) {
      var $a, $b, TMP_10, TMP_11, TMP_12, self = this, correction = nil, rollCount = nil, dice = nil, diceText = nil, diceText2 = nil, diceArray = nil, criticalCount = nil, result = nil, resultArray = nil, success = nil, resultText = nil;

      
      if ($truthy($rb_le(diceCount, 0))) {
        
        correction = $rb_plus(1, $rb_times(diceCount, -1));
        rollCount = 1;
        } else {
        
        correction = 0;
        rollCount = diceCount;
      };
      $b = self.$roll(rollCount, 10, self.sortTye), $a = Opal.to_ary($b), (dice = ($a[0] == null ? nil : $a[0])), (diceText = ($a[1] == null ? nil : $a[1])), $b;
      diceText2 = diceText.$gsub("10", "0");
      diceArray = $send(diceText2.$split(/,/), 'collect', [], (TMP_10 = function(i){var self = TMP_10.$$s || this;
if (i == null) i = nil;
      return i.$to_i()}, TMP_10.$$s = self, TMP_10.$$arity = 1, TMP_10)).$sort();
      criticalCount = diceArray.$count(0);
      $send(diceArray, 'map!', [], (TMP_11 = function(i){var self = TMP_11.$$s || this;
if (i == null) i = nil;
      return $rb_minus(i, correction)}, TMP_11.$$s = self, TMP_11.$$arity = 1, TMP_11));
      diceText2 = diceArray.$join(",");
      result = "" + (rollCount) + "D10";
      if ($truthy($rb_gt(correction, 0))) {
        result = $rb_plus(result, "" + "-" + (correction))};
      result = $rb_plus(result, "" + " ＞ [" + (diceText) + "] ＞ [" + (diceText2) + "]");
      if ($truthy($rb_gt(armor, 0))) {
        
        resultArray = [];
        success = 0;
        $send(diceArray, 'each', [], (TMP_12 = function(i){var self = TMP_12.$$s || this;
if (i == null) i = nil;
        if ($truthy($rb_ge(i, armor))) {
            
            resultArray.$push(i);
            return (success = $rb_plus(success, 1));
            } else {
            return resultArray.$push("×")
          }}, TMP_12.$$s = self, TMP_12.$$arity = 1, TMP_12));
        resultText = resultArray.$join(",");
        result = $rb_plus(result, "" + " ＞ [" + (resultText) + "]>=" + (armor) + " 有効数：" + (success));};
      result = $rb_plus(result, "" + "　0=" + (criticalCount) + "個");
      return result;
    }, TMP_Raisondetre_checkDamage_13.$$arity = 2), nil) && 'checkDamage';
  })($nesting[0], Opal.const_get_relative($nesting, 'DiceBot'), $nesting)
})(Opal);

/* Generated by Opal 0.11.4 */
(function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return Opal.const_get_relative($nesting, 'Kernel').$exit()
})(Opal);