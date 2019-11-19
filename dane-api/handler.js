'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const uuid = require('uuid/v4');

const registerTable = process.env.REGISTER_TABLE;

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

function sortByDate(a, b) {
  if (a.createdAt > b.createdAt) {
    return -1;
  } else return 1;
}

// Create a post
module.exports.register = async (event, context, callback) => {
  const reqBody = JSON.parse(event.body);
  const post = {
    id: uuid(),
    createdAt: new Date().toISOString(),
    email: reqBody.email,
    name: reqBody.name,
    app_user: reqBody.app_user,
    age: reqBody.age
  };

  return await db
    .put({
      TableName: registerTable,
      Item: post
    })
    .promise()
    .then(() => {
      callback(null, response(201, post));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};