const html = (resDict) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Cloudflare internship project</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

  </head>
  <body class="jumbotron" style="background-color:#FFF5EE">
    <div class="container">
      <div class="display-3">
        <h2 class="">Explore Cloudflare APIs with Zhe! </h2>
        <hr>
        <br>
        <div class="flex" id="urlsDiv" style="display: block; font-size: 18px">
          <div class="alert alert-success" role="alert" >
          <span class="badge badge-light">Your URL: &nbsp</span>
            https://cfw-takehome.developers.workers.dev/api/variants
          </div>
          <button class="btn btn-success" id="fetchBtn"><b>Go Fetch</b></button>
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
    console.log(document.cookie);
    if (document.cookie.split(';').some((item) => item.includes('status=do-ab-testing'))) {
        getData();
    }
    function getData() {
      document.cookie = "status=do-ab-testing";
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
          setTimeout(function(){document.querySelector("#variantRow").appendChild(ele);},200);
          
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

/**
 * Declare global variables
 * api: defined cloudflare api
 * urlHTMLs: array that stores html codes from 2 urls coming from the cloudflare api
 * styleLinks: array that stores styling links from the html codes coming from 2 urls from the cloudflare api
 * resDict: javascript dictionary that maps urlHTMLs and styleLinks
 * counter: counter that counts which url from the cloudflare api the HTMLRewriter is parsing during iteration
 */
const api = "https://cfw-takehome.developers.workers.dev/api/variants";
var urlHTMLs;
var styleLinks;
var resDict;
var counter;

/**
 * Initializing previously declared variables: urlHTMLs, styleLinks, resDict, counter
 * @param {}
 */
async function initParams() {
  urlHTMLs = [];
  styleLinks = [];
  resDict = {};
  counter = 0;
}

/**
 * EventListener with "fetch" keyword that exucutes the handleRequest() function
 *
 */
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Fetch a request and follow redirects
 * Firstly invokes the initParams() to initialize global variables
 * Then uses cloudflare runtime apis such as Fetch and HTMLRewriter to fetch json data from provided api, and parse response
 * and html code in each url from the fetched api
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
          element.tagName != "title" &&
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
          element.removeAndKeepContent();
        } else {
          return;
        }
      },
    };

    let contentHandler = {
      element: (element) => {
        try {
          if (element.tagName === "title") {
            element.setInnerContent("Small page of variant " + counter);
          } else if (element.tagName === "h1") {
            if (counter == 1) {
              element.setInnerContent(
                "Variant " + counter + ": COVID19 Fund Donation"
              );
            } else {
              element.setInnerContent(
                "Variant " + counter + ": COVID19 Plasma Donation"
              );
            }
          } else if (element.tagName === "p") {
            element.setAttribute("style", "white-space: pre-line");
            if (counter == 1) {
              element.setInnerContent(
                "This is variant " +
                  counter +
                  "!" +
                  " \n " +
                  "If you like me, donate fund to help WHO fight COVID-19 "
              );
            } else {
              element.setInnerContent(
                "This is variant " +
                  counter +
                  "!" +
                  " \n " +
                  "If you like me, donate plasma to help American Red Cross recover COVID-19 patients "
              );
            }
          } else if (element.tagName === "a") {
            if (counter == 1) {
              element.setAttribute("href", "https://covid19responsefund.org/");
              element.setAttribute(
                "class",
                "inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-yellow-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-yellow-400 focus:outline-none focus:border-yellow-600 focus:shadow-outline-yellow transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              );
              element.setInnerContent("Donate fund to WHO");
            } else {
              element.setAttribute(
                "href",
                "https://www.redcrossblood.org/donate-blood/dlp/plasma-donations-from-recovered-covid-19-patients.html"
              );
              element.setAttribute(
                "class",
                "inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              );
              element.setInnerContent("Donate plasma to American Red Cross");
            }
          }
        } catch (error) {
          console.log("content change error: ", error);
        }
      },
    };

    let rewriter = new HTMLRewriter()
      .on("link", linkHandler)
      .on("*", bodyHandler)
      .on("*", contentHandler);

    for (let i = 0; i < variantURLs.length; i++) {
      try {
        counter = counter + 1;
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
    var body = html(JSON.stringify(resDict));
    return new Response(body, { headers: headers });
  } catch (e) {
    return new Response(`Something went wrong ${e}`, { status: 404 });
  }
}
