import { Request, Response } from 'express';
import Ad from '../models/Ad';
import { AuthRequest } from '../types/express';

// @desc    Get active ads
// @route   GET /api/ads
// @access  Public
export const getActiveAds = async (req: Request, res: Response) => {
  try {
    const ads = await Ad.find({ status: 'active' });
    res.json(ads);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all ads (Admin)
// @route   GET /api/ads/admin
// @access  Private/Admin
export const getAllAds = async (req: AuthRequest, res: Response) => {
  try {
    const ads = await Ad.find({});
    res.json(ads);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an ad (Submission)
// @route   POST /api/ads
// @access  Private
export const createAd = async (req: AuthRequest, res: Response) => {
  try {
    const { title, imageUrl, targetUrl, paymentReference, duration } = req.body;

    const ad = new Ad({
      title,
      imageUrl,
      targetUrl,
      paymentReference,
      duration,
      submittedBy: req.user?._id,
      status: 'pending',
    });

    const createdAd = await ad.save();
    res.status(201).json(createdAd);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve/Reject an ad
// @route   PUT /api/ads/:id/status
// @access  Private/Admin
export const updateAdStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body; // 'active' | 'rejected'
    const ad = await Ad.findById(req.params.id);

    if (ad) {
      ad.status = status;
      const updatedAd = await ad.save();
      res.json(updatedAd);
    } else {
      res.status(404).json({ message: 'Ad not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
