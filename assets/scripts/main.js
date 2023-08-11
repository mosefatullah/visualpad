//// GLOBAL
const previewBox = $(".__previewbar .content");
const previewCode = $("#vspad-code-editor");
//
const allPages = document.querySelectorAll(".__allPages")[0];
let activePage = {};
let editorCurrent;
//
let files = [];
//
const tooltipTriggerList = document.querySelectorAll(
 '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
 (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
//
const notifyAlerts = document.querySelectorAll(".notifyAlert");
notifyAlerts.forEach((i) => {
 bootstrap.Toast.getOrCreateInstance(i).show();
});
//
let themes = [
 "twilight",
 "tomorrow",
 "tomorrow_night",
 "tomorrow_night_blue",
 "tomorrow_night_bright",
 "monokai",
 "dracula",
 "github",
 "github_dark",
 "chrome",
 "eclipse",
 "terminal",
 "clouds",
 "vibrant_ink",
 "ambiance",
];
let modes = [
 "html",
 "css",
 "javascript",
 "php",
 "python",
 "java",
 "c_cpp",
 "csharp",
 "ruby",
 "typescript",
 "json",
 "xml",
 "markdown",
 "mysql",
 "sass",
 "less",
 "scss",
 "text",
 "plain_text",
 "coffee",
 "lua",
 "powershell",
 "batchfile",
 "dockerfile",
 "ini",
 "perl",
 "pgsql",
 "r",
 "rust",
 "sql",
 "yaml",
 "handlebars",
];
let snippetsFirst = {
 html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
    <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum placeat, magni, iusto nesciunt fuga, recusandae perferendis repudiandae voluptates ratione vero quasi dolorum corporis accusantium rem in ab! Dolorem, et dolorum!</h2>
    <br>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sequi commodi illo illum expedita eaque possimus nostrum voluptatum doloribus voluptas? Molestias recusandae ex cumque rem laboriosam laudantium perferendis, quaerat corporis modi soluta veniam asperiores ab sapiente aperiam deserunt inventore facilis quisquam autem. Sint officia animi nam excepturi rerum nemo consequuntur dolores necessitatibus ad cupiditate odio doloremque recusandae perspiciatis voluptatum ea omnis, quas porro tenetur neque! Alias quae ex veritatis</p>
    </body>
    </html>`,
 css: `/* This is a single-line comment */

    body {
        margin: 0;
        background-color: white;
    }
    `,
 javascript: `let functionName = (a, b) => {
        console.log(a + b)
    }
    functionName(5, 6)
    `,
};
snippetsFirst.scss = snippetsFirst.css;
snippetsFirst.less = snippetsFirst.css;
snippetsFirst.sass = snippetsFirst.css;

////
////
////
////
////
////
////
////
//// CONFIG CODE EDITOR
let editorConfig = (elm, func, opt) => {
 let snippetVar, modeVar;

 modes.forEach((m) => {
  if (elm.parentNode.getAttribute("modes").toLowerCase().trim() == m) {
   snippetVar = snippetsFirst[m];
   modeVar = m;
  }
 });

 let editor = ace.edit(elm, {
  value: snippetVar,
 });

 //- THEME & LANGUAGE
 editor.session.setMode("ace/mode/" + modeVar);
 editor.setTheme("ace/theme/" + themes[2]);

 //- STYLES & OPTIONS
 editor.container.style.lineHeight = "1.5rem";
 editor.container.style.fontWeight = "400";
 editor.container.style.letterSpacing = "0rem";

 editor.setOptions({
  fontFamily: "monospace",
  fontSize: 16,
  showPrintMargin: false,
  enableSnippets: true,
  showLineNumbers: true,
  tabSize: 2,
  showGutter: true,
  wrap: true,
  scrollSpeed: 1.5,
 });

 //- TOOLS
 editor.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
 });

 editor.setReadOnly(false);
 editor.renderer.setScrollMargin(0, 200);

 //- SELECTION & PREVIEW
 let changingPreview = () => {
  let colrow = editor.selection.getCursor();
  previewBox.html(editor.getValue());
  $(".__footer .colrow-btn").html(
   "Ln " + (colrow.row + 1) + ", Col " + colrow.column
  );
 };

 let changingCursor = () => {
  let colrow = editor.selection.getCursor();
  previewBox.html(editor.getValue());
  $(".__footer .colrow-btn").html(
   "Ln " + (colrow.row + 1) + ", Col " + colrow.column
  );
 };

 changingPreview();
 changingCursor();

 if (func) func(editor, modeVar);
 if (opt) editor.setOptions(opt);

 editor.session.on("change", changingPreview);
 editor.session.selection.on("changeCursor", changingCursor);

 //- COMMANDS
 editor.commands.addCommands([
  {
   name: "Comment-out",
   bindKey: { win: "Ctrl-O", mac: "Command-O" },
   exec: function (editor) {
    editor.toggleCommentLines();
   },
  },
 ]);
};

////
////
////
////
////
////
////
////
//// SIDEBAR
let settingFlag = false;
let profileFlag = false;
const allButtonsOfSidebar = [
 ".explorer",
 ".search",
 ".source",
 ".project",
 ".extension",
];
const allSystemButtonsOfSidebar = [".menu", ".profile", ".setting"];
const searchInput = $(".search-section .__search-input");
const searchReplace = $(".search-section .__search-input-replace");
const searchBtn = $(".search-section .__search");
const searchReplaceBtn = $(".search-section .__replace");
const searchReplaceAllBtn = $(".search-section .__replace-all");
const searchPrevBtn = $(".search-section .__prev");
const searchNextBtn = $(".search-section .__next");
const searchClear = $(".search-section .__clear");

//- Setting Toggle
$(".__sidebar .setting").on("click", () => {
 $(".__setting-canvas").show();
 settingFlag = true;
});
$(".__sidebar .profile").on("click", () => {
 $(".__profile-canvas").show();
 profileFlag = true;
});

//- Sidebar Buttons
allButtonsOfSidebar.map((b) => {
 let button = $(".__sidebar " + b),
  container = $(".__sidepanel " + b + "-section");

 button.on("click", () => {
  if (button.hasClass("active")) {
   button.removeClass("active");
   container.parent().hide();
  } else {
   allButtonsOfSidebar.map((c) => {
    $(".__sidebar " + c).removeClass("active");
    $(".__sidepanel " + c + "-section").hide();
   });
   button.addClass("active");
   container.parent().show();
   container.show();
  }
 });
});

//- Search Action
var searchOptions = {
 wrap: true,
 caseSensitive: false,
 wholeWord: false,
 regExp: false,
};
var searchingOnPage = () => {
    if (editorCurrent) {
        let count = editorCurrent.findAll(searchInput.val(), {
         backwards: false,
         wrap: true,
         caseSensitive: false,
         wholeWord: false,
         regExp: false,
        });
        $(".search-section .input-group p").html(count + " results");
       }
       if (searchInput.val().length === 0) {
        searchNextBtn.attr("disabled", "disabled");
        searchPrevBtn.attr("disabled", "disabled");
       } else {
        searchNextBtn.removeAttr("disabled");
        searchPrevBtn.removeAttr("disabled");
       }
};
searchInput.on("input", searchingOnPage);
searchBtn.on("click", searchingOnPage);

searchPrevBtn.on("click", () => {
 if (editorCurrent) editorCurrent.findPrevious();
});
searchNextBtn.on("click", () => {
 if (editorCurrent) editorCurrent.findNext();
});

searchClear.on("click", () => {
 searchInput.val("");
 searchReplace.val("");
 $(".search-section .input-group p").html("0 results");
 if (editorCurrent) editorCurrent.find("");
 searchNextBtn.attr("disabled", "disabled");
 searchPrevBtn.attr("disabled", "disabled");
});

searchReplaceBtn.on("click", function () {
 if (editorCurrent) {
  editorCurrent.replace(searchReplace.val());
  searchOptions.needle = searchReplace.val();
 }
});

searchReplaceAllBtn.on("click", function () {
 if (editorCurrent) {
  var searchText = searchInput.val();
  var replaceText = searchReplace.val();
  searchOptions.needle = searchText;
  editorCurrent.replaceAll(replaceText, searchOptions);
  $(".search-section .input-group p").html("0 results");
 }
});

//- File Explorer
let fileExplorer = () => {};

////
////
////
////
////
////
////
////
//// BODY
const allPagesIndex = $(".__body .__top .__allPagesIndex");
let isAllClose = true;

//- Index Action
let funcOfOther = () => {
 const closeIndex = document.querySelectorAll(
  ".__body .__top .__allPagesIndex .index span"
 );
 const pageIndex = document.querySelectorAll(
  ".__body .__top .__allPagesIndex .index"
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
     if (d.getAttribute("index") === c.getAttribute("index")) {
      if (d.getAttribute("name") === c.querySelectorAll("p")[0].innerHTML) {
       d.style.display = "block";
       editorConfig(d.querySelector(".vspad-code-editor"), (editor) => {
        activePage.name = d.getAttribute("name");
        activePage.index = d.getAttribute("index");
        editorCurrent = editor;
       });
      }
     }
    });
   }
  };
 }
 //- Index Closing
 closeIndex.forEach((c) => {
  c.onclick = () => {
   c.parentNode.style.display = "none";
   document.querySelectorAll(".__allPages .page").forEach((d) => {
    if (d.getAttribute("index") === c.parentNode.getAttribute("index")) {
     if (
      d.getAttribute("name") === c.parentNode.querySelectorAll("p")[0].innerHTML
     ) {
      d.style.display = "none";
      activePage = {};
     }
    }
   });
  };
 });
};

allPages.querySelectorAll(".page").forEach((p) => {
 allPagesIndex.append(`<div class="index" index="${p.getAttribute("index")}">
            <p>${p.getAttribute("name")}</p>
            <span data-bs-toggle="tooltip" data-bs-title="Close">
                  <svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 -960 960 960" width="17">
                        <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                  </svg>
            </span>
        </div>
`);
 files.push({
  name: p.getAttribute("name"),
  index: p.getAttribute("index"),
  page: p.querySelector(".vspad-code-editor"),
 });
 funcOfOther();
});

////
////
////
////
////
////
////
////
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
////
////
////
////
////
////
////
////
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
