'use strict';

const express = require('express');
const request = require('supertest');
const search = require('./search');
const {describe, beforeAll, test, expect} = require('@jest/globals');
const {SearchService} = require('../data-service');
const {HTTPCodes} = require('../../constants');

const mockData = [
  {
    id: '8t_dvI',
    categories: ['Журнал', 'Игры', 'Книги', 'Животные'],
    description:
      'Бонусом отдам все аксессуары. Мой дед не мог её сломать. Таких предложений больше нет! Пользовались бережно и только по большим праздникам.',
    picture: 'item14.jpg',
    title: 'Продам советскую посуду. Почти не разбита.',
    type: 'sale',
    sum: 68189,
    comments: [
      {
        id: '2Z-XQ4',
        text: 'Оплата наличными или перевод на карту? Неплохо, но дорого',
      },
      {
        id: 'q-SQAk',
        text: 'Почему в таком ужасном состоянии? Вы что?! В магазине дешевле.',
      },
    ],
  },
  {
    id: 'yuknK6',
    categories: ['Журнал'],
    description:
      'Это настоящая находка для коллекционера! При покупке с меня бесплатная доставка в черте города. Мой дед не мог её сломать. Продаю с болью в сердце...',
    picture: 'item06.jpg',
    title: 'Куплю породистого кота.',
    type: 'offer',
    sum: 35222,
    comments: [
      {
        id: 'qGv3Wb',
        text:
          'Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца.',
      },
      {
        id: 'NMx77L',
        text: 'Неплохо, но дорого Почему в таком ужасном состоянии?',
      },
      {
        id: '3MAgWW',
        text:
          'С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца.',
      },
      {
        id: '1-e_lk',
        text:
          'Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого',
      },
    ],
  },
];

const app = express();

app.use(express.json());

search(app, new SearchService(mockData));

describe('Возращает результат на основе query параметра title', () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get('/search').query({
      title: 'Продам',
    });
  });

  test('Статус ответа 200', () =>
    expect(response.statusCode).toBe(HTTPCodes.Ok));

  test('Возвращает 1 объявление', () => {
    expect(response.body.length).toBe(1);
  });

  test('Возвращает объявление с корректным id', () => {
    expect(response.body[0].id).toBe('8t_dvI');
  });
});

test('Если отсутствует query параметр в поиске, API влращает 400 код', () =>
  request(app).get('/search').expect(HTTPCodes.InvalidRequest));
