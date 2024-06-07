import JSONAPIMongoParser from 'json-api-mongo-parser';
import { jsonApiParserInfo } from 'infrastructure/mongo/models/json-api-parser-info';

const jsonApiMongoParser = new JSONAPIMongoParser(jsonApiParserInfo);

export default jsonApiMongoParser;