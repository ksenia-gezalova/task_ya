# task_ya

test task for yandex

1.  Разработать клиентское приложение (сайт), где будет табло аэропорта.
    Для решения был использован API Аэропорта Шереметьево по адресу https://www.svo.aero, так как данный API не предусматривает работу с кросс-доменными запросами, был использован nginx в качестве проксирующего сервера со следующим конфигурационным файлом:
    server {
    listen 11111;
    location / {
    proxy_pass https://www.svo.aero;
    proxy_hide_header Access-Control-Allow-Origin;
    proxy_set_header Referrer "";
    add_header Access-Control-Allow-Origin \*;
    }
    }
    Соответственно, для проверки работы приложения, необходимо поднять у себя аналогичный сервер.

2.  Почему this.\_i не увеличивается. Как исправить?
    Дано:
    function Ticker() {
    this.\_i = 0;
    };

    Ticker.prototype = {
    tick: function () {
    console.log(this.\_i++);
    }
    };
    var ticker = new Ticker();
    setInterval(ticker.tick, 1000);

    Решение:
    Проблема в том, что setInterval получил функцию ticker.tick, но не ее контекст. То есть, по сути, получается вот что:
    var f = ticker.tick;
    setInterval(f, 1000); //контекст ticker потерян

        1. Добавить обертку:
            setInterval(function() {
                ticker.tick()
            }, 1000) // код работает, так как ticker достаётся из замыкания.
        2. Использовать байнд: setInterval(bind(ticker.tick, ticker), 1000);
