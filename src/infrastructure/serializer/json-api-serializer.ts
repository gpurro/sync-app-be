import JSONAPISerializer from 'json-api-serializer';
import { registerSerializers } from 'infrastructure/mongo/models/json-api-parser-info';

const jsonApiSerializer = new JSONAPISerializer();

registerSerializers(jsonApiSerializer);

export default jsonApiSerializer;