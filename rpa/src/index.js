const puppeteer = require("puppeteer");

async function execute() {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ['--disable-extensions'],
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: [
      '--allow-external-pages',
      '--allow-third-party-modules',
      '--data-reduction-proxy-http-proxies',
      '--no-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.goto(`https://www.al.sp.gov.br/deputado/contas/?idTipo=${13}&matricula=${300605}&tipo=fornecedores`, {
    waitUntil: 'networkidle2',
  });

  const data = await page.evaluate(() => {
    const result = [];

    const table = document.querySelectorAll("#porFornecedores > table > tbody > tr");

    table.forEach((item) => {
      const tds = item.querySelectorAll('td');
      if (tds) {
        const obj = {
          fornecedor: tds[0].innerText,
          cpfCnpj: tds[1].innerText,
          valor: Number(tds[2].innerText.replace('R$ ', '').replace('.', '').replace(',', '.')),
        }
        result.push(obj);
      }
    })
    // console.log(result);
    return result;
  });

  // data.forEach((obj) => {
  //   obj.matricula = matricula;
  // })

  // allResults.push(data);

  // await browser.close();
}

execute();