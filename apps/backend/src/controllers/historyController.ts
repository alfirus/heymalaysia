import { Request, Response } from 'express';
import History from '../models/History';

// @desc    Get all history articles
// @route   GET /api/history
// @access  Public
export const getHistory = async (req: Request, res: Response) => {
  try {
    const history = await History.find().sort({ year: 1 }); // Sort chronologically if year is parsable, else creation
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single history article
// @route   GET /api/history/:id
// @access  Public
export const getHistoryById = async (req: Request, res: Response) => {
  try {
    const history = await History.findById(req.params.id);
    if (history) {
      res.json(history);
    } else {
      res.status(404).json({ message: 'History article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a history article
// @route   POST /api/history
// @access  Private/Admin
export const createHistory = async (req: Request, res: Response) => {
  try {
    const { title, content, era, year, images } = req.body;

    const history = new History({
      title,
      content,
      era,
      year,
      images,
    });

    const createdHistory = await history.save();
    res.status(201).json(createdHistory);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Update a history article
// @route   PUT /api/history/:id
// @access  Private/Admin
export const updateHistory = async (req: Request, res: Response) => {
  try {
    const history = await History.findById(req.params.id);

    if (history) {
      history.title = req.body.title || history.title;
      history.content = req.body.content || history.content;
      history.era = req.body.era || history.era;
      history.year = req.body.year || history.year;
      history.images = req.body.images || history.images;

      const updatedHistory = await history.save();
      res.json(updatedHistory);
    } else {
      res.status(404).json({ message: 'History article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a history article
// @route   DELETE /api/history/:id
// @access  Private/Admin
export const deleteHistory = async (req: Request, res: Response) => {
  try {
    const history = await History.findById(req.params.id);

    if (history) {
      await history.deleteOne();
      res.json({ message: 'History article removed' });
    } else {
      res.status(404).json({ message: 'History article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
