import Airport from '../models/Airport.js';
import { ValidationError } from 'sequelize';

export const getAirports = async (req, res) => {
  try {
    const airports = await Airport.findAll({
      where: req.query, // Allows searching with query params
    });
    res.status(200).send(airports);
  } catch (err) {
    res.status(500).send(err.message); // Server error
  }
};

export const createAirport = async (req, res) => {
  try {
    const airport = await Airport.create(req.body);
    res.status(201).send(airport);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(403).send(err.errors[0].message); // Validation error, print custom error message
    } else {
      res.status(500).send(err.message); // Server error
    }
  }
};
