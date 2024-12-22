$(document).ready(function () {
  $("button[data-file]").click(function () {
    var file = $(this).data("file");
    var cssFile = $(this).data("css");

    localStorage.setItem("lastLoadedFile", file);
    localStorage.setItem("lastLoadedCSS", cssFile);
    location.reload();
  });

  function loadCSS(href) {
    let link = document.querySelector(`link[href="${href}"]`);
    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }

  var lastLoadedFile = localStorage.getItem("lastLoadedFile");
  var lastLoadedCSS = localStorage.getItem("lastLoadedCSS");
  if (lastLoadedFile) {
    loadContent(lastLoadedFile);
    if (lastLoadedCSS) {
      loadCSS(lastLoadedCSS);
    }
  } else {
    loadCSS("style.css");
  }

  function loadContent(file) {
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("main-content").innerHTML = data;
        executeScripts(document.getElementById("main-content"));
        showCodeButton(file, data);
      })
      .catch((error) => {
        console.error(error);
        document.getElementById(
          "main-content"
        ).innerHTML = `<p>Błąd podczas ładowania: ${file}</p>`;
      });
  }

  function showCodeButton(file, data) {
    const showCodeButton = document.getElementById("show-code-button");
    const codeContent = document.getElementById("code-content");
    showCodeButton.style.display = "block";
    showCodeButton.onclick = function () {
      if (codeContent.style.display === "block") {
        codeContent.style.display = "none";
      } else {
        codeContent.textContent = data;
        codeContent.style.display = "block";
        Prism.highlightElement(codeContent);
      }
    };
  }

  function executeScripts(container) {
    const scripts = container.querySelectorAll("script");

    scripts.forEach((script) => {
      const newScript = document.createElement("script");
      newScript.textContent = script.textContent;
      document.head.appendChild(newScript).parentNode.removeChild(newScript);
    });
  }
});
