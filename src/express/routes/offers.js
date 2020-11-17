'use strict';

const {Router} = require('express');
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {Offers: OffersAPI, Categories: CategoriesAPI} = require('../api');
const {editOfferExist} = require('../middlewares');
const {HTTPCodes} = require('../../constants');

const offersRouter = new Router();

const UPLOAD_DIR = `../upload/img/`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const upload = multer({storage});

offersRouter.get('/add', async (req, res) => {
  try {
    const categories = await CategoriesAPI.loadAll();

    return res.status(HTTPCodes.Ok).render('new-ticket', {categories});
  } catch (err) {
    return res.status(HTTPCodes.NotFound).render('error/404');
  }
});

offersRouter.get('/:id', (req, res) => {
  res.status(HTTPCodes.Ok).render('ticket');
});

offersRouter.get(
  '/edit/:id',
  editOfferExist(OffersAPI, CategoriesAPI),
  async (req, res) => {
    const {dataOffer, categories} = res.locals;

    res.status(HTTPCodes.Ok).render('ticket-edit', {dataOffer, categories});
  },
);

offersRouter.get('/category/:id', (req, res) => {
  res.status(HTTPCodes.Ok).render('category');
});

offersRouter.post('/add', upload.single('avatar'), async (req, res) => {
  const {body, file} = req;
  const offerBody = {
    picture: file.filename,
    title: body['ticket-name'],
    type: body.action,
    sum: body.price,
    categories: Array.isArray(body.category) ? body.category : [body.category],
    description: body.comment,
  };

  try {
    await OffersAPI.createOffer(offerBody);

    return res.status(HTTPCodes.Created).redirect('/my');
  } catch (err) {
    return res.status(err.response.status).redirect('/offers/add');
  }
});

module.exports = offersRouter;
