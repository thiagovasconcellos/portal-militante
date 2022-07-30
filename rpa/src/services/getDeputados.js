const puppeteer = require("puppeteer");
const { Sequelize } = require("sequelize");
const config = require('../config');
const { Deputado } = require('../database/models/Deputado');

const periodos = {
  14: '1999-2003',
  15: '2003-2007',
  16: '2007-2011',
  17: '2011-2015',
  18: '2015-2019',
  19: '2019-2022'
}

async function execute() {

  const sequelize = new Sequelize(config.database)

  await sequelize.authenticate();
  console.log('Connected to sqlite')

  await Deputado.sync();
  console.log('Model synchronized');

  const allResults = [];
  const legFinal = 19;
  try {
    for (let legislatura = 14; legislatura <= legFinal; legislatura++) {

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
      await page.goto(`https://www.al.sp.gov.br/deputado/lista/?filtroNome=&filtroAreaAtuacao=&filtroBaseEleitoral=&filtroPartido=&filtroLegislatura=${legislatura}&filtroEmExercicioPesquisa=N&filtroLegislaturaAtual=S&__ncforminfo=Bg-2sz1ALg9OM7vWXtN23Dl8DLPPPz-AQNnAs4oVDuEJJVKLxoA1oHf6knU-7hHqi15PRmYXdpBuRnSnq6Z7sWdfaoQCbVV3DnvWbFomNvg7DfiBLfwQfbxKuPOJXUv7eQKXplLxbLk=`, {
        waitUntil: 'networkidle2',
      });
  
      const data = await page.evaluate(() => {
        const result = [];
  
        const table = document.querySelectorAll(".tabela > tbody > tr");
  
        table.forEach((item) => {
          const tds = item.querySelectorAll('td');
          const obj = {
            matricula: tds[0].children[0].getAttribute('href').split('matricula=')[1] || '',
            deputado: tds[0].innerText,
            partido: tds[3] ? tds[3].innerText ? tds[3].innerText : '' : ''
          }
          result.push(obj);
        })
        return result;
      });

      data.forEach((obj) => {
        obj.legislatura = legislatura;
        obj.periodo = periodos[legislatura]
      })
  
      allResults.push(data);
  
      await browser.close();
    }

    for await (const entry of allResults) {
      for await (const item of entry) {
        const created = await Deputado.create(item);
        console.log(`created! ${created}`)
      }
    }
    
  } catch (error) {
    console.log(error);
  }

  await sequelize.close();
}

execute();