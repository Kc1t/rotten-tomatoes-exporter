import fs from "fs";
import playwright from "playwright";

(async () => {
  const browser = await playwright.chromium.launch({
    // Defina o navegador desejado aqui
    channel: "msedge",
    headless: false,
  });

  const page = await browser.newPage();

  page.on("response", async (response) => {
    if (response.url().includes("/movie")) {
      console.log(`Resposta recebida: ${response.url()}`);
      const contentType = response.headers()["content-type"] || "";

      if (contentType.includes("application/json")) {
        try {
          const json = await response.json();
          console.log("Dados JSON recebidos:", json);

          const ratings = json.ratings || [];
          console.log("Ratings extraídos:", ratings);

          const filePath = "./ratings.json";

          let existingRatings = [];
          if (fs.existsSync(filePath)) {
            existingRatings = JSON.parse(fs.readFileSync(filePath, "utf8"));
          }

          existingRatings.push(...ratings);

          fs.writeFileSync(filePath, JSON.stringify(existingRatings, null, 2), "utf8");
          console.log(`Ratings salvos em: ${filePath}`);
        } catch (error) {
          console.error("Erro ao processar JSON:", error.message);
        }
      } else {
        console.log("Resposta ignorada (não é JSON).");
      }
    }
  });

  // Insira o link do seu perfil no Rotten Tomatoes
  await page.goto(
    "https://www.rottentomatoes.com/profiles/ratings/gyOuOeUyAcWysx4iGvS09cmOIDDCedSxlcx1IpXiMMCGPi09S6Mfd1IwwC8zFQqSW8HLnfllCGXtZnHeJFR0TJdi1PUOZHAKub8SresndsBa/movie"
  );
  // await page.goto(process.env.PROFILE_URL);

  const nextButtonSelector = 'rt-button.next[data-paginationmanager="btnNext:click"]';

  while (true) {
    try {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);

      const nextButton = await page.$(nextButtonSelector);
      if (nextButton) {
        await nextButton.click();
        console.log("Próxima página carregada.");
        await page.waitForTimeout(2000);
      } else {
        console.log("Fim da paginação.");
        break;
      }
    } catch (error) {
      console.error("Erro durante a execução:", error);
      console.log("Finalizando scraper.");
      break;
    }
  }

  await browser.close();
})();
