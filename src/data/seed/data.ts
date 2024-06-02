import { StringSchemaDefinition } from "mongoose";
import { DataSource, Entity } from "@interfaces/entities";

export const seedData: {dataSources: DataSource[], entities: Entity[] } = {
  dataSources: [
    {
      name: 'PC', 
      appName: 'Planning Center',
      apiUrl: 'https://api.planningcenteronline.com/groups/v2',
      apiAuthorizationType: 'basicAuth',
      apiAuthorizationCredentials: {
        basicAuth: {
          username: 'af844f083483029279ab50d6929674dba3d50f6947c15f661fa938b5bccb10ca',
          password: '3775260fcded8122500e888cbec5f2c466930a84dc1846c783ca64699fc3c416'
        }
      }
    },
    { name: 'Other',
      apiUrl: 'https://api.till.com/groups/v2',
      apiAuthorizationType: 'noAuth',
     },
  ],

  entities: [
    { name: 'Groups', dataSource: 'PC', apiResourceName: 'groups'  },
    { name: 'Plenty', dataSource: 'Other', apiResourceName: '[apiResourceName]' },
  ]
};