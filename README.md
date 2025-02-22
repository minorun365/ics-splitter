# ICS Splitter

iCloudカレンダーからGoogleカレンダーへの移行を支援するツール。
1MBを超えるICSファイルを複数の小さなファイルに分割します。

## 機能

- ICSファイルを1MB以下のサイズに分割
- イベント単位での分割によるデータの整合性保持
- 分割ファイルサイズのカスタマイズ可能

## 必要条件

- Node.js (バージョン12以上推奨)

## インストール

```bash
git clone https://github.com/あなたのユーザー名/ics-splitter.git
cd ics-splitter
```

## 使い方

```bash
node splitter.js カレンダー.ics
```

分割されたファイルは `split_1.ics`, `split_2.ics` などの名前で保存されます。

## 注意事項

- 元のICSファイルのバックアップを取ることを推奨します
- このツールの使用によりいかなる不利益を負っても、作者は責任を持ちません。自己判断で利用ください
