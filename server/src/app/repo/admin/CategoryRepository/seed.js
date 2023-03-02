/* eslint-disable no-self-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const path = require('path');
const YAML = require('yaml');
const { CategoryModel } = require('../../../models');
const { ReadFileAsync } = require('../../../../common/common.utils');

async function seed(args) {
    await CategoryModel.deleteMany({});
    let data = await YAML.parse(await ReadFileAsync(path.join(__dirname, './data.yml'), 'utf-8'));
    data = await Promise.all(
        data.map(async (category) => {
            category.name = category.name;
            const cat = await CategoryModel.create(category);
            return cat;
        })
    );
    data = data.filter((category) => category !== false);

    if (data.length === 0) throw new Error('no data with valid role.');

    data = await CategoryModel.find({});
    return Object.freeze({
        data,
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        message: 'Category seeders successfull',
    });
}

module.exports = seed;
