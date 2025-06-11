---
title: How to serve static sites in GitHub pages
tags: github-pages
date: 2025-05-05
---
# How to serve static sites in GitHub pages

_This is a repeat of my readme from the repo https://github.com/aewshopping/eleventy_githubpages_minimal (fyi if this link doesn't work it is probably because I have finally got around to changing my username)_

---

Objective is to make a minimal eleventy site and serve with github pages, as easily as possible!

## Option 1 - simplest possible build with `deploy from a branch`

My starting premise is that I am going to copy the output directory `_site` to the repo (noting that I need to rename the output directory to `docs`), rather than do what you should normally do which is .gitignore it.

For this option **you will need to run the build process remotely** to create the build directory and then push this all to the repo (the same branch).

Steps are:

1. Update eleventy config file to output to a `docs` directory.
2. Make sure your .gitignore file is **not** ignoring the docs directory - you want this directory to be stored in the repo main branch along with the other files.
3. Go to github repo `settings` / `pages` / `deploy from a branch` and select the main branch.
4. Select the `/docs` directory option, in the same bit of the settings page.
5. It is set up in this way because no other directory is available to be selected in the github pages settings, so you can't just use the default output directory for eleventy which is `_site` as this is not recognised in the `settings` / `pages` page - a bit odd but there you go!

_Any_ changes to the repo (eg even a change to the readme) will trigger github pages to update, even where there won't be any change to the site itself.

There is no way to change this default behaviour, whereas you _can_ change the build and deploy trigger to whatever you want under options 2 and 3.

## Option 2 - the 'recommended' `deploy from a branch` option

This is what is currently selected in the setup for this repo, albeit it contains the code for all three.

More info can be found here [https://www.11ty.dev/docs/deployment/#deploy-an-eleventy-project-to-git-hub-pages](https://www.11ty.dev/docs/deployment/#deploy-an-eleventy-project-to-git-hub-pages). This is a single github actions yaml file which uses the action [https://github.com/peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages).

By default it will run every time the repo changes, however I have configured to run on workflow_dispatch ie when you press a button.

The steps to get it working:

1. Update line 34 of the yaml workflow file to refer to your own repo name `- run: npx @11ty/eleventy --pathprefix=/eleventy_githubpages_minimal/ # the repo name here`.
2. I also needed to updated line 41 `publish_dir: ./docs` to refer to the right output directory that I had specified in my eleventy config.
3. Run the workflow, this will create a gh-pages branch, where it will output the site's html per eleventy's normal build process.
4. On the repo settings, select pages, then choose `deploy from a branch` and select the gh-pages branch.
5. This means that whenever the peaceiris action is run (or whatever you decided to call it) it will build to gh-pages branch and then git-hub pages' own deploy action will kick in, thus deploying the site for all to see.

I found this method to be a little ropey when setting it up, the final build and deploy site action didn't always seem to trigger or run properly. But everyone else uses this method so presumably it will almost always work fine.

## Option 3 - use a pure git-hub actions method

As for option 1 you need to make sure that the output directory `_site` folder (noting that I renamed it to `docs`) is stored alongside your source files in your repo, rather than do what you should normally do which is .gitignore it.

I then created two workflows:

1. an `eleventybuild.yaml` workflow which builds the site and saves the built site in the repo. Note that I am not doing any cache stuff here, whereas this is included in the (probably better) github actions yaml file under option 2. I don't why the cache is needed to be honest so that's why it is not included. 
2. a `docs_serve.yaml` which is triggered by completion of the above workflow and uses the boilerplate github actions workflow that you are presented with in `settings` if you go for the build with `GitHub actions` option and select the `static pages` workflow - you get a handy template yaml file. I updated the path to `'./docs'` to point it to where the static files created above are stored. 

This method seems to work pretty well but some people may find it odd or confusing to store the served html files in the same repo, branch / file structure as the source files.

## Path prefixing

No matter what method you choose for getting the site on github pages there will be an issue with fixed assets (like css files) not being referenced correctly.

This is because when building with eleventy you will typically stick some files (like css files) in a `public` folder and then in your `<head></head>` write something like: `<link rel="stylesheet" type="text/css" href="/public/style.css">`.

But because your github pages builds your site relative to the repo name - `https://<username>.github.io/<repo-name>/` - the browser will be looking for that css file under `https://<username>.github.io/public/`.

You could just change the href in the head (`href="/<repo-name>/public/style.css"`) but then it will only work on your github pages site not your dev server, nor if you serve it later elsewhere such as on Netlify.

The solution is to use the automatically bundled  eleventy plugin `HtmlBasePlugin`. Have a look at the [eleventy path prefix docs page](https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix) for more details.

Then do something like this in your `eleventy.config.js` file (note I am using ES Modules but most older eleventy sites pre v3 will be using Common JS):

```javascript
import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(HtmlBasePlugin);
};

export const config = {
	pathPrefix: "/<repo-name>/",
}
```
This means that

- absolute urls (paths starting with a `/`) within the html have `/<repo-name>` inserted in front of them.
- when serving the site on both a GitHub-pages _and_ **non**-github-pages environment, `/<repo-name>` is inserted to the website file system. For example `https://website.com/<repo-name>/index.html`.

I _guess_ that when deploying behind a real website name this repo-name filepath thing could go away and it would become simply `https://website.com/index.html` but I haven't looked into this.

N.b. You could also use the `<base>` html element in the html `<head>` but according to the eleventy docs this is a bit flakey. You could also argue that it is better to put this sort of thing in the eleventy config where it is more transparent, rather than hidden away as an templated `include` in the head.

## Caching

Not quite sure why but caching seems a bit slow or maybe even 'unbusted' when using github pages, for eg on updates to a css file. I think for a proper site I would deploy externally on Netlify until I had a better handle on this. 

---

_Note that under **option 2** and under **option 3** you can configure the github actions file to run on push to the main branch or some other trigger. I have it on workflow dispatch right now - ie you have to click a button to deploy._
