import { Request, Response } from 'express';
import Place from '../models/Place';
import { AuthRequest } from '../types/express';

// @desc    Get all places
// @route   GET /api/places
// @access  Public
export const getPlaces = async (req: Request, res: Response) => {
  try {
    const places = await Place.find({});
    res.json(places);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single place
// @route   GET /api/places/:id
// @access  Public
export const getPlaceById = async (req: Request, res: Response) => {
  try {
    const place = await Place.findById(req.params.id);
    if (place) {
      res.json(place);
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a place
// @route   POST /api/places
// @access  Private/Admin
export const createPlace = async (req: AuthRequest, res: Response) => {
  try {
    const place = new Place(req.body);
    const createdPlace = await place.save();
    res.status(201).json(createdPlace);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a place
// @route   PUT /api/places/:id
// @access  Private/Admin
export const updatePlace = async (req: AuthRequest, res: Response) => {
  try {
    const place = await Place.findById(req.params.id);

    if (place) {
      Object.assign(place, req.body);
      const updatedPlace = await place.save();
      res.json(updatedPlace);
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a place
// @route   DELETE /api/places/:id
// @access  Private/Admin
export const deletePlace = async (req: AuthRequest, res: Response) => {
  try {
    const place = await Place.findById(req.params.id);

    if (place) {
      await place.deleteOne();
      res.json({ message: 'Place removed' });
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
