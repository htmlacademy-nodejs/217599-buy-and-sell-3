'use strict';

const express = require('express');
const request = require('supertest');
const offers = require('./offers');
const {describe, beforeAll, test, expect} = require('@jest/globals');
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

describe('Возвращает список всех объявлений', () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get('/offers');
  });

  test(`Возвращает статус ${HTTPCodes.Ok}`, () => {
    expect(response.statusCode).toBe(HTTPCodes.Ok);
  });

  test('Возвращает 3 объявления', () => {
    expect(response.body.length).toBe(3);
  });

  test('Возвращает id первого объявления - a8b1zR', () => {
    expect(response.body[0].id).toBe('a8b1zR');
  });
});

describe('Возращает определенно объявление по id', () => {
  const app = createAPI();
  const responseTitle = 'Продам новую приставку Sony Playstation 5.';
  let response;

  beforeAll(async () => {
    response = await request(app).get('/offers/a8b1zR');
  });

  test(`Возвращает статус кода ответа ${HTTPCodes.Ok}`, () => {
    expect(response.statusCode).toBe(HTTPCodes.Ok);
  });

  test(`Возвращает объявление с заголовком - ${responseTitle}`, () => {
    expect(response.body.title).toBe(responseTitle);
  });
});

describe('Создает новое объвление если переданные данные валидны', () => {
  const newOffer = {
    description: 'Текст объявления',
    picture: 'picture.jpg',
    title: 'Заголовок объявления',
    type: 'offer',
    sum: 100,
    categories: ['Книги'],
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post('/offers').send(newOffer);
  });

  test(`Возвращает статус кода ответа ${HTTPCodes.Created}`, () => {
    expect(response.statusCode).toBe(HTTPCodes.Created);
  });

  test('Возвращает обновленные объявления', () =>
    request(app)
      .get('/offers')
      .expect((res) => expect(res.body.length).toBe(4)));
});

describe(`Не содает объявление, если тело нового объявления невалидное`, () => {
  const newOffer = {
    description: 'Текст объявления',
    picture: 'picture.jpg',
    title: 'Заголовок объявления',
    type: 'offer',
    sum: 100,
    category: ['Книги'],
  };
  const app = createAPI();

  test(`Возвращает ${HTTPCodes.InvalidRequest}, если тело запроса невалидное`, async () => {
    for (const key of Object.keys(newOffer)) {
      const invalidOffer = {...newOffer};

      delete invalidOffer[key];

      await request(app)
        .post('/offers')
        .send(invalidOffer)
        .expect(HTTPCodes.InvalidRequest);
    }
  });
});

describe('Редактирует объявление', () => {
  const editedOfferTitle = 'Заголовок объявления отредактирован';
  const editedOffer = {
    title: editedOfferTitle,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).put('/offers/a8b1zR').send(editedOffer);
  });

  test(`Возвращает статус ответа ${HTTPCodes.NoContent}`, () => {
    expect(response.statusCode).toBe(HTTPCodes.NoContent);
  });

  test(`Заголовок отредактирован на - ${editedOfferTitle}`, () =>
    request(app)
      .get('/offers/a8b1zR')
      .expect((res) => expect(res.body.title).toBe(editedOfferTitle)));
});

describe(`Возвращает ${HTTPCodes.NotFound} если пытаются изменить несуществующее объявление`, () => {
  const editedOfferTitle = 'Заголовок объявления отредактирован';
  const editedOffer = {
    title: editedOfferTitle,
  };
  const invalidEditedOffer = {
    titlee: editedOfferTitle,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).put('/offers/a8b1zRr').send(editedOffer);
  });

  test(`Возвращает ${HTTPCodes.NotFound}`, () => {
    expect(response.statusCode).toBe(HTTPCodes.NotFound);
  });

  test(`Возвращает ${HTTPCodes.InvalidRequest}, если передано невалидное тело запроса на редактирование`, () =>
    request(app)
      .put('/offers/a8b1zR')
      .send(invalidEditedOffer)
      .expect(HTTPCodes.InvalidRequest));
});

describe('Удаляет объявления', () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete('/offers/a8b1zR');
  });

  test(`Возвращает ${HTTPCodes.NoContent} после успешного удаления объявления`, () => {
    expect(response.statusCode).toBe(HTTPCodes.NoContent);
  });

  test('После удаление возвращает корректное количество объявлений', () =>
    request(app)
      .get('/offers')
      .expect((res) => expect(res.body.length).toBe(3)));

  test(`Возвращает ${HTTPCodes.NotFound} код, если нет удаляемого объявления`, () =>
    request(app).delete('/offers/test').expect(HTTPCodes.NotFound));
});

describe('Корректно отдает и модифицирует комментарии', () => {
  const app = createAPI();
  const commentText = 'Новый комментарий';
  const newOfferComment = {
    text: commentText,
  };
  const invalidOfferComment = {
    textt: commentText,
  };

  test(`Код ответа на успешный запрос комментариев к объявлению равен - ${HTTPCodes.Ok}`, () => {
    return request(app).get('/offers/PIdgc0/comments').expect(HTTPCodes.Ok);
  });

  test(`Код ответа при успешном добавлении комментария равен - ${HTTPCodes.Created}`, () =>
    request(app)
      .post('/offers/PIdgc0/comments')
      .send(newOfferComment)
      .expect(HTTPCodes.Created));

  test(`Код ответа, если передано невалидное тело для создания комментария равно - ${HTTPCodes.InvalidRequest}`, () =>
    request(app)
      .post('/offers/PIdgc0/comments')
      .send(invalidOfferComment)
      .expect(HTTPCodes.InvalidRequest));
});
