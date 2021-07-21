'use strict';

const express = require('express');
const Users = require('../models').User;
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');
const router = express.Router();

/* Users routes */

//returns the currently authenticated user along with a 200 HTTP status code.
router.get(
  '/users',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = await Users.findOne({
      where: {
        emailAddress: req.currentUser.emailAddress,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    res.status(200).json(user);
  })
);

// Post Route to add a new user:
router.post(
  '/users',
  asyncHandler(async (req, res) => {
    console.log(req.body);
    try {
      await Users.create(req.body);
      res.location('/');
      res.status(201).end();
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
        console.log(error);
      } else {
        throw error;
      }
    }
  })
);

// router.delete('/users/:id', async (req, res) => {
//   let user = await Users.findByPk(req.params.id);
//   await user.destroy();
//   res.status(204).end();
// });

module.exports = router;
