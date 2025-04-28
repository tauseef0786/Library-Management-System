export const validateBook = (req, res, next) => {
    const { title, author, ISBN, publishedDate, genre, copiesAvailable } = req.body;
    if (!title || !author || !ISBN || !publishedDate || !genre || copiesAvailable == null) {
      return res.status(400).json({ error: "All book fields are required" });
    }
    next();
  };
  
  export const validateUser = (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }
    next();
  };
  