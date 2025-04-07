$(function () {
    // windowのスクロールした時の処理を指定
    $(window).scroll(function () {
      // windowのスクロール位置を取得する
      var st = $(this).scrollTop();
  
      // クラス名にscroll_を含む要素全てに対して処理を行う
      $("[class*='scroll_'").each(function () {
        var elm = $(this);
        var elmpos = elm.offset().top; //要素のtopからの位置
        var wh = $(window).height(); // ウィンドウの高さ
  
        // スクロール量が対象要素のtopからの位置+画面の1/10になったらshowクラスを追加
        // →画面に対象要素が1/10見えたら
        if (st > elmpos - wh + wh / 10) {
          elm.addClass("show");
        } else {
          elm.removeClass("show");
        }
      });
    });
  });