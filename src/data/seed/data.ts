export const seedData = {
  dataSources: [
    {
      name: 'PC', 
      appName: 'Planning Center',
      apiUrl: 'https://api.planningcenteronline.com',
      apiAuthorizationType: 'basicAuth',
      apiAuthorizationCredentials: {
        basicAuth: {
          username: 'af844f083483029279ab50d6929674dba3d50f6947c15f661fa938b5bccb10ca',
          password: '3775260fcded8122500e888cbec5f2c466930a84dc1846c783ca64699fc3c416'
        }
      }
    },
    { name: 'Till' },
    { name: 'planned', appName: 'app2' },
    { name: 'combination', appName: 'app3' },
    { name: 'felt' },
  ],

  entities: [
    { name: 'Song', dataSource: 'PC', descripcion: 'look board flat river solve spite universe history use pool frequently twenty basic lying this came poetry particular function previous suit west shore tomorrow' },
    { name: 'Plenty', dataSource: 'Till', descripcion: 'dinner welcome screen expression structure plastic doubt missing thank garage property particular park syllable slide cup alphabet swimming stood fought fog shut spite ever' },
    { name: 'Season', dataSource: 'planned', descripcion: 'canal promised split headed studying had declared vessels hello matter lovely congress birthday fed word street happened ought cold heavy cage shoulder sight applied' },
    { name: 'Voyage', dataSource: 'PC', descripcion: 'reach myself owner building anyway tool dance particles branch shadow clear home of grass rabbit wind bit barn slipped husband recent tongue important zero' },
    { name: 'Medicine', dataSource: 'planned', descripcion: 'mountain five art moving foot roll harder lucky pitch mile nails married finally spend adult left storm easy cry increase cook drew announced glad' },
    { name: 'How', dataSource: 'PC', descripcion: 'heat student highway very word health them feel off cover trail cage went mission ice safety disease observe copy flat speech experiment now finest' },
    { name: 'Saved', dataSource: 'planned', descripcion: 'weather mud friend brother breakfast corn prevent numeral deer quiet so name fastened tongue sing phrase concerned tree pass flies fighting chapter fence act' },
    { name: 'High', dataSource: 'PC', descripcion: 'went split establish speak origin itself news when cross stand value vertical decide bicycle tone are market view depth income touch above nation spread' },
    { name: 'Colony', dataSource: 'Till', descripcion: 'jungle weight whether printed west egg run cut rod football fewer trouble hearing him been note select our shelf afraid jump alike slip shore' },
    { name: 'Dozen', dataSource: 'Till', descripcion: 'tobacco spent congress who accept pond outline changing flow find cat mirror tax keep twenty yellow into pile reach move plan recall nervous gold' },
    { name: 'Bean', dataSource: 'combination', descripcion: 'direct might am golden block seat birth television taught twenty clock process safety shirt guard control cent follow couple eleven weather location turn parent' },
    { name: 'Pain', dataSource: 'Till',descripcion: 'start difficult two force source job process tomorrow machinery physical loose five fruit leaving century ourselves difference for frog throughout bridge atomic sunlight send' },
    { name: 'Clearly', dataSource: 'felt', descripcion: 'well poem little but therefore instant tight outline foreign drove characteristic mine leader cold close club satellites quiet face tobacco age gas bend push' },
    { name: 'Immediately', dataSource: 'PC', descripcion: 'feel shot fill square caught would valley path whispered come porch function pocket fish division think same sign was adventure worry bean wealth realize' },
  ]  
};