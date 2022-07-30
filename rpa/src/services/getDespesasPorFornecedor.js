const puppeteer = require("puppeteer");
const { Sequelize } = require("sequelize");
const config = require('../config');
const { Deputado } = require('../database/models/Deputado');
const { DespesaPorFornecedor } = require('../database/models/DespesaPorFornecedor')

const tiposDespesas = {
  2: 'A - COMBUSTÍVEIS E LUBRIFICANTES',
  3: 'B - LOCAÇÃO E MANUT DE BENS MÓVEIS E IMÓVEIS, CONDOMÍNIOS E OUTROS',
  4: 'C - MATERIAIS E SERVIÇOS DE MANUT E CONSERV DE VEÍCULOS ; PEDÁGIOS',
  5: 'D - MATERIAIS E SERVIÇOS GRÁFICOS, DE CÓPIAS E REPRODUÇÃO DE DOCS',
  6: 'E - MATERIAIS DE ESCRITÓRIO E OUTROS MATERIAIS DE CONSUMO',
  7: 'F - SERVIÇOS TÉCNICOS PROFISSIONAIS (CONSULTORIA, PESQUISAS ETC)',
  8: 'G - ASSINATURAS DE PERIÓDICOS, PUBLICAÇÕES, INTERNET E SOFTWARES',
  9: 'H - SERV.UTIL.PÚBLICA (TELEF.MÓVEL/FIXA, ENERGIA, ÁGUA, GÁS ETC)',
  10: 'J - SERVIÇOS DE COMUNICAÇÃO',
  11: 'I - HOSPEDAGEM, ALIMENTAÇÃO E DESPESAS DE LOCOMOÇÃO',
  12: 'K - LOCAÇÃO DE BENS MÓVEIS',
  13: 'L - LOCAÇÃO DE BENS IMÓVEIS',
  14: 'M - MANUTENÇÃO DE BENS MÓVEIS, IMÓVEIS, CONDOMÍNIOS E OUTROS',
  15: 'N - MORADIA',
  20: 'O - LOCAÇÃO DE VEÍCULO',
  21: 'P - DIVULGAÇÃO DA ATIVIDADE PARLAMENTAR'
};

const validTiposDespesas = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  20,
  21
];

async function execute() {

  const sequelize = new Sequelize(config.database)

  await sequelize.authenticate();
  console.log('Connected to sqlite')

  await DespesaPorFornecedor.sync();
  console.log('Model synchronized');

  const deputados = await Deputado.findAll({
    raw: true
  });

  const matriculas = deputados.map(deputado => deputado.matricula);

  const unique = [...new Set(matriculas)];

  const allResults = [];

  try {
    for (const matricula of unique) {
      for await (const idTipoDespesa of validTiposDespesas) {
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
        await page.goto(`https://www.al.sp.gov.br/deputado/contas/?idTipo=${idTipoDespesa}&matricula=${matricula}&tipo=fornecedores`, {
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
          return result;
        });
  
        data.forEach((obj) => {
          obj.matricula = matricula;
          obj.tipoDespesa = tiposDespesas[idTipoDespesa]
        })
  
        allResults.push(data);
    
        await browser.close(); 
      }
    }

    for await (const entry of allResults) {
      for await (const item of entry) {
        const created = await DespesaPorFornecedor.create(item);
        console.log(`created! ${created}`)
      }
    }
    
  } catch (error) {
    console.log(error);
  }

  await sequelize.close();
}

execute();