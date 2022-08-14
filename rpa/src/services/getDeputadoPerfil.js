const puppeteer = require("puppeteer");
const { Sequelize } = require("sequelize");
const config = require('../config');
const { Deputado } = require('../database/models/Deputado');
const { DeputadoPerfil } = require('../database/models/DeputadoPerfil');

async function execute() {

  const sequelize = new Sequelize(config.database)

  await sequelize.authenticate();
  console.log('Connected to sqlite')

  await DeputadoPerfil.sync();
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
      await page.goto(`https://www.al.sp.gov.br/deputado/?matricula=${matricula}`, {
        waitUntil: 'networkidle2',
      });
  
      const data = await page.evaluate(() => {
        const result = [];
  
        const avatarSelector = document.querySelectorAll("#conteudo > div.rw > div > div.row > div.col-md-3 > a > img");
        const emailSelector = document.querySelectorAll("#infoGeral > div:nth-child(2) > div.form-group.col-md-4 > textarea");
        const telefoneSelector = document.querySelectorAll("#infoGeral > div:nth-child(3) > div.form-group.col-md-4 > input");
        const biografiaSelector = document.querySelectorAll("#conteudo > div.rw > div > div.col-md-12");

        const avatar = avatarSelector[0] ? avatarSelector[0].currentSrc : '';
        const email = emailSelector[0] ? emailSelector[0].defaultValue : '';
        const telefone = telefoneSelector[0] ? telefoneSelector[0].defaultValue : '';
        const biografia = biografiaSelector[0] ? biografiaSelector[0].innerText.split('Biografia')[1] ? biografiaSelector[0].innerText.split('Biografia')[1].replace(/[\r\n]/gm, '') : '' : '';

        result.push({
          avatar,
          email,
          telefone,
          biografia
        });
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
        const created = await DeputadoPerfil.create(item);
        console.log(`created! ${item.matricula}`)
      }
    }
    
  } catch (error) {
    console.log(error);
  }

  await sequelize.close();
}

execute();