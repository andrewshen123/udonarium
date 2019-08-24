# -*- coding: utf-8 -*-

require 'diceBot/Gundog'

class GundogZero < Gundog
  setPrefixes(['(.DPT|.FT)\d*'])

  def gameName
    'ガンドッグ・ゼロ'
  end

  def gameType
    "GundogZero"
  end

  def getHelpMessage
    return <<INFO_MESSAGE_TEXT
失敗、成功、クリティカル、ファンブルとロールの達成値の自動判定を行います。
nD9ロールも対応。
・ダメージペナルティ表　　(〜DPTx) (x:修正)
　射撃(SDPT)、格闘(MDPT)、車両(VDPT)、汎用(GDPT)の各表を引くことが出来ます。
　修正を後ろに書くことも出来ます。
・ファンブル表　　　　　　(〜FTx)  (x:修正)
　射撃(SFT)、格闘(MFT)、投擲(TFT)の各表を引くことが出来ます。
　修正を後ろに書くことも出来ます。
INFO_MESSAGE_TEXT
  end

  def rollDiceCommand(command)
    string = command.upcase

    table = []
    ttype = ""
    type = ""
    dice = 0
    mod = 0

    # ダメージペナルティ表
    if /(\w)DPT([\+\-\d]*)/i =~ string
      ttype = 'ダメージペナルティー'
      head = $1
      mod = parren_killer("(0#{$2})").to_i if $2

      type, table = getDamageTypeAndTable(head)
    end

    # ファンブル表
    if /(\w)FT([\+\-\d]*)/i =~ string
      ttype = 'ファンブル'
      head = $1
      mod = parren_killer("(0#{$2})").to_i if $2

      type, table = getFumbleTypeAndTable(head)
    end

    return '1' if type.empty?

    dice = rand(10) + rand(10) + mod
    diceOriginalText = dice
    dice = 0 if dice < 0
    dice = 18 if dice > 18

    output = "#{type}#{ttype}表[#{diceOriginalText}] ＞ #{table[dice]}"

    return output
  end

  def getDamageTypeAndTable(head)
    case head
    when "S"
      type = '射撃'
      # 射撃ダメージペナルティー表
      table = [
        '対象は[死亡]', # 0
        '[追加D]4D6/[出血]2D6/[重傷]-30％/[朦朧判定]15',    # 1
        '[追加D]3D6/[出血]2D6/[重傷]-30％/[朦朧判定]14',    # 2
        '[追加D]3D6/[出血]2D6/[重傷]-20％/[朦朧判定]14',    # 3
        '[追加D]3D6/[出血]1D6/[重傷]-20％/[朦朧判定]12',    # 4
        '[追加D]2D6/[出血]1D6/[重傷]-10％/[朦朧判定]12',    # 5
        '[追加D]2D6/[軽傷]-20％/[朦朧判定]10',              # 6
        '[追加D]2D6/[軽傷]-10％/[朦朧判定]10',              # 7
        '[追加D]2D6/[軽傷]-20％/[朦朧判定]8',               # 8
        '[追加D]2D6/[軽傷]-20％/[朦朧判定]6',               # 9
        '[追加D]2D6/[軽傷]-10％/[朦朧判定]4',               # 10
        '[追加D]1D6/[軽傷]-20％',                           # 11
        '[追加D]1D6/[軽傷]-20％',                           # 12
        '[追加D]1D6/[軽傷]-10％',                           # 13
        '[軽傷]-20％',                                      # 14
        '[軽傷]-10％',                                      # 15
        '[軽傷]-10％',                                      # 16
        '手に持った武器を落とす', # 17
        'ペナルティー無し', # 18
      ]

    when "M"
      type = '格闘'
      # 格闘ダメージペナルティー表
      table = [
        '対象は[死亡]', # 0
        '[追加D]3D6/[出血]2D6/[重傷]-30％/[朦朧判定]15',    # 1
        '[追加D]2D6/[出血]2D6/[重傷]-30％/[朦朧判定]14',    # 2
        '[追加D]2D6/[出血]1D6/[重傷]-20％/[朦朧判定]14',    # 3
        '[追加D]3D6/[出血]1D6/[重傷]-10％/[朦朧判定]12',    # 4
        '[追加D]2D6/[軽傷]-20％/[朦朧判定]12',              # 5
        '[追加D]2D6/[軽傷]-10％/[朦朧判定]12',              # 6
        '[追加D]2D6/[軽傷]-10％/[朦朧判定]10',              # 7
        '[追加D]1D6/[軽傷]-20％/[朦朧判定]8',               # 8
        '[追加D]1D6/[軽傷]-10％/[朦朧判定]8',               # 9
        '[追加D]1D6/[軽傷]-10％/[朦朧判定]6',               # 10
        '[軽傷]-20％/[朦朧判定]6',                          # 11
        '[軽傷]-10％/[朦朧判定]6',                          # 12
        '[軽傷]-10％/[朦朧判定]4',                          # 13
        '[軽傷]-20％',                                      # 14
        '[軽傷]-10％',                                      # 15
        '[軽傷]-10％',                                      # 16
        '手に持った武器を落とす', # 17
        'ペナルティー無し', # 18
      ]

    when "V"
      type = '車両'
      # 車両ダメージペナルティー表
      table = [
        '[クラッシュ]する。[チェイス]から除外', # 0
        '[乗員D]3D6/[操縦性]-20％/[スピン判定]',            # 1
        '[乗員D]3D6/[操縦性]-20％/[スピン判定]',            # 2
        '[乗員D]2D6/[操縦性]-10％/[スピン判定]',            # 3
        '[乗員D]2D6/[操縦性]-10％/[スピン判定]',            # 4
        '[乗員D]3D6/[スピード]-2/[スピン判定]',             # 5
        '[乗員D]3D6/[スピード]-2/[スピン判定]',             # 6
        '[乗員D]2D6/[スピード]-1/[スピン判定]',             # 7
        '[乗員D]2D6/[スピード]-1/[スピン判定]',             # 8
        '[乗員D]2D6/[操縦判定]-20％',                       # 9
        '[乗員D]2D6/[操縦判定]-20％',                       # 10
        '[乗員D]1D6/[操縦判定]-10％',                       # 11
        '[乗員D]1D6/[操縦判定]-10％',                       # 12
        '[スピン判定]',                                     # 13
        '[スピン判定]',                                     # 14
        '乗員に[ショック]-20％',                            # 15
        '乗員に[ショック]-10％',                            # 16
        '乗員に[ショック]-10％',                            # 17
        'ペナルティー無し',                                 # 18
      ]

    when "G"
      type = '汎用'
      # 汎用ダメージペナルティー表
      table = [
        '対象は[死亡]', # 0
        '[追加D]4D6/[出血]2D6/[重傷]-30％/[朦朧判定]18',    # 1
        '[追加D]4D6/[出血]2D6/[重傷]-30％/[朦朧判定]16',    # 2
        '[追加D]3D6/[出血]2D6/[重傷]-20％/[朦朧判定]14',    # 3
        '[追加D]3D6/[出血]2D6/[重傷]-20％/[朦朧判定]14',    # 4
        '[追加D]3D6/[出血]1D6/[重傷]-10％/[朦朧判定]12',    # 5
        '[追加D]2D6/[出血]1D6/[重傷]-10％/[朦朧判定]12',    # 6
        '[追加D]2D6/[軽傷]-30％/[朦朧判定]12',              # 7
        '[追加D]2D6/[軽傷]-30％/[朦朧判定]10',              # 8
        '[追加D]2D6/[軽傷]-30％/[朦朧判定]8',               # 9
        '[追加D]2D6/[軽傷]-20％/[朦朧判定]8',               # 10
        '[追加D]2D6/[軽傷]-20％/[朦朧判定]6',               # 11
        '[追加D]2D6/[軽傷]-10％/[朦朧判定]6',               # 12
        '[追加D]1D6/[軽傷]-20％/[朦朧判定]4',               # 13
        '[追加D]1D6/[軽傷]-20％',                           # 14
        '[追加D]1D6/[軽傷]-10％',                           # 15
        '[軽傷]-20％',                                      # 16
        '[軽傷]-10％',                                      # 17
        'ペナルティー無し', # 18
      ]
    else
      head = "S" # 間違ったら射撃扱い
      type, table = getDamageTypeAndTable(head)
    end

    return type, table
  end

  def getFumbleTypeAndTable(head)
    case head
    when "S"
      type = '射撃'
      # 射撃ファンブル表
      table = [
        '銃器が暴発、自分に命中。[貫通D]', # 0
        '銃器が暴発、自分に命中。[非貫通D]', # 1
        '誤射。ランダムに味方に命中。[貫通D]', # 2
        '誤射。ランダムに味方に命中。[非貫通D]', # 3
        '銃器が完全に故障',                                 # 4
        '銃器が完全に故障',                                 # 5
        '故障。〈メカニック〉判定に成功するまで射撃不可',   # 6
        '故障。〈メカニック〉判定に成功するまで射撃不可',   # 7
        '作動不良。[アイテム使用]を2回行って修理するまで射撃不可',  # 8
        '作動不良。[アイテム使用]を2回行って修理するまで射撃不可',  # 9
        '作動不良。[アイテム使用]を行って修理するまで射撃不可', # 10
        '作動不良。[アイテム使用]を行って修理するまで射撃不可', # 11
        '姿勢を崩す。[不安定]',                             # 12
        '姿勢を崩す。[不安定]',                             # 13
        '姿勢を崩す。[ショック]-20％',                      # 14
        '姿勢を崩す。[ショック]-20％',                      # 15
        '姿勢を崩す。[ショック]-10％',                      # 16
        '姿勢を崩す。[ショック]-10％',                      # 17
        'ペナルティー無し', # 18
      ]
    when "M"
      type = '格闘'
      # 格闘ファンブル表
      table = [
        '避けられて[転倒]、[朦朧]状態', # 0
        'ランダムに[至近距離]の味方(居なければ自分)に命中。[貫通D]',    # 1
        'ランダムに[至近距離]の味方(居なければ自分)に命中。[貫通D]',    # 2
        '武器が完全に壊れる', # 3
        '武器がガタつく。〈手先〉判定に成功するまで使用不可',   # 4
        '武器がガタつく。〈手先〉判定に成功するまで使用不可',   # 5
        '無理な姿勢で筋を伸ばす。[軽傷]-30％',              # 6
        '無理な姿勢で筋を伸ばす。[軽傷]-30％',              # 7
        '無理な姿勢で筋を伸ばす。[軽傷]-20％',              # 8
        '無理な姿勢で筋を伸ばす。[軽傷]-20％',              # 9
        '無理な姿勢で筋を伸ばす。[軽傷]-10％',              # 10
        '無理な姿勢で筋を伸ばす。[軽傷]-10％',              # 11
        '姿勢を崩す。[不安定]',                             # 12
        '姿勢を崩す。[不安定]',                             # 13
        '姿勢を崩す。[ショック]-20％',                      # 14
        '姿勢を崩す。[ショック]-20％',                      # 15
        '姿勢を崩す。[ショック]-10％',                      # 16
        '姿勢を崩す。[ショック]-10％',                      # 17
        'ペナルティー無し', # 18
      ]
    when "T"
      type = '投擲'
      # 投擲ファンブル表
      table = [
        '[転倒]、[朦朧]状態', # 0
        '自分に命中。[貫通D]', # 1
        '自分に命中。[非貫通D]', # 2
        'ランダムに味方(居なければ自分)に命中。[非貫通D]',  # 3
        'ランダムに味方(居なければ自分)に命中。[非貫通D]',  # 4
        '武器が完全に壊れる',                               # 5
        '武器が完全に壊れる',                               # 6
        '腰を痛める。[軽傷]-30％',                          # 7
        '肩を痛める。[軽傷]-20％',                          # 8
        '肩を痛める。[軽傷]-20％',                          # 9
        '肘に違和感。[軽傷]-10％',                          # 10
        '肘に違和感。[軽傷]-10％',                          # 11
        '姿勢を崩す。[不安定]',                             # 12
        '姿勢を崩す。[不安定]',                             # 13
        '姿勢を崩す。[ショック]-20％',                      # 14
        '姿勢を崩す。[ショック]-20％',                      # 15
        '姿勢を崩す。[ショック]-10％',                      # 16
        '姿勢を崩す。[ショック]-10％',                      # 17
        'ペナルティー無し', # 18
      ]
    else
      head = "S" # 間違ったら射撃扱い
      type, table = getFumbleTypeAndTable(head)
    end

    return type, table
  end
end
