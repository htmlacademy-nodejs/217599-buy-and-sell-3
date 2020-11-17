'use strict';

const express = require('express');
const request = require('supertest');
const offers = require('./offers');
const {describe, test, expect} = require('@jest/globals');
const {OfferService} = require('../data-service');
const {HTTPCodes} = require('../../constants');

const createAPI = () => {
  const app = express();
  const mockData = [
    {
      id: 'a8b1zR',
      categories: ['Посуда', 'Журнал'],
      description:
        'Бонусом отдам все аксессуары. Это настоящая находка для коллекционера! Продаю с болью в сердце... Не пытайтесь торговаться. Цену вещам я знаю.',
      picture: 'item12.jpg',
      title: 'Продам новую приставку Sony Playstation 5.',
      type: 'offer',
      sum: 86409,
      comments: [
        {
          id: 'lPkmdW',
          text: 'Неплохо, но дорого А сколько игр в комплекте?',
        },
      ],
    },
    {
      id: 'PIdgc0',
      categories: ['Журнал', 'Животные', 'Игры', 'Разное', 'Книги', 'Посуда'],
      description:
        'Даю недельную гарантию. Это настоящая находка для коллекционера! Если найдёте дешевле — сброшу цену. Таких предложений больше нет!',
      picture: 'item14.jpg',
      title: 'Продам новую приставку Sony Playstation 5.',
      type: 'offer',
      sum: 98564,
      comments: [
        {
          id: 'X8Ch6o',
          text:
            'Продаю в связи с переездом. Отрываю от сердца. Совсем немного...',
        },
      ],
    },
    {
      id: 'kDFRor',
      categories: ['Посуда', 'Книги'],
      description:
        'Бонусом отдам все аксессуары. Если найдёте дешевле — сброшу цену. Две страницы заляпаны свежим кофе. Пользовались бережно и только по большим праздникам.',
      picture: 'item15.jpg',
      title: 'Продам новую приставку Sony Playstation 5.',
      type: 'offer',
      sum: 8094,
      comments: [
        {
          id: 'kT-cuu',
          text: 'А сколько игр в комплекте? Почему в таком ужасном состоянии?',
        },
      ],
    },
  ];

  app.use(express.json());

  offers(app, new OfferService(mockData));

  return app;
};

describe('Тестирует get запросы к offers api', () => {
  const app = createAPI();
  let response;

  test('Возвращает список объявлений', async () => {
    response = await request(app).get('/offers');

    expect(response.statusCode).toBe(HTTPCodes.Ok);
    expect(response.body.length).toBe(3);
  });

  test('Возвращает определенное объявление', async () => {
    const responseTitle = 'Продам новую приставку Sony Playstation 5.';

    response = await request(app).get('/offers/a8b1zR');

    expect(response.statusCode).toBe(HTTPCodes.Ok);
    expect(response.body.title).toBe(responseTitle);
  });

  test('Возвращает комментарии к определенному объявлению', async () => {
    response = await request(app).get('/offers/PIdgc0/comments');

    expect(response.statusCode).toBe(HTTPCodes.Ok);
  });

  test(`Возвращает ${HTTPCodes.NotFound} если запрос был на несуществующий ресурс offers`, async () => {
    response = await request(app).get('/offerss');

    expect(response.statusCode).toBe(HTTPCodes.NotFound);
  });

  test(`Возвращает ${HTTPCodes.NotFound}, если делают запрос к несуществующему определенному объявлению`, async () => {
    response = await request(app).get('/offers/a8b1zRrr');

    expect(response.statusCode).toBe(HTTPCodes.NotFound);
  });
});

describe('Тестирует post запросы к offers api', () => {
  const newOffer = {
    description: 'Текст объявления',
    picture: 'picture.jpg',
    title: 'Заголовок объявления',
    type: 'offer',
    sum: 100,
    categories: ['Книги'],
  };
  const commentText = 'Новый комментарий';
  const newOfferComment = {
    text: commentText,
  };
  const invalidOfferComment = {
    textt: commentText,
  };

  const app = createAPI();

  test('Создает объявление', async () => {
    await request(app).post('/offers').send(newOffer).expect(HTTPCodes.Created);
  });

  test('Создает комментарий к объявлению', async () => {
    await request(app)
      .post('/offers/PIdgc0/comments')
      .send(newOfferComment)
      .expect(HTTPCodes.Created);
  });

  test('Не создает объявление, если тело нового объявления невалидное', async () => {
    for (const key of Object.keys(newOffer)) {
      const invalidOffer = {...newOffer};

      delete invalidOffer[key];

      await request(app)
        .post('/offers')
        .send(invalidOffer)
        .expect(HTTPCodes.InvalidRequest);
    }
  });

  test('Не создает комментарий, если тело нового комментария невалидно', async () => {
    await request(app)
      .post('/offers/PIdgc0/comments')
      .send(invalidOfferComment)
      .expect(HTTPCodes.InvalidRequest);
  });
});

describe('Тестирует put запросы к offers api', () => {
  const editedOfferTitle = 'Заголовок объявления отредактирован';
  const editedOffer = {
    title: editedOfferTitle,
  };
  const invalidEditedOffer = {
    titlee: editedOfferTitle,
  };

  const app = createAPI();

  test('Редактирует объявление', async () => {
    await request(app)
      .put('/offers/a8b1zR')
      .send(editedOffer)
      .expect(HTTPCodes.NoContent);

    await request(app)
      .get('/offers/a8b1zR')
      .expect((res) => expect(res.body.title).toBe(editedOfferTitle));
  });

  test(`Возвращает ${HTTPCodes.NotFound} если пытаются изменить несуществующее объявление`, async () => {
    await request(app)
      .put('/offers/a8b1zRr')
      .send(editedOffer)
      .expect(HTTPCodes.NotFound);
  });

  test(`Возвращает ${HTTPCodes.InvalidRequest}, если передано невалидное тело запроса на редактирование`, async () => {
    await request(app)
      .put('/offers/a8b1zR')
      .send(invalidEditedOffer)
      .expect(HTTPCodes.InvalidRequest);
  });
});

describe('Тестирует delete запросы к offers api', () => {
  const app = createAPI();

  test('Удаляет объявление', async () => {
    await request(app).delete('/offers/a8b1zR').expect(HTTPCodes.NoContent);
    await request(app)
      .get('/offers')
      .expect((res) => expect(res.body.length).toBe(3));
  });

  test(`Возвращает ${HTTPCodes.NotFound} код, если нет удаляемого объявления`, async () => {
    await request(app).delete('/offers/test').expect(HTTPCodes.NotFound);
  });
});
