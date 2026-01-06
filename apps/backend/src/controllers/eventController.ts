import { Request, Response } from 'express';
import Event from '../models/Event';
import { AuthRequest } from '../types/express';

// @desc    Get all events (Public: approved only, Admin: all)
// @route   GET /api/events
// @access  Public/Private
export const getEvents = async (req: AuthRequest, res: Response) => {
  try {
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword as string,
            $options: 'i',
          },
        }
      : {};

    // If admin, show all. If user, show approved only.
    // Note: This logic can be refined based on exact requirements.
    // For now, we return approved events for public query.
    // Admin specific query can constitute a separate route or query param.
    // Assuming simple public view first:
    const events = await Event.find({ ...keyword, approved: true });
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all events (Admin view)
// @route   GET /api/events/admin
// @access  Private/Admin
export const getAdminEvents = async (req: AuthRequest, res: Response) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an event (Submission)
// @route   POST /api/events
// @access  Private
export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, date, location, paymentReference } = req.body;

    const event = new Event({
      title,
      description,
      date,
      location,
      paymentReference,
      submittedBy: req.user?._id,
      approved: false, // Default to pending
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve an event
// @route   PUT /api/events/:id/approve
// @access  Private/Admin
export const approveEvent = async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      event.approved = true;
      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
