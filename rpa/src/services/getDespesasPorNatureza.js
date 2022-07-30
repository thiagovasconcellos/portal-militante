const puppeteer = require("puppeteer");
const { Sequelize } = require("sequelize");
const config = require('../config');
const { Deputado } = require('../database/models/Deputado');
const { DespesaPorNatureza } = require('../database/models/DespesaPorNatureza');

async function execute() {

  const sequelize = new Sequelize(config.database)

  await sequelize.authenticate();
  console.log('Connected to sqlite')

  await DespesaPorNatureza.sync();
  console.log('Model synchronized');

  const deputados = await Deputado.findAll({
    raw: true
  });

  const matriculas = deputados.map(deputado => deputado.matricula);

  const unique = [...new Set(matriculas)];

  const allResults = [];

  try {
    for (const matricula of unique) {

      const browser = await puppeteer.launch({
        headless: true,
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
      await page.goto(`https://www.al.sp.gov.br/deputado/contas/?matricula=${matricula}&mes=&ano=&cnpjOuCpf=&tipo=naturezas`, {
        waitUntil: 'networkidle2',
      });
  
      const data = await page.evaluate(() => {
        const result = [];
  
        const table = document.querySelectorAll("#porNaturezas > table > tbody > tr");

        console.log(table);
  
        table.forEach((item) => {
          const tds = item.querySelectorAll('td');
          const obj = {
            naturezaDespesas: tds[0].innerText,
            valor: Number(tds[1].innerText.replace('R$ ', '').replace('.', '').replace(',', '.')),
          }
          result.push(obj);
        })
        console.log(result);
        return result;
      });

      data.forEach((obj) => {
        obj.matricula = matricula;
      })

      allResults.push(data);
  
      await browser.close();
    }

    for await (const entry of allResults) {
      for await (const item of entry) {
        const created = await DespesaPorNatureza.create(item);
        console.log(`created! ${created}`)
      }
    }
    
  } catch (error) {
    console.log(error);
  }

  await sequelize.close();
}

execute();