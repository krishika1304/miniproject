export const createEvent = async (req, res) => {
  try {
      const { name, description } = req.body;
      const imagePath = req.file.path; // This is safe now.

      // Your logic to save to database
      const event = new EventModel({
          name,
          description,
          image: imagePath,
      });

      await event.save();
      res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};
