const backdrop = document.querySelector(".backdrop");
const sideDrawer = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector("#side-menu-toggle");

function backdropClickHandler() {
  backdrop.style.display = "none";
  sideDrawer.classList.remove("open");
}

function menuToggleClickHandler() {
  backdrop.style.display = "block";
  sideDrawer.classList.add("open");
}

function checkCovid() {}

backdrop.addEventListener("click", backdropClickHandler);
menuToggle.addEventListener("click", menuToggleClickHandler);

//  handle submit form choose month for salary''
if ($(".form-select-month")) {
  $(".select-month").on("change", function () {
    $(".form-select-month").submit();
  });
}

//  handle submit form per page pagination''
if ($(".form-select-pageSize")) {
  $(".select-pageSize").on("change", function () {
    $(".form-select-pageSize").submit();
  });
}

//picker date custom
$(".dateeee").datepicker({
  multidate: true,
  format: "dd-mm-yyyy"
});
