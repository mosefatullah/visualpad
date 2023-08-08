//// GLOBAL

const tooltipTriggerList = document.querySelectorAll(
 '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
 (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

const notifyAlerts = document.querySelectorAll(".notifyAlert");
notifyAlerts.forEach((i) => {
 bootstrap.Toast.getOrCreateInstance(i).show();
});

//// SIDEBAR
let settingFlag = false;
let profileFlag = false;

$(".__sidebar .setting").on("click", () => {
 $(".__setting-canvas").show();
 settingFlag = true;
});
$(".__sidebar .profile").on("click", () => {
 $(".__profile-canvas").show();
 profileFlag = true;
});

const allButtonsOfSidebar = [
 ".explorer",
 ".search",
 ".source",
 ".project",
 ".extension",
];
const allSystemButtonsOfSidebar = [".menu", ".profile", ".setting"];

allButtonsOfSidebar.map((b) => {
 let button = $(".__sidebar " + b),
  container = $(".__sidepanel " + b + "-section");

 button.on("click", () => {
  allButtonsOfSidebar.map((c) => {
   $(".__sidebar " + c).removeClass("active");
   $(".__sidepanel " + c + "-section").hide();
  });
  button.addClass("active");
  container.show();
 });
});

//// BODY
const closeIndex = document.querySelectorAll(
 ".__body .__top .index:not(.right) span"
);
const pageIndex = document.querySelectorAll(
 ".__body .__top .index:not(.right)"
);

$(".__body .__top .welcome").on("click", () => {
 $(".__allPages").hide();
 pageIndex.forEach((k) => {
  k.classList.remove("active");
 });
 $(".__body .__top .welcome").addClass("active");
 $(".__welcome-page").show();
});

for (let i = 0; i < pageIndex.length; i++) {
 let c = pageIndex[i];
 console.log(c);
 c.onclick = () => {
  if (c.style.display !== "none") {
   $(".__allPages").show();
   pageIndex.forEach((k) => {
    k.classList.remove("active");
   });
   c.classList.add("active");
   $(".__body .__top .welcome").removeClass("active");
   $(".__welcome-page").hide();
   document.querySelectorAll(".__allPages .page").forEach((d) => {
    d.style.display = "none";
   });
   document.querySelectorAll(".__allPages .page")[
    c.getAttribute("index")
   ].style.display = "block";
  }
 };
}

let isAllClose = true;
closeIndex.forEach((c) => {
 c.onclick = () => {
  c.parentNode.style.display = "none";
  document.querySelectorAll(".__allPages .page")[
   c.parentNode.getAttribute("index")
  ].style.display = "none";
 };
});

//// FLOATBOTTOM

const allButtonsOfFloatbottom = ["terminal", "console", "logs"];

allButtonsOfFloatbottom.map((b) => {
 let button = $(".__floatbottom ." + b + "Btn"),
  container = $(".__floatbottom .__" + b);

 button.on("click", () => {
  allButtonsOfFloatbottom.map((c) => {
   $(".__floatbottom ." + c + "Btn").removeClass("active");
   $(".__floatbottom .__" + c).hide();
  });
  button.addClass("active");
  container.show();
 });
});

$(".__terminal").terminal(
 {
  unpkg: function (what) {
   let a = setInterval(() => {
    this.echo("Unpackaging " + what + " .... Downloading : " + Math.random());
   }, 200);
   setTimeout(() => {
    this.echo(
     "The package : '" + what + "' Downloaded successfully, 1 audited. "
    );
    clearInterval(a);
   }, 5000);
  },
 },
 {
  greetings:
   "Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved.\nInstall the latest PowerShell for new features and improvements! https://aka.ms/PSWindows\nunpkg package-name@1.0.0",
 }
);

$(".__floatBottom").on("resize", () => {
 alert("hi");
});

//// FOOTER

$(".__footer .terminal").on("click", () => {
 $(".__floatbottom").show();
 allButtonsOfFloatbottom.map((c) => {
  $(".__floatbottom ." + c + "Btn").removeClass("active");
  $(".__floatbottom .__" + c).hide();
 });
 $(".__floatbottom .terminalBtn").addClass("active");
 $(".__floatbottom .__terminal").show();
});

$(".__footer .console").on("click", () => {
 $(".__floatbottom").show();
 allButtonsOfFloatbottom.map((c) => {
  $(".__floatbottom ." + c + "Btn").removeClass("active");
  $(".__floatbottom .__" + c).hide();
 });
 $(".__floatbottom .consoleBtn").addClass("active");
 $(".__floatbottom .__console").show();
});

$(".__body .__top .console").on("click", () => {
 $(".__floatbottom").show();
 allButtonsOfFloatbottom.map((c) => {
  $(".__floatbottom ." + c + "Btn").removeClass("active");
  $(".__floatbottom .__" + c).hide();
 });
 $(".__floatbottom .consoleBtn").addClass("active");
 $(".__floatbottom .__console").show();
});

$(".__body .__top .preview").on("click", () => {
 $(".__previewbar").show();
});
