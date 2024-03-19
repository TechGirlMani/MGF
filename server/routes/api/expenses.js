const express = require('express');
const router = express.Router();

// Load Book model
const Expense = require('../../models/Expenses');

// @route   GET api/expenses/test
// @desc    Tests expenses route
// @access  Public
router.get('/test', (req, res) => res.send('expense route testing!'));

// @route   GET api/expenses
// @desc    Get all expenses
// @access  Public
router.get('/', (req, res) => {
  Expense.find()
    .then(expenses => res.json(expenses))
    .catch(err => res.status(404).json({ noexpensesfound: 'No expenses found' }));
});

// @route   GET api/expenses/:id
// @desc    Get single expense by id
// @access  Public
router.get('/:id', (req, res) => {
  Expense.findById(req.params.id)
    .then(expense => res.json(expense))
    .catch(err => res.status(404).json({ noexpensefound: 'No expense found' }));
});

// @route   POST api/expenses
// @desc    Add/save expense
// @access  Public
router.post('/', (req, res) => {
  Expense.create(req.body)
    .then(expense => res.json({ msg: 'Expense added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this expenses' }));
});

// @route   PUT api/expenses/:id
// @desc    Update expense by id
// @access  Public
router.put('/:id', (req, res) => {
  Expense.findByIdAndUpdate(req.params.id, req.body)
    .then(expense => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route   DELETE api/expenses/:id
// @desc    Delete expense by id
// @access  Public
router.delete('/:id', (req, res) => {
  Expense.findByIdAndDelete(req.params.id)
    .then(expense => res.json({ mgs: 'Expense entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a expense' }));
});

module.exports = router;