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

//// BODY
const closeIndex = document.querySelectorAll(
 ".__body .__top .index:not(.right) span"
);
const pageIndex = document.querySelectorAll(
 ".__body .__top .index:not(.right)"
);

const previewBox = $(".__previewbar .content");
const previewCode = $("#vspad-code-editor");

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

// CONFIG CODE EDITOR
let editor = ace.edit("vspad-code-editor", {
 value: `
 <!DOCTYPE html>
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
});

// THEME & LANGUAGE
editor.session.setMode("ace/mode/html");
editor.setTheme("ace/theme/" + themes[8]);

// STYLES & OPTIONS
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

// TOOLS
editor.setOptions({
 enableBasicAutocompletion: true,
 enableLiveAutocompletion: true,
});

editor.setReadOnly(false);

// SELECTION & PREVIEW

let changingPreview = () => {
 let colrow = editor.selection.getCursor();
 previewBox.html(editor.getValue());
 $(".__footer .colrow-btn").html("Ln " + colrow.row + ", Col " + colrow.column);
};
let changingCursor = () => {
 let colrow = editor.selection.getCursor();
 previewBox.html(editor.getValue());
 $(".__footer .colrow-btn").html("Ln " + colrow.row + ", Col " + colrow.column);
};
changingPreview();
changingCursor();

editor.session.on("change", changingPreview);
editor.session.selection.on("changeCursor", changingCursor);

// COMMANDS
editor.commands.addCommands([
 {
  name: "Comment-out",
  bindKey: { win: "Ctrl-O", mac: "Command-O" },
  exec: function (editor) {
   editor.toggleCommentLines();
  },
 },
]);

// FIND

editor.find("lorem", {
 backwards: false,
 wrap: false,
 caseSensitive: false,
 wholeWord: false,
 regExp: false,
});
// editor.findNext();
// editor.findPrevious();

editor.completers = [
 {
  getCompletions: function (editor, session, pos, prefix, callback) {
   var completions = [
    {
     caption: "my caption",
     snippet: "content: '$1'",
     meta: "snippet",
     type: "snippet",
    },
    {
     caption: "my value",
     value: "value",
     meta: "custom",
     type: "value",
    },
   ];
   callback(null, completions);
  },
  getDocTooltip: function (item) {
   if (!item.docHTML) {
    item.docHTML = ["<b>", item.caption, "</b>"].join("");
   }
  },
 },
];

/* 
/////////////////////////
let events = [
    'blur',
    'input',
    'change',
    'changeSelectionStyle',
    'changeSession',
    'copy',
    'focus',
    'paste',
    'mousemove',
    'mouseup',
    'mousewheel',
    'click'
]

var output = document.getElementById('output');
function showEvent(str) {
    while (output.childNodes.length > 50) {
        output.removeChild(output.firstChild);
    }
    output.appendChild(document.createTextNode(str));
    output.appendChild(document.createElement('br'));
    output.scrollTop = output.scrollHeight;
}

for (let event of events) {
    editor.on(event, () => {
        showEvent("Editor event: " + event);
    })
}

 */

/* var command = {
    name: "My command",
    //key or key combination, you could use {mac:"key-combination", win:"key-combination"}
    //to provide different key combination for mac and win
    bindKey: "Ctrl-Shift-A",
    exec: (ace) => {
        var cursor = ace.getCursorPositionScreen();
        alert(`My command run at ${cursor.row + 1}: ${cursor.column}`);
    }
};
editor.commands.addCommand(command); */

/* Keyboard Shortcuts
showSettingsMenu : Ctrl-,
goToNextError : Alt-E
goToPreviousError : Alt-Shift-E
selectall : Ctrl-A
gotoline : Ctrl-L
fold : Alt-L|Ctrl-F1
unfold : Alt-Shift-L|Ctrl-Shift-F1
toggleFoldWidget : F2
toggleParentFoldWidget : Alt-F2
foldOther : Alt-0
unfoldall : Alt-Shift-0
findnext : Ctrl-K
findprevious : Ctrl-Shift-K
selectOrFindNext : Alt-K
selectOrFindPrevious : Alt-Shift-K
find : Ctrl-F
overwrite : Insert
selecttostart : Ctrl-Shift-Home
gotostart : Ctrl-Home
selectup : Shift-Up
golineup : Up
selecttoend : Ctrl-Shift-End
gotoend : Ctrl-End
selectdown : Shift-Down
golinedown : Down
selectwordleft : Ctrl-Shift-Left
gotowordleft : Ctrl-Left
selecttolinestart : Alt-Shift-Left
gotolinestart : Alt-Left|Home
selectleft : Shift-Left
gotoleft : Left
selectwordright : Ctrl-Shift-Right
gotowordright : Ctrl-Right
selecttolineend : Alt-Shift-Right
gotolineend : Alt-Right|End
selectright : Shift-Right
gotoright : Right
selectpagedown : Shift-Pagedown
gotopagedown : Pagedown
selectpageup : Shift-Pageup
gotopageup : Pageup
scrollup : Ctrl-Up
scrolldown : Ctrl-Down
selectlinestart : Shift-Home
selectlineend : Shift-End
togglerecording : Ctrl-Alt-E
replaymacro : Ctrl-Shift-E
jumptomatching : Ctrl-\|Ctrl-P
selecttomatching : Ctrl-Shift-\|Ctrl-Shift-P
expandToMatching : Ctrl-Shift-M
removeline : Ctrl-D
duplicateSelection : Ctrl-Shift-D
sortlines : Ctrl-Alt-S
togglecomment : Ctrl-/
toggleBlockComment : Ctrl-Shift-/
modifyNumberUp : Ctrl-Shift-Up
modifyNumberDown : Ctrl-Shift-Down
replace : Ctrl-H
undo : Ctrl-Z
redo : Ctrl-Shift-Z|Ctrl-Y
copylinesup : Alt-Shift-Up
movelinesup : Alt-Up
copylinesdown : Alt-Shift-Down
movelinesdown : Alt-Down
del : Delete
backspace : Shift-Backspace|Backspace
cut_or_delete : Shift-Delete
removetolinestart : Alt-Backspace
removetolineend : Alt-Delete
removetolinestarthard : Ctrl-Shift-Backspace
removetolineendhard : Ctrl-Shift-Delete
removewordleft : Ctrl-Backspace
removewordright : Ctrl-Delete
outdent : Shift-Tab
indent : Tab
blockoutdent : Ctrl-[
blockindent : Ctrl-]
transposeletters : Alt-Shift-X
touppercase : Ctrl-U
tolowercase : Ctrl-Shift-U
expandtoline : Ctrl-Shift-L
openlink : Ctrl-F3
openCommandPallete : F1
addCursorAbove : Ctrl-Alt-Up
addCursorBelow : Ctrl-Alt-Down
addCursorAboveSkipCurrent : Ctrl-Alt-Shift-Up
addCursorBelowSkipCurrent : Ctrl-Alt-Shift-Down
selectMoreBefore : Ctrl-Alt-Left
selectMoreAfter : Ctrl-Alt-Right
selectNextBefore : Ctrl-Alt-Shift-Left
selectNextAfter : Ctrl-Alt-Shift-Right
toggleSplitSelectionIntoLines : Ctrl-Alt-L
alignCursors : Ctrl-Alt-A
findAll : Ctrl-Alt-K
showKeyboardShortcuts : Ctrl-Alt-H */

/*
var buildDom = require("ace/lib/dom").buildDom;
var editor = ace.edit();
editor.setOptions({
    theme: "ace/theme/tomorrow_night_eighties",
    mode: "ace/mode/markdown",
    maxLines: 30,
    minLines: 30,
    autoScrollEditorIntoView: true
});
var refs = {};

function updateToolbar() {
    refs.saveButton.disabled = editor.session.getUndoManager().isClean();
    refs.undoButton.disabled = !editor.session.getUndoManager().hasUndo();
    refs.redoButton.disabled = !editor.session.getUndoManager().hasRedo();
}

editor.on("input", updateToolbar);
editor.session.setValue(localStorage.savedValue || "Welcome to ace Toolbar demo!");

function save() {
    localStorage.savedValue = editor.getValue();
    editor.session.getUndoManager().markClean();
    updateToolbar();
}

editor.commands.addCommand({
    name: "save",
    exec: save,
    bindKey: {
        win: "ctrl-s",
        mac: "cmd-s"
    }
});

buildDom([
    "div", {class: "toolbar"}, [
        "button", {
            ref: "saveButton",
            onclick: save
        }, "save"
    ], [
        "button", {
            ref: "undoButton",
            onclick: function () {
                editor.undo();
            }
        }, "undo"
    ], [
        "button", {
            ref: "redoButton",
            onclick: function () {
                editor.redo();
            }
        }, "redo"
    ], [
        "button", {
            style: "font-weight: bold",
            onclick: function () {
                editor.insertSnippet("**${1:$SELECTION}**");
                editor.renderer.scrollCursorIntoView();
            }
        }, "bold"
    ], [
        "button", {
            style: "font-style: italic",
            onclick: function () {
                editor.insertSnippet("*${1:$SELECTION}*");
                editor.renderer.scrollCursorIntoView();
            }
        }, "Italic"
    ]
], document.body, refs);
document.body.appendChild(editor.container);

window.editor = editor;
<!-- load ace language tools -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.17.0/ext-language_tools.min.js"></script>
*/

/*
//samples/settings menu

var editor = ace.edit("editor");
ace.require('ace/ext/settings_menu').init(editor);
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/html");
editor.commands.addCommands([
    {
        name: "showSettingsMenu",
        bindKey: {
            win: "Ctrl-q",
            mac: "Ctrl-q"
        },
        exec: function (editor) {
            editor.showSettingsMenu();
        },
        readOnly: true
    }
]);
editor.showSettingsMenu();

//Try to use `Ctrl+Q` for menu to appear
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.17.0/ext-settings_menu.min.js"></script>
*/

/*
//samples/custom completions

var editor = ace.edit("vspad-code-editor");
editor.session.setMode("ace/mode/html");
editor.setTheme("ace/theme/tomorrow");

// enable autocompletion and snippets
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});
editor.completers = [{
    getCompletions: function(editor, session, pos, prefix, callback) {
        var completions = [
            {
                caption: "my caption",
                snippet: "content: '$1'",
                meta: "snippet",
                type: "snippet"
            }, {
                caption: "my value",
                value: "value",
                meta: "custom",
                type: "value"
            }
        ];
        callback(null, completions);
    },
    getDocTooltip: function(item) {
        if (!item.docHTML) {
            item.docHTML = [
                "<b>", item.caption, "</b>",
            ].join("");
        }
    }
}];

//Try to write something in Result tab->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.17.0/ext-language_tools.min.js"></script>
*/

/*
//samples/autocompletion

// trigger extension
ace.require("ace/ext/language_tools");
var editor = ace.edit("vspad-code-editor");
editor.session.setMode("ace/mode/html");
editor.setTheme("ace/theme/tomorrow");
// enable autocompletion and snippets
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});

//Try to write something in Result tab->
<!-- load ace language tools -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.17.0/ext-language_tools.min.js"></script>
*/

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
