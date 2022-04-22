// Prismic
import * as prismic from "https://cdn.skypack.dev/@prismicio/client";
import * as prismicH from "https://cdn.skypack.dev/@prismicio/helpers";

const repoName = "ethel-trust";

const routes = [
  {
    type: "post",
    path: "/post/:uid",
  },
  {
    type: "page",
    path: "/:uid",
  },
];

const endpoint = prismic.getEndpoint(repoName);
const client = prismic.createClient(endpoint, { routes });

const doSearch = async (search) => {
  var main = document.getElementById("searchresults");
  main.innerText = "";
  const ret = await getSearch(search);

  var ul = document.createElement("ul");
  ul.class = "searchresults";

  ret.forEach((doc) => {
    var a = document.createElement("a");
    a.href = doc.url;
    a.innerText = prismicH.asText(doc.data.title);
    main.appendChild(a);
  });
};

const getSearch = async (search) => {
  if(search.length <2){
    return []
  }
  var pred = prismic.predicate.fulltext("document", search);
  const ret = await client.query(pred);
  return ret.results;
};

searchBox.onkeyup = function () {
  var q = this.value;
  console.log("Handler for keyup called. " + q);
  doSearch(q);
};
