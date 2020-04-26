'use strict';

const commentSchemaPost = {
  text: {
    exists: {
      errorMessage: `Вы не передали поле text`
    },
    isLength: {
      errorMessage: `Текст комментария должен быть не меньше 20 символов`,
      options: {
        min: 20,
      }
    },
  }
};

module.exports = commentSchemaPost;
