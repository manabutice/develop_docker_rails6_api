# README
# docker+rails6+api modeの開発環境で作成しました。
# URL https://qiita.com/kurawo___D/items/53035a502f44d3b0835f
# Rails6［APIモード］+ MySQL5.7 を docker-compose で環境構築
Rails
,
MySQL
,
Docker
はじめに
自分用です
Rails6 APIモード + MySQL5.7 を Docker（docker compose） で環境構築

Dockerそのものの導入は省略

はじめに環境構築に必要なファイルを作成
以下のファイルを作成する
アプリ用のトップレベルディレクトリ
Dockerfile
docker-compose.yml
Gemfile
Gemfile.lock
アプリ用のトップレベルディレクトリ作成&移動
$ cd

$ mkdir sample_app

$ cd sample_app


Dockerfile, docker-compose.yml, Gemfile, Gemfile.lock作成
sample_app$ touch {Dockerfile,docker-compose.yml,Gemfile,Gemfile.lock}

sample_app$ ls
Dockerfile docker-compose.yml Gemfile Gemfile.lock


ファイルの中身書いていく
sample_app/Dockerfileファイル
Dockerfile
FROM ruby:2.6.5

# 必要なパッケージのインストール（Rails6からWebpackerがいるので、yarnをインストールする）
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
        && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
        && apt-get update -qq \
        && apt-get install -y build-essential libpq-dev nodejs yarn

# 作業ディレクトリの作成
RUN mkdir /myapp
WORKDIR /myapp

# ホスト側（ローカル）（左側）のGemfileを、コンテナ側（右側）のGemfileへ追加
ADD ./Gemfile /myapp/Gemfile
ADD ./Gemfile.lock /myapp/Gemfile.lock

# Gemfileのbundle install
RUN bundle install
ADD . /myapp


sample_app/docker-compose.yml
docker-compose.yml
version: '3'
services:
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: root
    ports:
    - "3306:3306"

  web:
    build: .
    command: /bin/sh -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3001 -b '0.0.0.0'"
    tty: true
    stdin_open: true
    depends_on:
      - db
    ports:
      - "3001:3001"
    volumes:
      - .:/myapp


sample_app/Gemfile
Gemfile
source 'https://rubygems.org'

gem 'rails', '~> 6.0.3'


Gemfile.lockは空のまま
docker-compose run コマンドで Rails アプリを作成
APIモードなので--apiオプション付与
バージョン６以降なので、--webpackerオプション付与
$ docker-compose run web rails new . --force --database=mysql --skip-bundle --api --webpacker


database.yml ファイルを修正
sample_app/config/database.yml ファイルに、コンテナに作成されたDB情報を記述する
database.yml
default: &default
    adapter: mysql2
    encoding: utf8
    pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
    username: root
    password: password  # docker-compose.ymlの MYSQL_ROOT_PASSWORD
    host: db    # docker-compose.ymlの service名


Dockerコンテナを起動する
コンテナの実行
$ docker-compose build


コンテナを起動
-d オプション付与でバックグラウンド実行をする。これを実行すると、コンテナを起動したままプロンプト画面へ戻る
$ docker-compose up -d


DBを作成する
まだコンテナを起動していない場合はしておく
$ docker-compose up -d


コンテナID確認
$ docker ps -a


確認したIDより、コンテナに入る
$ docker exec -it <コンテナのID> /bin/bash


DB作成
$ rails db:create
$ rails db:migrate


コンテナから出る
$ exit


コンテナに入らず、ローカルから実行する場合。コンテナ起動後に、docker-compose run コマンドを実行する
$ docker-compose run web rails db:create
$ docker-compose run web rails db:migrate


構築は以上。
localhost:3001で開くようになった。



その他
サーバーを止める場合
Ctrl + C で止めないこと。コンテナが残って次回起動時にエラーが出る
もしやってしまった場合、tmp/pids/server.pid を削除して、再びdocker-compose upで再起動する
$ docker-compose down


Dockerfileやdocker-compose.ymlの変更を反映、railsサーバー再起動
$ docker-compose up --build


bundle install などのコマンドを実行したい場合
#  docker-compose run { サービス名 } { 任意のコマンド }
$ docker-compose run web bundle install


ローカルからMySQLコンテナに接続
コンテナ起動してない場合は起動
$ docker-compose up -d


mysqlのidを確認
$ docker ps


MySQLコンテナにログイン
$ docker exec -it <MySQLのコンテナのID> /bin/bash


$ mysql -u root -p -h 0.0.0.0 -P 3306 --protocol=tcp

mysql>

// 脱出
mysql> quit


以上。



参考にさせて頂いた記事
丁寧すぎるDocker-composeによるrails5 + MySQL on Dockerの環境構築(Docker for Mac)
【Rails】Rails 6.0 x Docker x MySQLで環境構築
