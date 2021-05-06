
// mobile nav button listeners
document.querySelector(".toggleMobileNav").addEventListener("click", function() {
	toggleMobileNav();
});
document.querySelector(".toggleMobileNavClose").addEventListener("click", function() {
	toggleMobileNav();
});

function toggleMobileNav() {
  document.querySelector(".mobile-nav-items").classList.toggle("mobile-nav-active");
  document.querySelector(".mobile-nav-items-backdrop").classList.toggle("mobile-nav-active");
}


//hide on scroll
pageMap = document.getElementById("pageMap");

var scrollChecker = function() {
    if (window.innerHeight + window.scrollY > document.body.clientHeight-400) {
         pageMap.className = "page-map vis-hide"
    } else {
    	pageMap.className = "page-map vis-show"
    }
};

if(pageMap!=null) {
	window.addEventListener("scroll", scrollChecker);
}


//Check if mobile device, so we can apply "fill-available" css
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  	// true for mobile device
	homepageHero = document.getElementById("homepageHero");
	homepageHero.classList.add("fill-available")
  window.onresize = windowSizeChange;

}else{
  // false for not mobile device

}




//only fires on mobile, for rotating devices
function windowSizeChange() {
  homepageHero = document.getElementById("homepageHero");
  homepageHero.classList.remove("fill-available")
}

window.addEventListener("orientationchange", function(event) {
  windowSizeChange();
});

