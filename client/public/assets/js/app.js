jQuery(function ($) {
  $(".sidebar-dropdown > a").click(function() {
    $(".sidebar-single").removeClass("active");
    $(".sidebar-submenu").slideUp(150);
    if ($(this).parent().hasClass("active")) {
      $(".sidebar-dropdown").removeClass("active");
      $(this).parent().removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this).next(".sidebar-submenu").slideDown(150);
      $(this).parent().addClass("active");
    }
  });

  $(".sidebar-single > a").click(function(){
    if ($(this).parent().hasClass("active")) {
      $(".sidebar-dropdown").removeClass("active");
      $(".sidebar-submenu").slideUp(150);
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this).next(".sidebar-submenu").slideDown(150);
      $(".sidebar-submenu").slideUp(150);
    }
  })

  $("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
    $(".page-content > div").addClass("padding-extra")
  });
  $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
    $(".page-content > div").removeClass("padding-extra")
  });
})