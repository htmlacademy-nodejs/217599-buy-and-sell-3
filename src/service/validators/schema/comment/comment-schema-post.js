'use strict';

const {COUNT} = require(`../../../constants`);

const commentSchemaPost = {
  text: {
    exists: {
      errorMessage: `Вы не передали поле text`
    },
    isLength: {
      errorMessage: `Текст комментария должен быть не меньше ${COUNT.COMMENT.LENGTH.MIN} символов`,
      options: {
        min: COUNT.COMMENT.LENGTH.MIN,
      }
    },
  }
};

module.exports = commentSchemaPost;
