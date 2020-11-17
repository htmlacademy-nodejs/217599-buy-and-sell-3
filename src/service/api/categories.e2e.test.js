'use strict';

const express = require('express');
const request = require('supertest');
const categories = require('./categories');
const {describe, beforeAll, test, expect} = require('@jest/globals');
const {CategoriesService} = require('../data-service');
const {HTTPCodes} = require('../../constants');

const mockData = [
  {
    id: 'HNinIi',
    categories: ['Посуда'],
    description:
      'При покупке с меня бесплатная доставка в черте города. Не пытайтесь торговаться. Цену вещам я знаю. Мой дед не мог её сломать. Таких предложений больше нет!',
    picture: 'item11.jpg',
    title: 'Продам коллекцию журналов «Огонёк».',
    type: 'sale',
    sum: 90772,
    comments: [
      {
        id: 'k8x360',
        text:
          'Продаю в связи с переездом. Отрываю от сердца. Совсем немного...',
      },
    ],
  },
  {
    id: 'OhVEWn',
    categories: ['Журнал'],
    description:
      'Бонусом отдам все аксессуары. Кому нужен этот новый телефон, если тут такое... Таких предложений больше нет! Две страницы заляпаны свежим кофе.',
    picture: 'item10.jpg',
    title: 'Продам советскую посуду. Почти не разбита.',
    type: 'offer',
    sum: 48258,
    comments: [
      {
        id: 'ZljoYR',
        text:
          'Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца.',
      },
      {
        id: '2T67kR',
        text: 'С чем связана продажа? Почему так дешёво? А где блок питания?',
      },
    ],
  },
  {
    id: 'zRDo1Z',
    categories: ['Игры'],
    description:
      'Кому нужен этот новый телефон, если тут такое... При покупке с меня бесплатная доставка в черте города. Не пытайтесь торговаться. Цену вещам я знаю. Товар в отличном состоянии.',
    picture: 'item15.jpg',
    title: 'Отдам в хорошие руки подшивку «Мурзилка».',
    type: 'offer',
    sum: 54137,
    comments: [
      {
        id: 'SaQ3Oh',
        text:
          'Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?',
      },
      {
        id: 'sDd_69',
        text:
          'Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца.',
      },
      {
        id: 'ufP_ec',
        text: 'Почему в таком ужасном состоянии? Неплохо, но дорого',
      },
    ],
  },
];

const app = express();

app.use(express.json());

categories(app, new CategoriesService(mockData));

describe('Тестирует get запросы к categories api', () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get('/categories');
  });

  test('Получает все категории', () => {
    expect(response.statusCode).toBe(HTTPCodes.Ok);
    expect(response.body.length).toBe(3);
  });
});
