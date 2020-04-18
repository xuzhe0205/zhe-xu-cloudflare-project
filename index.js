const html = (resDict) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Cloudflare internship project</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

  </head>
  <body class="jumbotron">
    <div class="container">
      <div class="display-3">
        <h2 class="">Explore Cloudflare APIs with Zhe! </h2>
        <hr>
        <br>
        <div class="flex" id="urlsDiv" style="display: block">
          <div class="alert alert-success" role="alert" style="font-size: 18px">
          <span class="badge badge-light">Your URL: &nbsp</span>
            https://cfw-takehome.developers.workers.dev/api/variants
          </div>
          <button class="btn btn-success" id="fetchBtn">Go Fetch</button>
        </div>
        <div class="container" id="variantsDiv" style="display: none">
          <div style="margin-bottom: 3%">
            <button type="button" class="btn btn-secondary" id="backBtn">Back</button>
            
          </div>
          <div class="container">
            <div class="row" id="variantRow">
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  <script>
    window.resDict = ${resDict};
    console.log(window.resDict);
    var getData = function() {
      console.log(window.resDict);
      document.querySelector("#variantsDiv").style.display = "block";
      document.querySelector("#urlsDiv").style.display = "none";
      if (document.querySelector("#variantRow").childNodes.length <= 1) {
        window.resDict["urlHTMLs"].forEach((variant, index)=>{
          var linkEle = document.createElement("link");
          linkEle.href = resDict["styleLinks"][index];
          linkEle.rel = "stylesheet"
          document.getElementsByTagName("head")[0].appendChild(linkEle);
          var ele = document.createElement("div")
          ele.className = "col"
          ele.innerHTML=variant;
          ele.style.fontSize = "18px";
          setTimeout(function(){document.querySelector("#variantRow").appendChild(ele);},50);
          
        });
      }
      
      
    };
    var backAction = function() {
      document.querySelector("#variantsDiv").style.display = "none";
      document.querySelector("#urlsDiv").style.display = "block";
    }
    document.querySelector("#fetchBtn").addEventListener('click', getData);
    document.querySelector("#backBtn").addEventListener('click', backAction);
  </script>
</html>
`;

// class AttributeRewriter {
//   constructor(attributeName) {
//     this.attributeName = attributeName;
//   }

//   element(element) {
//     const attribute = element.getAttribute(this.attributeName);
//     if (attribute) {
//       console.log("yes?");
//       varientResult.push(element.textContent);
//       console.log(element.textContent);
//       // element.setAttribute(
//       //   this.attributeName,
//       //   attribute.replace("myolddomain.com", "mynewdomain.com")
//       // );
//     }
//   }
// }

const api = "https://cfw-takehome.developers.workers.dev/api/variants";
var urlHTMLs = [];
var styleLinks = [];
var resDict = {};
async function initParams() {
  urlHTMLs = [];
  styleLinks = [];
  resDict = {};
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Fetch a request and follow redirects
 * @param {Request} request
 */
async function handleRequest(request, data = {}) {
  initParams();
  let headers = new Headers({
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });

  try {
    var myRequest = new Request(api, {
      method: "GET",
      headers: headers,
    });
    let resp = await fetch(myRequest);

    let jsondata = await resp.json();
    let variantURLs = jsondata.variants;

    let linkHandler = {
      element: (element) => {
        if (element.tagName === "link") {
          styleLinks.push(element.getAttribute("href"));
          // const tag = elementToMetaTag(element);
          // if (!!Object.keys(tag).length) matches.push(tag);
        }
      },
    };

    let bodyHandler = {
      element: (element) => {
        if (
          element.getAttribute("class") !=
            "bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6" &&
          element.getAttribute("class") !=
            "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100" &&
          element.getAttribute("class") != "h-6 w-6 text-green-600" &&
          element.tagName != "path" &&
          element.getAttribute("class") != "mt-3 text-center sm:mt-5" &&
          element.getAttribute("class") != "mt-2" &&
          element.getAttribute("class") != "text-sm leading-5 text-gray-500" &&
          element.getAttribute("class") != "mt-5 sm:mt-6" &&
          element.getAttribute("class") != "flex w-full rounded-md shadow-sm" &&
          element.getAttribute("class") !=
            "inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5" &&
          element.getAttribute("class") !=
            "inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        ) {
          if (element.tagName == "title") {
            element.remove();
          } else {
            element.removeAndKeepContent();
          }
          // const tag = elementToMetaTag(element);
          // if (!!Object.keys(tag).length) matches.push(tag);
        } else {
          return;
        }
      },
    };

    let rewriter = new HTMLRewriter()
      .on("link", linkHandler)
      .on("*", bodyHandler);

    for (let i = 0; i < variantURLs.length; i++) {
      try {
        let response = await fetch(variantURLs[i]);
        response = await rewriter.transform(response);
        let urlHTML = await response.text();
        urlHTMLs.push(urlHTML);
      } catch (e) {
        console.log(e.message);
      }
    }
    resDict["styleLinks"] = styleLinks;
    resDict["urlHTMLs"] = urlHTMLs;
    console.log(resDict);
    var body = html(JSON.stringify(resDict));
    return new Response(body, { headers: headers });
  } catch (e) {
    return new Response(`Something went wrong ${e}`, { status: 404 });
  }
}
