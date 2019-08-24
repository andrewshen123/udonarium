/* Generated by Opal 0.11.4 */
(function(Opal) {
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send;

  Opal.add_stubs(['$!=', '$checkSuccess', '$getJuuten', '$+', '$<=', '$getDiceList', '$length', '$each', '$==', '$[]', '$>']);
  return (function($base, $super, $parent_nesting) {
    function $NjslyrBattle(){};
    var self = $NjslyrBattle = $klass($base, $super, 'NjslyrBattle', $NjslyrBattle);

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), TMP_NjslyrBattle_gameName_1, TMP_NjslyrBattle_gameType_2, TMP_NjslyrBattle_getHelpMessage_3, TMP_NjslyrBattle_check_2D6_4, TMP_NjslyrBattle_checkSuccess_5, TMP_NjslyrBattle_getJuuten_7;

    
    
    Opal.defn(self, '$gameName', TMP_NjslyrBattle_gameName_1 = function $$gameName() {
      var self = this;

      return "NJSLYRBATTLE"
    }, TMP_NjslyrBattle_gameName_1.$$arity = 0);
    
    Opal.defn(self, '$gameType', TMP_NjslyrBattle_gameType_2 = function $$gameType() {
      var self = this;

      return "NJSLYRBATTLE"
    }, TMP_NjslyrBattle_gameType_2.$$arity = 0);
    
    Opal.defn(self, '$getHelpMessage', TMP_NjslyrBattle_getHelpMessage_3 = function $$getHelpMessage() {
      var self = this;

      return "" + "・カラテロール\n" + "2d6<=(カラテ点)\n" + "例）2d6<=5\n" + "(2D6<=5) ＞ 2[1,1] ＞ 2 ＞ 成功 重点 3 溜まる\n"
    }, TMP_NjslyrBattle_getHelpMessage_3.$$arity = 0);
    
    Opal.defn(self, '$check_2D6', TMP_NjslyrBattle_check_2D6_4 = function $$check_2D6(total_n, dice_n, signOfInequality, diff, dice_cnt, dice_max, n1, n_max) {
      var self = this, success = nil, juuten = nil;

      
      if ($truthy(signOfInequality['$!=']("<="))) {
        return ""};
      success = self.$checkSuccess(total_n, diff);
      juuten = self.$getJuuten();
      return $rb_plus(success, juuten);
    }, TMP_NjslyrBattle_check_2D6_4.$$arity = 8);
    
    Opal.defn(self, '$checkSuccess', TMP_NjslyrBattle_checkSuccess_5 = function $$checkSuccess(total_n, diff) {
      var self = this;

      
      if ($truthy($rb_le(total_n, diff))) {
        return " ＞ 成功"};
      return " ＞ 失敗";
    }, TMP_NjslyrBattle_checkSuccess_5.$$arity = 2);
    return (Opal.defn(self, '$getJuuten', TMP_NjslyrBattle_getJuuten_7 = function $$getJuuten() {
      var TMP_6, self = this, diceList = nil, juuten = nil;

      
      diceList = self.$getDiceList();
      if ($truthy(diceList.$length()['$!='](2))) {
        return ""};
      juuten = 0;
      $send(diceList, 'each', [], (TMP_6 = function(i){var self = TMP_6.$$s || this;
if (i == null) i = nil;
      
        if (i['$=='](1)) {
          juuten = $rb_plus(juuten, 1)};
        if (i['$=='](6)) {
          return (juuten = $rb_plus(juuten, 1))
          } else {
          return nil
        };}, TMP_6.$$s = self, TMP_6.$$arity = 1, TMP_6));
      if (diceList['$[]'](0)['$=='](diceList['$[]'](1))) {
        juuten = $rb_plus(juuten, 1)};
      if ($truthy($rb_gt(juuten, 0))) {
        return "" + " 重点 " + (juuten) + " 溜まる"};
      return "";
    }, TMP_NjslyrBattle_getJuuten_7.$$arity = 0), nil) && 'getJuuten';
  })($nesting[0], Opal.const_get_relative($nesting, 'DiceBot'), $nesting)
})(Opal);

/* Generated by Opal 0.11.4 */
(function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return Opal.const_get_relative($nesting, 'Kernel').$exit()
})(Opal);
