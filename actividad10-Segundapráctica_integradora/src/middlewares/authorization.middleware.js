export const authorization = role => {
    return (req, res, next) => {
        if(req.user) return res.status(401).json({ message: 'no authenticate' });
        if(role !== req.user.role) return res.status(401).json({ message: 'Unauthorized' });
        next();
    }
}