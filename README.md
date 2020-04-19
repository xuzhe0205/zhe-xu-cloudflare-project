# Zhe Xu submission for: Cloudflare Workers Internship Application: Full-Stack

## What is it?

Using Cloudflare Workers, you'll deploy an application that will randomly send users to one of two webpages. This project will teach you how to write applications with the Cloudflare Workers API, manage and develop them using the command-line tool Wrangler, and deploy them to the free workers.dev deployment playground.

## What Zhe did?

Besides the purpose of this internshipt project for Cloudflare, I also what to use this opportunity to advocate people trying to help WHO and American Red Cross fight COVID-19!

I finished all requirements and extra credit, with a few extra small changes:

- Changing the `<a>` tag buttons' color

- Choosing not to obviously display the `<title>` tag from each url from the api, but just displaying "a smaller representation" of each of the page from those urls, in an "A/B testing" style!

Finished the project based on resources from cloudflare website

## Instruction & Demo

### 1. Install the workers command-line tool wrangler.

The Workers Quick Start in the documentation shows how to get started with Wrangler, creating a project, and configuring and deploying it. We highly recommend that you spend time reading and following along with this guide!

To begin, install the [Wrangler](https://github.com/cloudflare/wrangler) command-line tool.

### 2. Use `wrangler dev` to locally test/develop Zhe's application

The recently launched [`wrangler dev`](https://github.com/cloudflare/wrangler#-dev) feature will allow you to begin developing your application using `localhost` - this means that you can test your project locally and make sure it works, without having to sort out deployment until later in the exercise.

Note that a major benefit of using `wrangler dev` is the ability to output `console.log` statements to your terminal - this is super useful for inspecting HTTP responses and variables!

### 3. Go to <b>`https://zhe-xu-cloudflare-project.zhespace.workers.dev/`</b> or locally `http://localhost:8787/` after running `wrangler dev`

(Network connection might affect the loading of these images, if so, you can try to take a look at the regarding images by going in to raw file of this README, and navigate through the related links)

#### First page: Functioning like a welcome/main page, which inform users which URL/API we are fetching data from

![FirstPage](https://raw.githubusercontent.com/xuzhe0205/zhe-xu-cloudflare-project/master/image/First_page.png)

#### By clicking `Go Fetch` in first page, we are now directed to the second page, where the the content from those urls from the API are now presented in a "A/B testing" style. It allows users to determine which `variant` they like. And since I made an "extra-credit" change there by making the theme "fighting COVID-19", the two urls( the content ) can actually allow users to go to designated pages to make donations

#### By clicking `Back` in the second page, users can "go back"/directed to the first page

![SecondPage](https://raw.githubusercontent.com/xuzhe0205/zhe-xu-cloudflare-project/master/image/Second_page.png)

#### After clicking `Variant 1`, users are navigated to WHO page and able to donate funds

![WHO Page](https://raw.githubusercontent.com/xuzhe0205/zhe-xu-cloudflare-project/master/image/WHO.png)

#### After clicking `Variant 2`, users are navigated to American Red Cross page and able to donate plasma

![American Red Cross page](https://raw.githubusercontent.com/xuzhe0205/zhe-xu-cloudflare-project/master/image/American_Red_Cross.png)

#### By clicking `back arrow` on the users' browsers, or simply enter address `https://zhe-xu-cloudflare-project.zhespace.workers.dev/` to return to the application page. Since I created and used `HTTP Cookies`, users are able to see the "A/B testing" style pages that associated to the URLs coming from the cloudflare API, in a persisting manner
