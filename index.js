const html = (variantAPIs) => `
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
        <h1 class="">Explore Cloudflare APIs with Zhe! </h1>
        <div class="flex">
          <div class="alert alert-success" role="alert" style="font-size: 18px">
          <span class="badge badge-light">Your URL: &nbsp</span>
            https://cfw-takehome.developers.workers.dev/api/variants
          </div>
          <button class="btn btn-success" id="fetchBtn">Go Fetch</button>
        </div>
        <div class="mt-4" id="mylist"></div>
      </div>
    </div>
  </body>
  <script>
    window.variantAPIs = ${variantAPIs};
    var getData = function() {
      alert('/???');
      console.log(window.variantAPIs);
    };
    document.querySelector("#fetchBtn").addEventListener('click', getData)
  </script>
</html>
`;

const url = "https://cfw-takehome.developers.workers.dev/api/variants";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Fetch a request and follow redirects
 * @param {Request} request
 */
async function handleRequest(request, data = {}) {
  let headers = new Headers({
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });

  try {
    var myRequest = new Request(url, {
      method: "GET",
      headers: headers,
    });
    var resp = await fetch(myRequest);
    var jsondata = await resp.json();
    var variantAPIs = jsondata.variants;
    var body = html(JSON.stringify(variantAPIs));
    console.log(variantAPIs);
    return new Response(body, { headers: headers });
  } catch (e) {
    return new Response(`Something went wrong ${e}`, { status: 404 });
  }
}
