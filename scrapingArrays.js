const puppeteer = require("puppeteer");

(async () => {
  //Lanza el navegador
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  //Va a la pagina del producto de Amazon
  const url =
    "https://www.amazon.es/s?k=sofas&__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1BVS36NNMS2F7&sprefix=sofas%2Caps%2C105&ref=nb_sb_noss_1";

  await page.goto(url, { waitUntil: "load", timeout: 0 });

  //Extraemos los datos
  const data = await page.evaluate(() => {
    const title = document.querySelectorAll(
      "h2.a-size-base-plus.a-spacing-none.a-color-base.a-text-normal > span"
    );
    //const price = document.querySelector();
    //const img = document.querySelector();

    return Array.from(title)
      .slice(0, 10)
      .map((el) => el.innerText.trim());
  });

  console.log(data);

  await browser.close();
})();
