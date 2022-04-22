# UTC OLP Adopt-A-Pet Project 
## prismic, express, glitch & handlebars

This app is hosted on a [glitch](http://glitch.com/) server and uses shared data from a [prismic headless CMS](https://prismic.io/) repository (Content Management System) to bring to life the "Web Builder" lesson from the "Mozilla Web Literacy Core" course.


## Take a look around 

- in server.js we have the [express](https://expressjs.com) program that listens for requests from the end users browser and sends back HTML.
  - in renderIndex (on line 19) info about pets, posts & pages are fetched from [prismic](https://prismic.io/) and placed into the template.
- in views/index.hbs we have the [handlebars](https://handlebarsjs.com/) template that takes the prismic data and transforms it into HTML.
  - Send data to layout.hbs
  - Log the page data so you can see it below
  - {{ }} data as typed (< changed to &lt; etc.)
  - {{{ }}} data but not escaped to entities
  - Getting data is a bit more complex post.data.title
  - Prismic data can be complex if you get   [object Object] then try asText or  asHTML
- in views/layout.hbs we have the template for the common parts of the all the pages that the index etc. fit into

## New Features

* Home Page Text
* Blog post list
* Visit Us – Page
* Shared elements in layout.hbs html, body, head, header, footer etc.
* Importing extra code to keep each file simple
* Data from prismic.io
* Error Pages

## Tasks - Pet Adoption

- Make this the front page of your Pet Adoption website which lists all your pets
- Add a logo image to the site <img src="copy the url from assets or the web">
- Add a new field for pet colour to the pet template

The [handlebars guide](https://handlebarsjs.com/guide/) might be useful


## Tasks - Project Kickoff

### in "config/prismicConfig.js"
- on line 7 `const repoName = "utc-olp-pets"; // Fill in your repository name.`

### Delete any code that refers to pets

#### server.js

`import { petroutes } from './routes/pet.js'; //load the code for the /pet/ section of the site`

`const pets = await client.getAllByType("pet");`  

`res.render("index", { page, posts, pets }); ` becomes `res.render("index", { page, posts });`

`app.use('/pet', petroutes);`

#### config/prismicConfig.js

```json
  {
    type: 'pet',
    path: '/pet/:uid',
  }, 
```

#### views/index.hbs

```html
{{! log 'pets' pets}}
<section class="pet_list">
  <h2>Our Pets</h2>
  {{#each pets as | pet |}}
  <article>
    <h3>Meet {{asText pet.data.name}}</h3>
    <figure>
      <img src="{{pet.data.image.url}}" width="200px" />
      <figcaption>
        <a href="/pet/{{pet.uid}}">More Details</a>
      </figcaption>
    </figure>
  </article>
  {{/each}}
</section>
```

#### Others

You can delete these files but I'd keep them for examples.

- views/pet.hbs
- routes/pet.js


The [handlebars guide](https://handlebarsjs.com/guide/) might be useful


## Now think what you want it to look like

Work through DESIGN.md

Huzzah!